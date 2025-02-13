import React from "react";
import { AgCharts } from "ag-charts-react";

export default function MomentumChart({ data }) {
    const chartData = Object.keys(data).flatMap(stock =>
        data[stock].map(d => ({
            date: d.date,
            stock: stock,
            momentum: d.momentum
        }))
    );

    const options = {
        title: { text: "Momentum", fontSize: 16 },
        data: chartData,
        series: Object.keys(data).map(stock => ({
            type: "line",
            xKey: "date",
            yKey: "momentum",
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
