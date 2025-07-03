import React from "react";
import logoIcon from "../assets/logo.svg";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitChange: (unit: "metric" | "imperial") => void;
}

const Header: React.FC<HeaderProps> = ({ unit, onUnitChange }) => {
  return (
    <header className="w-full flex items-center justify-between px-2 sm:px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        {/* Running icon SVG */}
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-red-600">
          <img src={logoIcon} alt="PWRmetrics" className="w-6 h-6" />
        </span>
        <span className="text-xl font-bold text-gray-900">PWRmetrics</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Metric</span>
        <button
          className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
            unit === "imperial" ? "bg-blue-600" : "bg-gray-300"
          }`}
          onClick={() =>
            onUnitChange(unit === "metric" ? "imperial" : "metric")
          }
          aria-label="Toggle units"
        >
          <span
            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
              unit === "imperial" ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
        <span className="text-sm font-medium text-gray-700">Imperial</span>
      </div>
    </header>
  );
};

export default Header;
