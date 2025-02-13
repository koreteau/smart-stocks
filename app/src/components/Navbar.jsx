import React from "react";
import { Typography } from "@material-tailwind/react";

export function NavbarDropdown({ selectedView, setSelectedView }) {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color={selectedView === "mainApp" ? "blue" : "blue-gray"}
                className={`p-1 font-normal cursor-pointer transition-colors ${
                    selectedView === "mainApp" ? "font-semibold" : "hover:text-blue-500"
                }`}
                onClick={() => setSelectedView("mainApp")}
            >
                <a className="flex items-center">Main App</a>
            </Typography>

            <Typography
                as="li"
                variant="small"
                color={selectedView === "powerBI" ? "blue" : "blue-gray"}
                className={`p-1 font-normal cursor-pointer transition-colors ${
                    selectedView === "powerBI" ? "font-semibold" : "hover:text-blue-500"
                }`}
                onClick={() => setSelectedView("powerBI")}
            >
                <a className="flex items-center">Power BI</a>
            </Typography>

            <Typography
                as="li"
                variant="small"
                color={selectedView === "about" ? "blue" : "blue-gray"}
                className={`p-1 font-normal cursor-pointer transition-colors ${
                    selectedView === "about" ? "font-semibold" : "hover:text-blue-500"
                }`}
                onClick={() => setSelectedView("about")}
            >
                <a className="flex items-center">About</a>
            </Typography>
        </ul>
    );
}
