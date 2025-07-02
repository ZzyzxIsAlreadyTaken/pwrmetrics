import React from "react";

interface HeaderProps {
  unit: "metric" | "imperial";
  onUnitChange: (unit: "metric" | "imperial") => void;
}

const Header: React.FC<HeaderProps> = ({ unit, onUnitChange }) => {
  return (
    <header className="w-full flex items-center justify-between px-2 sm:px-6 py-3 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        {/* Running icon SVG */}
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
          <svg
            width="22"
            height="22"
            fill="none"
            viewBox="0 0 24 24"
            className="text-white"
          >
            <path
              d="M13.5 5.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7.5 22a1 1 0 0 1-.9-1.45l2.5-5A1 1 0 0 1 10.5 15h2.38l-1.13-2.26-2.13.85a2 2 0 0 1-2.62-1.06 2 2 0 0 1 1.06-2.62l3.5-1.4a2 2 0 0 1 2.56.97l2.5 5A1 1 0 0 1 16.5 16h-2.38l1.13 2.26 2.13-.85a2 2 0 0 1 2.62 1.06 2 2 0 0 1-1.06 2.62l-3.5 1.4A2 2 0 0 1 13.5 22h-6ZM6 8a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Z"
              fill="currentColor"
            />
          </svg>
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
