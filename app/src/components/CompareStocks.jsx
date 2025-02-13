import React, { useState, useEffect } from "react";
import { fetchStockDataCorsYahoo } from "./stockData";
import { calculateDailyChange, calculateMomentum, calculateRSI, calculateVolatility } from "./calculations";
import { Spinner } from "@material-tailwind/react";
import NormalizedChart from "./charts/NormalizedChart"
import DailyChangeChart from "./charts/DailyChangeChart";
import MomentumChart from "./charts/MomentumChart";
import RSIChart from "./charts/RSIChart";
import VolatilityChart from "./charts/VolatilityChart";

const displayToSymbol = {
    "Bitcoin": "bitcoin",
    "S&P 500": "sp500",
    "Gold": "gold",

};

export default function CompareStocks({ selectedPeriod, showSP500, showGold, showBitcoin, showNormalizedChart, showRSI, showVolatility, showDailyChanges, showMomentum }) {
    const [loading, setLoading] = useState(true);
    const [filteredData, setFilteredData] = useState({});

    useEffect(() => {
        const selectedStocks = [];
        if (showSP500) selectedStocks.push("S&P 500");
        if (showGold) selectedStocks.push("Gold");
        if (showBitcoin) selectedStocks.push("Bitcoin");

        if (selectedStocks.length === 0) return;
        setLoading(true);

        Promise.all(
            selectedStocks.map(stock =>
                fetchStockDataCorsYahoo(displayToSymbol[stock], "6y", "1d")
                    .then(historicalData => {
                        let enrichedData = calculateRSI(historicalData);
                        enrichedData = calculateVolatility(enrichedData);
                        enrichedData = calculateDailyChange(enrichedData);
                        enrichedData = calculateMomentum(enrichedData);
                        let filtered = enrichedData;
                        const now = new Date();
                        switch (selectedPeriod) {
                            case "1d":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 24 * 60 * 60 * 1000));
                                break;
                            case "7d":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000));
                                break;
                            case "1mo":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000));
                                break;
                            case "3mo":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 3 * 30 * 24 * 60 * 60 * 1000));
                                break;
                            case "6mo":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 6 * 30 * 24 * 60 * 60 * 1000));
                                break;
                            case "1y":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000));
                                break;
                            case "2y":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 2 * 365 * 24 * 60 * 60 * 1000));
                                break;
                            case "5y":
                                filtered = enrichedData.filter(d => new Date(d.date) >= new Date(now.getTime() - 5 * 365 * 24 * 60 * 60 * 1000));
                                break;
                            default:
                                filtered = enrichedData; // Pas de filtre par défaut
                        }
                        return { stock, data: filtered };
                    })
            )
        ).then(results => {
            const newFilteredData = {};
            results.forEach(({ stock, data }) => {
                newFilteredData[stock] = data;
            });
            setFilteredData(newFilteredData);
        }).catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        }).finally(() => setLoading(false));

    }, [showSP500, showGold, showBitcoin, selectedPeriod]);

    return (
        <div className="w-full mx-auto p-1">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Spinner className="h-16 w-16 text-gray-900/50" />
                </div>
            ) : (
                <>
                    {showNormalizedChart && <NormalizedChart data={filteredData} />}
                    {showDailyChanges && <DailyChangeChart data={filteredData} />}
                    {showMomentum && <MomentumChart data={filteredData} />}
                    {showRSI && <RSIChart data={filteredData} />}
                    {showVolatility && <VolatilityChart data={filteredData} />}
                </>
            )}
        </div>
    );
}
