import React from "react";
import { AgCharts } from "ag-charts-react";

export default function MACDGraph({ data, xMin, xMax }) {
    const options = {
        data,
        axes: [
            { type: "time", position: "bottom", min: xMin, max: xMax },
            { type: "number", position: "right", title: { text: "MACD" }, keys: ["macd", "macdSignal"] },
        ],
        series: [
            { type: "line", xKey: "date", yKey: "macd", stroke: "blue", title: "MACD", marker: { enabled: false } },
            { type: "line", xKey: "date", yKey: "macdSignal", stroke: "red", title: "Signal", marker: { enabled: false } },
        ],
    };

    return <AgCharts options={options} style={{ height: "200px" }} />;
}