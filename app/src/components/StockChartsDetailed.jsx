import React, { useState, useEffect } from "react";

import { fetchStockDataCorsYahoo } from "./stockData";
import { calculateEMA, calculateBollingerBands, calculateBollingerBandsEMA, calculateRSI, calculateMACD, calculateVolatility, calculateMaxDrawdown } from "./calculations";

import MainGraph from "./MainGraph";
import RSIGraph from "./charts/RSIGraph";
import MACDGraph from "./charts/MACDGraph";

import { Spinner } from "@material-tailwind/react";


export function StockChartsDetailed({ selectedStock, selectedPeriod, showVolume, showBB202SMA, showBB1022EMA, showEMA91226, showEMA50100200, showRSI, showMACD }) {
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (!selectedStock) return;

        setLoading(true);
        fetchStockDataCorsYahoo(selectedStock, "6y", "1d")
            .then((historicalData) => {
                let enrichedData = calculateBollingerBands(historicalData);
                enrichedData = calculateBollingerBandsEMA(enrichedData);

                enrichedData = calculateEMA(enrichedData, 9);
                enrichedData = calculateEMA(enrichedData, 12);
                enrichedData = calculateEMA(enrichedData, 26);
                enrichedData = calculateEMA(enrichedData, 50);
                enrichedData = calculateEMA(enrichedData, 100);
                enrichedData = calculateEMA(enrichedData, 200);

                enrichedData = calculateRSI(enrichedData);
                enrichedData = calculateMACD(enrichedData);

                enrichedData = calculateVolatility(enrichedData);
                enrichedData = calculateMaxDrawdown(enrichedData);

                let filteredData = enrichedData;

                const now = new Date();
                switch (selectedPeriod) {
                    case "1d":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setDate(now.getDate() - 1)));
                        break;
                    case "7d":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setDate(now.getDate() - 7)));
                        break;
                    case "1mo":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setMonth(now.getMonth() - 1)));
                        break;
                    case "3mo":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setMonth(now.getMonth() - 3)));
                        break;
                    case "6mo":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setMonth(now.getMonth() - 6)));
                        break;
                    case "1y":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setFullYear(now.getFullYear() - 1)));
                        break;
                    case "2y":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setFullYear(now.getFullYear() - 2)));
                        break;
                    case "5y":
                        filteredData = enrichedData.filter(d => d.date >= new Date(new Date().setFullYear(now.getFullYear() - 5)));
                        break;
                    default:
                        filteredData = enrichedData;
                }



                setFilteredData(filteredData);
            })
            .finally(() => setLoading(false));
    }, [selectedStock, selectedPeriod]);

    return (
        <div className="w-full mx-auto p-1">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Spinner className="h-16 w-16 text-gray-900/50" />
                </div>
            ) : (
                <>
                    <MainGraph
                        data={filteredData}
                        selectedStock={selectedStock}
                        selectedPeriod={selectedPeriod}
                        showVolume={showVolume}
                        showBB202SMA={showBB202SMA}
                        showBB1022EMA={showBB1022EMA}
                        showEMA91226={showEMA91226}
                        showEMA50100200={showEMA50100200}
                    />
                    {showRSI && <RSIGraph data={filteredData} />}
                    {showMACD && <MACDGraph data={filteredData} />}
                </>
            )}
        </div>
    );
}