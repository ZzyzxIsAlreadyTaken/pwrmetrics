import React from "react";

type Tab = {
  key: string;
  label: string;
};

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  activeColor: string;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTab,
  onTabChange,
  activeColor,
}) => (
  <div className="flex justify-center mt-8 mb-12">
    <div className="flex rounded-xl bg-gray-100 shadow-sm border border-gray-200 overflow-hidden">
      {tabs.map(({ key, label }, idx) => (
        <button
          key={key}
          className={`px-8 py-2 text-base font-bold transition-all duration-200
            ${
              activeTab === key
                ? `${activeColor} text-white`
                : "bg-gray-100 text-gray-800"
            }
            ${idx === 0 ? "" : "border-l border-gray-200"}
          `}
          style={{ borderRadius: 0 }}
          onClick={() => onTabChange(key)}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default TabBar;
