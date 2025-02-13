import axios from "axios";


export const yahooSymbols = {
    sp500: "%5EGSPC",
    gold: "GC%3DF",
    bitcoin: "BTC-USD",
};

export const symbolToDisplay = {
    sp500: "S&P 500",
    gold: "Gold",
    bitcoin: "Bitcoin",
};


const CORS = "https://web-production-87e39.up.railway.app/"
const LOCALCORS = "http://localhost:8080/"


export async function fetchStockDataCorsYahoo(asset, range = "3mo", interval = "1d") {
    try {
        if (!asset || !yahooSymbols[asset]) {
            console.error("Symbole d'actif invalide :", asset);
            throw new Error("Symbole d'actif invalide ou manquant");
        }

        const response = await axios.get(
            `${CORS}https://query2.finance.yahoo.com/v8/finance/chart/${yahooSymbols[asset]}`,
            {
                params: {
                    range: range,
                    interval: interval,
                },
            }
        );

        if (!response.data.chart || !response.data.chart.result) {
            throw new Error("Aucune donnée trouvée");
        }

        const chartData = response.data.chart.result[0];
        const timestamps = chartData.timestamp;
        const quotes = chartData.indicators.quote[0];

        return timestamps.map((timestamp, index) => ({
            date: new Date(timestamp * 1000),
            open: quotes.open[index],
            high: quotes.high[index],
            low: quotes.low[index],
            close: quotes.close[index],
            volume: quotes.volume[index],
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        return [];
    }
}