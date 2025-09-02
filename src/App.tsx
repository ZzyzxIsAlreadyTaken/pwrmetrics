import { useState } from "react";
import StrengthCalculator, {
  STRENGTH_COLOR,
} from "./components/StrengthCalculator";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import LbskgConversion from "./components/lbskgConversion";

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
      key: "conversion",
      label: "lbs/kg Conversion",
      activeColor: "bg-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
        {tab === "conversion" && <LbskgConversion />}
      </div>
    </div>
  );
}

export default App;
