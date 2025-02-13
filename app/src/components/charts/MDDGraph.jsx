import React from "react";
import { AgCharts } from "ag-charts-react";

export default function MDDGraph({ data, xMin, xMax }) {
    const options = {
        data,
        axes: [
            { type: "time", position: "bottom", min: xMin, max: xMax },
            { type: "number", position: "right", title: { text: "Max Drawdown (%)" }, keys: ["drawdown"], min: -100, max: 0 },
        ],
        series: [
            {
                type: "line",
                xKey: "date",
                yKey: "drawdown",
                stroke: "red",
                title: "Max Drawdown",
                marker: { enabled: false },
            },
        ],
    };

    return <AgCharts options={options} style={{ height: "200px" }} />;
}
