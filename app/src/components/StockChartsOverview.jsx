import React, { useState, useEffect } from "react";

import { fetchStockDataCorsYahoo, symbolToDisplay } from "./stockData";

import { Spinner } from "@material-tailwind/react";
import { AgCharts } from "ag-charts-react";
import "ag-charts-enterprise";


export function StockChartsOverview({ selectedStock }) {
    const [loading, setLoading] = useState(true);
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (!selectedStock) return;

        setLoading(true);
        fetchStockDataCorsYahoo(selectedStock, "3mo", "1d")
            .then((formattedData) => {
                setOptions({
                    data: formattedData,
                    title: { text: `${symbolToDisplay[selectedStock] || selectedStock} - Stocks` },
                    subtitle: { text: "Period : last 3 months" },
                    series: [
                        {
                            type: "candlestick",
                            xKey: "date",
                            xName: "Date",
                            lowKey: "low",
                            highKey: "high",
                            openKey: "open",
                            closeKey: "close",
                            xValueType: "time",
                        },
                    ],
                });
            })
            .finally(() => setLoading(false));
    }, [selectedStock]);

    return (
        <div className="w-full mx-auto p-1">
            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <Spinner className="h-16 w-16 text-gray-900/50" />
                </div>
            ) : (
                <AgCharts options={options} style={{ height: "500px" }}/>
            )}
        </div>
    );
}