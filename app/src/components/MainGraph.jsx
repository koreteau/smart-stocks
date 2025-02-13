import React from "react";
import { AgCharts } from "ag-charts-react";
import { symbolToDisplay } from "./stockData";

export default function MainGraph({ data, selectedStock, selectedPeriod, showVolume, showBB202SMA, showBB1022EMA, showEMA91226, showEMA50100200 }) {
    const options = {
        data,
        title: { text: `${symbolToDisplay[selectedStock] || selectedStock} - Detailed Stocks` },
        subtitle: { text: `Period: last ${selectedPeriod}` },
        legend: { position: "top" },
        axes: [
            { type: "time", position: "bottom" },
            { type: "number", position: "right", keys: ["open", "high", "low", "close", "ema9", "ema12", "ema26", "ema50", "ema100", "ema200", "bbUpper", "bbMiddle", "bbLower", "bbEmaUpper", "bbEmaMiddle", "bbEmaLower", "volatility"] },
            { type: "number", position: "left", keys: ["volume"], gridLine: { enabled: false }, label: { enabled: false } },
        ],
        series: [
            ...(showVolume ? [{ type: "bar", xKey: "date", yKey: "volume", yName: "Volume", fill: "lightgrey" }] : []),
            {
                type: "candlestick",
                xKey: "date",
                xName: "Date",
                lowKey: "low",
                highKey: "high",
                openKey: "open",
                closeKey: "close",
                xValueType: "time",
                yKey: "close",
                yAxisKey: "price",
                tooltip: {
                    renderer: ({ datum }) => ({
                        data: [
                            { label: "Open", value: datum.open?.toFixed(2) },
                            { label: "High", value: datum.high?.toFixed(2) },
                            { label: "Low", value: datum.low?.toFixed(2) },
                            { label: "Close", value: datum.close?.toFixed(2) },
                            { label: "Volatility", value: datum.volatility ? datum.volatility.toFixed(4) : "N/A" },
                            ...(showVolume ? [{ label: "Volume", value: datum.volume ? datum.volume.toLocaleString() : "N/A" },] : []),
                            ...(showBB202SMA ? [
                                { label: "BB Upper (20,2,SMA)", value: datum.bbUpper ? datum.bbUpper.toFixed(2) : "N/A" },
                                { label: "BB Middle (20,2,SMA)", value: datum.bbMiddle ? datum.bbMiddle.toFixed(2) : "N/A" },
                                { label: "BB Lower (20,2,SMA)", value: datum.bbLower ? datum.bbLower.toFixed(2) : "N/A" },
                            ] : []),
                            ...(showBB1022EMA ? [
                                { label: "BB Upper (10,2.2,EMA)", value: datum.bbEmaUpper ? datum.bbEmaUpper.toFixed(2) : "N/A" },
                                { label: "BB Middle (10,2.2,EMA)", value: datum.bbEmaMiddle ? datum.bbEmaMiddle.toFixed(2) : "N/A" },
                                { label: "BB Lower (10,2.2,EMA)", value: datum.bbEmaLower ? datum.bbEmaLower.toFixed(2) : "N/A" },
                            ] : []),
                            ...(showEMA91226 ? [
                                { label: "EMA 9", value: datum.ema9 ? datum.ema9.toFixed(2) : "N/A" },
                                { label: "EMA 12", value: datum.ema12 ? datum.ema12.toFixed(2) : "N/A" },
                                { label: "EMA 26", value: datum.ema26 ? datum.ema26.toFixed(2) : "N/A" },
                            ] : []),
                            ...(showEMA50100200 ? [
                                { label: "EMA 50", value: datum.ema50 ? datum.ema50.toFixed(2) : "N/A" },
                                { label: "EMA 100", value: datum.ema100 ? datum.ema100.toFixed(2) : "N/A" },
                                { label: "EMA 200", value: datum.ema200 ? datum.ema200.toFixed(2) : "N/A" },
                            ] : []),
                        ],
                    }),
                },
            },
            ...(showBB202SMA ? [
                { type: "line", xKey: "date", yKey: "bbUpper", stroke: "lightblue", title: "BB Upper (20, 2, SMA)", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "bbMiddle", stroke: "grey", title: "BB Middle (20, 2, SMA)", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "bbLower", stroke: "orange", title: "BB Lower (20, 2, SMA)", marker: { enabled: false } },
            ] : []),
            ...(showBB1022EMA ? [
                { type: "line", xKey: "date", yKey: "bbEmaUpper", stroke: "purple", title: "BB Upper (10, 2.2, EMA)", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "bbEmaMiddle", stroke: "darkgrey", title: "BB Middle (10, 2.2, EMA)", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "bbEmaLower", stroke: "red", title: "BB Lower (10, 2.2, EMA)", marker: { enabled: false } },
            ] : []),
            ...(showEMA91226 ? [
                { type: "line", xKey: "date", yKey: "ema9", stroke: "blue", title: "EMA 9", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "ema12", stroke: "red", title: "EMA 12", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "ema26", stroke: "green", title: "EMA 26", marker: { enabled: false } },
            ] : []),
            ...(showEMA50100200 ? [
                { type: "line", xKey: "date", yKey: "ema50", stroke: "blue", title: "EMA 50", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "ema100", stroke: "red", title: "EMA 100", marker: { enabled: false } },
                { type: "line", xKey: "date", yKey: "ema200", stroke: "green", title: "EMA 200", marker: { enabled: false } },
            ] : []),
        ],
    };

    return <AgCharts options={options} style={{ height: "500px" }} />;
}
