// Fonction de calcul des EMA
export function calculateEMA(data, period) {
    let emaArray = [];
    let multiplier = 2 / (period + 1);
    let ema = data[0]?.close || 0; // Initialisation avec le premier cours de clôture

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            emaArray.push({ ...data[i], [`ema${period}`]: null });
        } else {
            ema = data[i].close * multiplier + ema * (1 - multiplier);
            emaArray.push({ ...data[i], [`ema${period}`]: ema });
        }
    }
    return emaArray;
}


// Fonction de calcul des Bollinger Bands avec SMA
export function calculateBollingerBands(data, period = 20, stdDevMultiplier = 2) {
    let result = [];
    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push({ ...data[i], bbMiddle: null, bbUpper: null, bbLower: null });
            continue;
        }

        const subset = data.slice(i - period + 1, i + 1);
        const mean = subset.reduce((acc, val) => acc + val.close, 0) / period;
        const stdDev = Math.sqrt(
            subset.reduce((acc, val) => acc + Math.pow(val.close - mean, 2), 0) / period
        );

        result.push({
            ...data[i],
            bbMiddle: mean,
            bbUpper: mean + stdDevMultiplier * stdDev,
            bbLower: mean - stdDevMultiplier * stdDev,
        });
    }
    return result;
}


// Fonction de calcul des Bollinger Bands avec EMA
export function calculateBollingerBandsEMA(data, period = 10, stdDevMultiplier = 2.2) {
    let result = [];
    
    // Calculer l'EMA(10) pour l'utiliser comme moyenne mobile
    let emaData = calculateEMA(data, period);

    for (let i = 0; i < data.length; i++) {
        if (i < period - 1) {
            result.push({ ...data[i], bbEmaMiddle: null, bbEmaUpper: null, bbEmaLower: null });
            continue;
        }

        const subset = data.slice(i - period + 1, i + 1);
        const mean = emaData[i][`ema${period}`];  // Utilisation de l'EMA comme moyenne centrale
        const stdDev = Math.sqrt(
            subset.reduce((acc, val) => acc + Math.pow(val.close - mean, 2), 0) / period
        );

        result.push({
            ...data[i],
            bbEmaMiddle: mean,
            bbEmaUpper: mean + stdDevMultiplier * stdDev,
            bbEmaLower: mean - stdDevMultiplier * stdDev,
        });
    }
    return result;
}


// Fonction de calcul du RSI
export function calculateRSI(data, period = 14) {
    let rsiArray = [];
    let gains = 0;
    let losses = 0;

    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            rsiArray.push({ ...data[i], rsi: null });
        } else {
            let change = data[i].close - data[i - 1].close;
            let gain = Math.max(0, change);
            let loss = Math.abs(Math.min(0, change));

            gains = ((gains * (period - 1)) + gain) / period;
            losses = ((losses * (period - 1)) + loss) / period;

            let rs = losses === 0 ? 100 : gains / losses;
            let rsi = 100 - (100 / (1 + rs));

            rsiArray.push({ ...data[i], rsi });
        }
    }
    return rsiArray;
}


// Fonction de calcul du MACD
export function calculateMACD(data, shortPeriod = 12, longPeriod = 26, signalPeriod = 9) {
    if (data.length < longPeriod) return data.map(entry => ({ ...entry, macd: null, macdSignal: null, macdHistogram: null }));

    // Calcul de l'EMA sur la clôture pour les deux périodes
    let shortEmaData = calculateEMA(data.map(d => ({ date: d.date, close: d.close })), shortPeriod);
    let longEmaData = calculateEMA(data.map(d => ({ date: d.date, close: d.close })), longPeriod);

    let macdArray = data.map((entry, index) => {
        if (index < longPeriod) return { ...entry, macd: null, macdSignal: null, macdHistogram: null };

        let shortEma = shortEmaData[index][`ema${shortPeriod}`];
        let longEma = longEmaData[index][`ema${longPeriod}`];

        let macd = shortEma - longEma; // MACD Line

        return { ...entry, macd };
    });

    // Calcul du Signal MACD (EMA 9 sur MACD)
    let signalArray = calculateEMA(macdArray.map(d => ({ date: d.date, close: d.macd })), signalPeriod);

    return macdArray.map((entry, index) => {
        let macdSignal = index < longPeriod ? null : signalArray[index][`ema${signalPeriod}`];
        let macdHistogram = index < longPeriod ? null : entry.macd - macdSignal; // Histogramme MACD

        return { ...entry, macdSignal, macdHistogram };
    });
}


// Fonction de calcul de la volatilité (écart-type des rendements sur une période) et annualisation
export function calculateVolatility(data, period = 20) {
    let volatilityArray = [];

    for (let i = 0; i < data.length; i++) {
        if (i < period) {
            volatilityArray.push({ ...data[i], volatility: null, volatilityAnnualized: null });
            continue;
        }

        // Calcul des rendements journaliers
        let returns = [];
        for (let j = i - period + 1; j <= i; j++) {
            let dailyReturn = (data[j].close - data[j - 1].close) / data[j - 1].close;
            returns.push(dailyReturn);
        }

        // Calcul de l'écart-type (volatilité journalière)
        let meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
        let variance = returns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returns.length;
        let volatility = Math.sqrt(variance)*100;

        // Convertir en volatilité annualisée
        let volatilityAnnualized = volatility * Math.sqrt(252); // √252 pour annualiser

        volatilityArray.push({
            ...data[i],
            volatility: volatility, // Ratio journalier
            volatilityAnnualized: volatilityAnnualized // Ratio annualisé
        });
    }

    return volatilityArray;
}


// Fonction de calcul du drawdown maximal (MDD)
export function calculateMaxDrawdown(data) {
    let peak = data[0]?.close || 0;
    let maxDrawdown = 0;
    let drawdownArray = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].close > peak) {
            peak = data[i].close;
        }
        let drawdown = (data[i].close - peak) / peak;
        maxDrawdown = Math.min(maxDrawdown, drawdown);
        drawdownArray.push({ ...data[i], drawdown: drawdown });
    }
    return drawdownArray;
}

export function calculateDailyChange(data) {
    return data.map((d, i, arr) => {
        if (i === 0) return { ...d, dailyChange: null };
        return { ...d, dailyChange: ((d.close - arr[i - 1].close) / arr[i - 1].close) * 100 };
    });
}

export function calculateMomentum(data, period = 10) {
    return data.map((d, i, arr) => {
        if (i < period) return { ...d, momentum: null };
        return { ...d, momentum: ((d.close - arr[i - period].close) / arr[i - period].close) * 100 };
    });
}