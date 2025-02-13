import React from "react";
import { AgCharts } from "ag-charts-react";

export default function RSIChart({ data }) {
    const chartData = Object.keys(data).flatMap(stock =>
        data[stock].map(d => ({
            date: d.date,
            stock: stock,
            rsi: d.rsi
        }))
    );

    const options = {
        title: { text: "RSI (Relative Strength Index)", fontSize: 16 },
        data: chartData,
        series: Object.keys(data).map(stock => ({
            type: "line",
            xKey: "date",
            yKey: "rsi",
            strokeWidth: 2,
            marker: { size: 5 },
            yName: stock,
            data: chartData.filter(d => d.stock === stock),
            marker: { enabled: false }
        })),
        axes: [{ type: "time", position: "bottom" }, { type: "number", position: "left" }]
    };
    

    return <AgCharts options={options} />;
}