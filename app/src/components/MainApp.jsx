import React, { useState } from "react";

import { Button, Checkbox, Menu, MenuHandler, MenuList, MenuItem, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from "@material-tailwind/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";


import { StockChartsOverview } from "./StockChartsOverview";
import { StockChartsDetailed } from "./StockChartsDetailed";
import CompareStocks from "./CompareStocks";


const displayToSymbol = {
    "Bitcoin": "bitcoin",
    "S&P 500": "sp500",
    "Gold": "gold",

};


function StockDropdown({ onStockChange }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedStock, setSelectedStock] = useState("Bitcoin");

    const stocks = ["Bitcoin", "S&P 500", "Gold"];

    const handleStockChange = (stock) => {
        setSelectedStock(stock);
        onStockChange(displayToSymbol[stock]); // Envoie le symbole API
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="sm" variant="outlined" className="flex items-center gap-2">
                    {selectedStock}
                    <ChevronDownIcon strokeWidth={2.5} className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`} />
                </Button>
            </MenuHandler>
            <MenuList className="w-28">
                {stocks.map((stock) => (
                    <MenuItem key={stock} onClick={() => handleStockChange(stock)}>
                        {stock}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}


function PeriodDropdown({ onPeriodChange }) {
    const [openMenu, setOpenMenu] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState("6 Months");

    const periods = [
        { label: "1 Day", value: "1d" },
        { label: "1 Week", value: "7d" },
        { label: "1 Month", value: "1mo" },
        { label: "3 Months", value: "3mo" },
        { label: "6 Months", value: "6mo" },
        { label: "1 Year", value: "1y" },
        { label: "2 Years", value: "2y" },
        { label: "5 Years", value: "5y" },
    ];

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period.label);
        onPeriodChange(period.value);
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="md" variant="outlined" className="flex items-center gap-2 px-4 py-2">
                    {selectedPeriod}
                    <ChevronDownIcon strokeWidth={2.5} className={`h-4 w-4 transition-transform ${openMenu ? "rotate-180" : ""}`} />
                </Button>
            </MenuHandler>
            <MenuList className="w-36">
                {periods.map((period) => (
                    <MenuItem key={period.value} onClick={() => handlePeriodChange(period)}>
                        {period.label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}


function IndicatorsDropdown({ selectedIndicators, setSelectedIndicators }) {
    const [openMenu, setOpenMenu] = useState(false);

    const indicators = [
        { label: "Volume", key: "showVolume" },
        { label: "BB (20,2,SMA)", key: "showBB202SMA" },
        { label: "BB (10,2.2,EMA)", key: "showBB1022EMA" },
        { label: "EMA (9,12,26)", key: "showEMA91226" },
        { label: "EMA (50,100,200)", key: "showEMA50100200" },
        { label: "RSI", key: "showRSI" },
        { label: "MACD (12,26,9)", key: "showMACD" },
    ];

    const toggleIndicator = (key) => {
        setSelectedIndicators((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="md" variant="outlined" className="flex items-center gap-2 px-4 py-2">
                    Indicators ({Object.values(selectedIndicators).filter(Boolean).length})
                    <ChevronDownIcon strokeWidth={2.5} className={`h-2 w-2 transition-transform ${openMenu ? "rotate-180" : ""}`} />
                </Button>
            </MenuHandler>
            <MenuList className="w-64 p-2">
                {indicators.map(({ label, key }) => (
                    <MenuItem key={key} className="flex items-center gap-2">
                        <Checkbox checked={selectedIndicators[key]} onChange={() => toggleIndicator(key)} />
                        {label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}


function ComparedStockDropdown({ selectedStocks, setSelectedStocks }) {
    const [openMenu, setOpenMenu] = useState(false);

    const stocks = [
        { label: "S&P 500", key: "SP500" },
        { label: "Gold", key: "Gold" },
        { label: "Bitcoin", key: "Bitcoin" },
    ];

    const toggleStockSelection = (key) => {
        setSelectedStocks((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="md" variant="outlined" className="flex items-center gap-2 px-4 py-2">
                    Compare ({Object.values(selectedStocks).filter(Boolean).length})
                </Button>
            </MenuHandler>
            <MenuList className="w-64 p-2">
                {stocks.map(({ label, key }) => (
                    <MenuItem key={key} className="flex items-center gap-2">
                        <Checkbox checked={selectedStocks[key]} onChange={() => toggleStockSelection(key)} />
                        {label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

function ComparisonsDropdown({ selectedComparisons, setSelectedComparisons }) {
    const [openMenu, setOpenMenu] = useState(false);

    const comparisons = [
        { label: "Normalized Chart", key: "showNormalizedChart" },
        { label: "Daily Change (%)", key: "dailyChange" },
        { label: "Volatility", key: "volatility" },
        { label: "RSI (14 Days)", key: "rsi" },
        { label: "Momentum (ROC)", key: "momentum" },
    ];

    const toggleComparison = (key) => {
        setSelectedComparisons((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu}>
            <MenuHandler>
                <Button size="md" variant="outlined" className="flex items-center gap-2 px-4 py-2">
                    Comparaisons ({Object.values(selectedComparisons).filter(Boolean).length})
                </Button>
            </MenuHandler>
            <MenuList className="w-72 p-2">
                {comparisons.map(({ label, key }) => (
                    <MenuItem key={key} className="flex items-center gap-2">
                        <Checkbox checked={selectedComparisons[key]} onChange={() => toggleComparison(key)} />
                        {label}
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}


export default function MainApp() {
    const [selectedStock, setSelectedStock] = useState("bitcoin");
    const [selectedStocks, setSelectedStocks] = useState({
        SP500: false,  // S&P 500 sélectionné par défaut
        Gold: true,
        Bitcoin: true
    });
    const [selectedComparisons, setSelectedComparisons] = useState({
        showNormalizedChart: true,
        dailyChange: true,
        volatility: false,
        rsi: false,
        momentum: false,
    });
    const [selectedPeriod, setSelectedPeriod] = useState("6mo");
    const [selectedIndicators, setSelectedIndicators] = useState({
        showVolume: true,
        showBB202SMA: true,
        showBB1022EMA: false,
        showEMA91226: false,
        showEMA50100200: false,
        showRSI: true,
        showMACD: false,
    });

    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { label: "Overview", value: "overview" },
        { label: "Detailed", value: "detailed" },
        { label: "Compare", value: "compare" },
    ];

    return (
        <div className="py-5 px-5">
            <Tabs value={activeTab} onChange={setActiveTab}>
                <div className="flex items-center">
                    <TabsHeader style={{ width: `${tabs.length * 150}px` }}>
                        {tabs.map(({ label, value }) => (
                            <Tab key={value} value={value}>{label}</Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody>
                        <TabPanel value="overview">
                            <StockDropdown onStockChange={setSelectedStock} />
                        </TabPanel>
                        <TabPanel value="detailed">
                            <div className="flex gap-3">
                                <StockDropdown onStockChange={setSelectedStock} />
                                <PeriodDropdown onPeriodChange={setSelectedPeriod} />
                                <IndicatorsDropdown selectedIndicators={selectedIndicators} setSelectedIndicators={setSelectedIndicators} />
                            </div>
                        </TabPanel>
                        <TabPanel value="compare">
                            <div className="flex gap-3">
                                <ComparedStockDropdown selectedStocks={selectedStocks} setSelectedStocks={setSelectedStocks} />
                                <PeriodDropdown onPeriodChange={setSelectedPeriod} />
                                <ComparisonsDropdown selectedComparisons={selectedComparisons} setSelectedComparisons={setSelectedComparisons} />
                            </div>
                        </TabPanel>
                    </TabsBody>
                </div>
                <TabsBody>
                    <TabPanel value="overview">
                        <StockChartsOverview selectedStock={selectedStock} />
                    </TabPanel>
                    <TabPanel value="detailed">
                        <StockChartsDetailed selectedStock={selectedStock} selectedPeriod={selectedPeriod} {...selectedIndicators} />
                    </TabPanel>
                    <TabPanel value="compare">
                        <CompareStocks
                            selectedPeriod={selectedPeriod}
                            showSP500={selectedStocks.SP500}
                            showGold={selectedStocks.Gold}
                            showBitcoin={selectedStocks.Bitcoin}
                            showNormalizedChart={selectedComparisons.showNormalizedChart}
                            showDailyChanges={selectedComparisons.dailyChange}
                            showVolatility={selectedComparisons.volatility}
                            showRSI={selectedComparisons.rsi}
                            showMomentum={selectedComparisons.momentum}
                        />
                    </TabPanel>
                </TabsBody>
            </Tabs>
        </div>
    );
}