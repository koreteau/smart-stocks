import React from "react";
import { AgCharts } from "ag-charts-react";

export default function NormalizedChart({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return <p className="text-center text-gray-500">Aucune donnée à afficher.</p>;
    }

    const baseValues = {};
    Object.keys(data).forEach(stock => {
        if (data[stock].length > 0) {
            baseValues[stock] = data[stock][0].close;
        }
    });

    const chartData = Object.keys(data).flatMap(stock =>
        data[stock].map(d => ({
            date: d.date,
            stock: stock,
            normalizedClose: baseValues[stock] ? (d.close / baseValues[stock]) * 100 : 100
        }))
    );

    const options = {
        title: { text: "Normalized Evolution (100)", fontSize: 16 },
        data: chartData,
        series: Object.keys(data).map(stock => ({
            type: "line",
            xKey: "date",
            yKey: "normalizedClose",
            strokeWidth: 2,
            marker: { size: 5 },
            yName: stock,
            data: chartData.filter(d => d.stock === stock),
            marker: { enabled: false },
            tooltip: {
                renderer: ({ datum }) => ({
                    data: [
                        { label: "Open", value: datum.normalizedClose?.toFixed(2) },
                    ]
                })
            }
        })),
        axes: [{ type: "time", position: "bottom" }, { type: "number", position: "left" }]
    };

    return <AgCharts options={options} />;
}