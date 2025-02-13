import React from "react";
import { Typography } from "@material-tailwind/react";

export default function About() {
    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Typography variant="h3" className="text-center pb-8">
                About this Application
            </Typography>

            <Typography variant="h4" className="pt-4">
                Disclaimer
            </Typography>
            <Typography variant="paragraph" className="text-gray-700">
                This application provides financial data and analysis based on historical information retrieved from Yahoo Finance.
                The data and indicators displayed are for informational purposes only and should not be considered as financial advice.
                The developers of this application take no responsibility for financial decisions made based on this data. Use at your own risk.
            </Typography>

            <Typography variant="h4" className="pt-6">
                Technical Details
            </Typography>
            <Typography variant="paragraph" className="text-gray-700">
                The calculations behind the indicators are implemented as follows:
            </Typography>

            <ul className="list-disc pl-6 text-gray-700">
                {[
                    { title: "Volatility (%)", description: "Measures the standard deviation of daily returns over a defined period. Higher volatility indicates greater price fluctuations." },
                    { title: "Bollinger Bands (20,2, SMA)", description: "A 20-day Simple Moving Average (SMA) with bands at two standard deviations. Prices reaching the upper/lower bands may indicate overbought/oversold conditions." },
                    { title: "Bollinger Bands (10,2.2, EMA)", description: "A 10-day Exponential Moving Average (EMA) with bands at 2.2 standard deviations, providing a more responsive trend-following tool." },
                    { title: "Bollinger Bands EMA (9,12,26)", description: "Bollinger bands applied on EMAs of 9, 12, and 26 days, commonly used in short-term market analysis." },
                    { title: "Bollinger Bands EMA (50,100,200)", description: "Long-term EMAs with Bollinger bands to assess macro market trends and significant movements." },
                    { title: "RSI (14 and 20 days)", description: "The Relative Strength Index compares recent gains and losses over 14 or 20 days to measure momentum. Values above 70 indicate overbought conditions, while below 30 suggest oversold markets." },
                    { title: "MACD (12,26,9)", description: "Moving Average Convergence Divergence calculates the difference between 12-day and 26-day EMAs, with a 9-day EMA signal line. Used for trend direction and momentum shifts." },
                    { title: "Normalized Evolution (Base 100)", description: "Converts asset prices into an indexed format starting from a base of 100, allowing direct comparison of different assets’ performance over time." },
                    { title: "Daily Change (%)", description: "Measures the percentage difference between today’s and yesterday’s closing prices, highlighting short-term price movements." },
                    { title: "Momentum (ROC)", description: "The Rate of Change (ROC) calculates the percentage change of the price over a set period, indicating acceleration or deceleration in market movement." }
                ].map((item, index) => (
                    <li key={index} className="mb-2">
                        <Typography variant="small" className="font-bold">{item.title}:</Typography>
                        <Typography variant="paragraph">{item.description}</Typography>
                    </li>
                ))}
            </ul>

            <Typography variant="paragraph" className="text-gray-700 pt-2">
            This application integrates financial data visualization using an external charting library. The graphs displayed are rendered using AG Charts, a third-party tool providing interactive data visualizations. The application does not modify or alter the rendering mechanisms of this library.
            </Typography>
            <Typography variant="paragraph" className="text-gray-700 pt-2">
            Additionally, the embedded Power BI report has been imported directly and was not created by the developers of this application and was provided as-is from an external source. The report's structure, calculations, and visualizations originate from its original author(s), and any modifications to its content must be done within Power BI itself. Therefore, the developers of this application are not responsible for the accuracy, completeness, or relevance of the information displayed in the report.
            </Typography>

            <Typography variant="h4" className="pt-6">
                Cookies & Data Privacy
            </Typography>
            <Typography variant="paragraph" className="text-gray-700">
                This application does not use cookies or store any personal data. All computations are performed locally, and no user information is collected or shared.
            </Typography>

            <Typography variant="paragraph" className="text-center text-gray-700 pt-12">
                © {(2025 === new Date().getFullYear()) ? "2025" : `2025 - ${new Date().getFullYear()}`} Smart Stocks developed by Koreteau with ❤️
            </Typography>
        </div>
    );
}
