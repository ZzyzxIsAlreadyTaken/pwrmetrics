import { useState } from "react";
import StrengthCalculator, {
  STRENGTH_COLOR,
} from "./components/StrengthCalculator";
import Header from "./components/Header";
import TabBar from "./components/TabBar";

function App() {
  const [tab, setTab] = useState("strength");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");

  const tabs = [
    {
      key: "strength",
      label: "One-Rep Max Calculator",
      activeColor: STRENGTH_COLOR,
    },
    {
      key: "something",
      label: "Something Calculator",
      activeColor: "bg-blue-600",
    },
  ];

  return (
    <div>
      <Header unit={unit} onUnitChange={setUnit} />
      <TabBar
        tabs={tabs}
        activeTab={tab}
        onTabChange={setTab}
        activeColor={
          tabs.find((t) => t.key === tab)?.activeColor || STRENGTH_COLOR
        }
      />
      <div className="flex justify-center">
        {tab === "strength" && <StrengthCalculator unit={unit} />}
        {tab === "something" && (
          <div className="bg-white rounded-2xl shadow-lg p-12 min-w-[350px] min-h-[300px] flex items-center justify-center text-lg text-gray-400">
            Something Calculator coming soon...
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
