import React from "react";
import { AgCharts } from "ag-charts-react";

export default function RSIGraph({ data, xMin, xMax }) {
    const options = {
        data,
        axes: [
            { type: "time", position: "bottom", min: xMin, max: xMax },
            { type: "number", position: "right", title: { text: "RSI" }, keys: ["rsi"], min: 0, max: 100 },
        ],
        series: [{ type: "line", xKey: "date", yKey: "rsi", stroke: "black", title: "RSI", marker: { enabled: false } }],
    };

    return <AgCharts options={options} style={{ height: "200px" }} />;
}