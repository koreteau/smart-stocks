import React, { useState } from "react";
import { NavbarDropdown } from "./components/Navbar";
import MainApp from "./components/MainApp";
import PowerBI from "./components/PowerBI";
import About from "./components/About";

export default function App() {
    const [selectedView, setSelectedView] = useState("mainApp");

    return (
        <>
            <div className="flex items-center py-2 px-5 border-b-2 border-gray-200 justify-between">
                <NavbarDropdown selectedView={selectedView} setSelectedView={setSelectedView} />
            </div>

            {selectedView === "mainApp" ? <MainApp /> : selectedView === "powerBI" ? <PowerBI /> : <About />}
        </>
    );
}
