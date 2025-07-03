import React, { useEffect } from "react";
import Tooltip from "./Tooltip";
import dumbbellIcon from "../assets/dumbbell.svg";

interface StrengthCalculatorProps {
  unit: "metric" | "imperial";
}

const KG_TO_LB = 2.20462;

export const STRENGTH_COLOR = "bg-red-600";

function StrengthCalculator({ unit }: StrengthCalculatorProps) {
  // Use string state for inputs
  const [weightInput, setWeightInput] = React.useState("");
  const [repsInput, setRepsInput] = React.useState("");
  const [lastUnit, setLastUnit] = React.useState(unit);

  // Convert input to numbers for calculations
  const weight = parseFloat(weightInput);
  const reps = parseInt(repsInput, 10);
  const weightValid = !isNaN(weight) && weight > 0;
  const repsValid = !isNaN(reps) && reps > 0;

  // Update input values when unit changes
  useEffect(() => {
    if (unit === lastUnit) return;
    if (weightValid) {
      if (unit === "imperial") {
        setWeightInput((weight * KG_TO_LB).toFixed(2));
      } else {
        setWeightInput((weight / KG_TO_LB).toFixed(2));
      }
    }
    setLastUnit(unit);
    // eslint-disable-next-line
  }, [unit]);

  // Epley, Brzycki, Lombardi, O'Conner, Wathan formulas
  // Valid rep ranges (approximate):
  // Epley: 1-10, Brzycki: 1-10, Lombardi: 1-12, O'Conner: 1-10, Wathan: 1-10
  const formulaMeta = [
    {
      name: "Epley",
      calc1RM: (w: number, r: number) => w * (1 + r / 30),
      from1RM: (rm: number, r: number) => rm / (1 + r / 30),
      min: 1,
      max: 10,
    },
    {
      name: "Brzycki",
      calc1RM: (w: number, r: number) => (w * 36) / (37 - r),
      from1RM: (rm: number, r: number) => (rm * (37 - r)) / 36,
      min: 1,
      max: 10,
    },
    {
      name: "Lombardi",
      calc1RM: (w: number, r: number) => w * Math.pow(r, 0.1),
      from1RM: (rm: number, r: number) => rm / Math.pow(r, 0.1),
      min: 1,
      max: 12,
    },
    {
      name: "O'Conner",
      calc1RM: (w: number, r: number) => w * (1 + 0.025 * r),
      from1RM: (rm: number, r: number) => rm / (1 + 0.025 * r),
      min: 1,
      max: 10,
    },
    {
      name: "Wathan",
      calc1RM: (w: number, r: number) =>
        (100 * w) / (48.8 + 53.8 * Math.exp(-0.075 * r)),
      from1RM: (rm: number, r: number) =>
        (rm * (48.8 + 53.8 * Math.exp(-0.075 * r))) / 100,
      min: 1,
      max: 10,
    },
  ];

  // Probable reps list (1-12 or up to reps if reps > 12)
  const maxRows = 12;
  const probableReps = Array.from(
    { length: Math.max(maxRows, repsValid ? reps : 1) },
    (_, i) => i + 1
  );

  // Calculate 1RM for each formula (in kg)
  const oneRMs =
    weightValid && repsValid
      ? formulaMeta.map((f) => f.calc1RM(weight, reps))
      : Array(formulaMeta.length).fill(undefined);

  // Display results in selected unit
  function display(val: number | undefined) {
    if (typeof val !== "number" || isNaN(val)) return "-";
    return unit === "imperial" ? (val * KG_TO_LB).toFixed(1) : val.toFixed(1);
  }

  // Only show up to 12 rows, but allow scrolling if more
  const visibleRows = probableReps; // show all rows up to reps
  const showScroll = repsValid && reps > maxRows;

  // Grouped out-of-range warnings by formula
  const groupedWarnings = formulaMeta
    .map((f) => {
      const maxRep = Math.max(...visibleRows);
      if (maxRep > f.max) {
        return `${f.name} formula may be inaccurate for reps above ${f.max}.`;
      }
      return null;
    })
    .filter(Boolean);

  // Add tooltips for each formula
  const formulaTooltips: Record<string, string> = {
    Epley: "~10 reps\nLinear formula, overestimates past 10 reps quickly",
    Brzycki: "~10 reps\nBecomes unreliable after 10, very conservative",
    "O'Conner": "~10 reps\nSimilar to Epley, slightly less aggressive",
    Wathan: "~10 reps\nBest for 1–10 reps, then underestimates",
    Lombardi:
      "20+ reps\nOnly one that scales well into endurance ranges (but less precise)",
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl mx-auto sm:min-w-[500px]">
      {/* Header with solid color and icon */}
      <div className="sm:rounded-t-2xl bg-red-600 px-4 sm:px-8 pt-6 sm:pt-8 pb-4 sm:pb-6 flex items-center gap-4">
        <img src={dumbbellIcon} alt="Dumbbell" className="w-8 h-8" />
        <div>
          <div className="text-xl font-bold text-white leading-tight">
            One-Rep Max Calculator
          </div>
        </div>
      </div>
      {/* End header */}
      <div className="p-4 sm:p-8">
        <div className="bg-red-50 rounded-lg px-2 sm:px-4 py-2 sm:py-3 mb-4 sm:mb-6 text-red-700 text-base">
          Estimate the max weight you could lift for different reps, based on
          your input.
        </div>
        <div className="flex flex-row gap-4 justify-center mb-6">
          <div className="flex flex-col items-start">
            <label
              className="text-red-700 font-medium text-sm mb-1 ml-1"
              htmlFor="weight-input"
            >
              Weight ({unit === "imperial" ? "lb" : "kg"})
            </label>
            <input
              id="weight-input"
              type="number"
              min={1}
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              placeholder={unit === "imperial" ? "Weight (lb)" : "Weight (kg)"}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none text-base w-24 sm:w-28"
            />
          </div>
          <div className="flex flex-col items-start">
            <label
              className="text-red-700 font-medium text-sm mb-1 ml-1"
              htmlFor="reps-input"
            >
              Reps
            </label>
            <input
              id="reps-input"
              type="number"
              min={1}
              value={repsInput}
              onChange={(e) => setRepsInput(e.target.value)}
              placeholder="Reps"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none text-base w-24 sm:w-28"
            />
          </div>
        </div>
        <div className="mt-6 max-w-full overflow-x-auto">
          <div className={showScroll ? "max-h-96 overflow-y-auto" : ""}>
            <table className="w-full border-collapse text-sm min-w-[350px] sm:min-w-[500px]">
              <thead>
                <tr>
                  <th className="bg-red-50 text-red-700 font-semibold py-2 px-1">
                    Reps
                  </th>
                  {formulaMeta.map((f, i) => (
                    <th
                      key={f.name}
                      className="bg-red-50 text-red-700 font-semibold py-2 px-1"
                    >
                      <Tooltip
                        content={formulaTooltips[f.name] || ""}
                        align={
                          i === 0
                            ? "left"
                            : i === formulaMeta.length - 1
                            ? "right"
                            : "center"
                        }
                      >
                        <span
                          style={{
                            cursor: "help",
                            borderBottom: "1px dotted #b91c1c",
                          }}
                        >
                          {f.name}
                        </span>
                      </Tooltip>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r) => (
                  <tr
                    key={r}
                    className={
                      repsValid && r === reps ? "bg-red-100" : "hover:bg-red-50"
                    }
                  >
                    <td className="py-1 px-1 font-medium text-gray-800 text-center">
                      {r}
                    </td>
                    {formulaMeta.map((f, i) => (
                      <td
                        key={f.name}
                        className="py-1 px-1 text-center text-gray-900"
                      >
                        {weightValid && repsValid
                          ? display(f.from1RM(oneRMs[i], r))
                          : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showScroll && (
            <div className="text-xs text-gray-500 mt-1 text-right">
              Scroll for more reps
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2 text-right">
            All calculations are approximate. 1 kg = 2.20462 lb
          </div>
          {groupedWarnings.length > 0 && (
            <div className="text-xs text-red-500 mt-2">
              <b>Note:</b> Some formulas may be inaccurate for high rep ranges.
              <br />
              {groupedWarnings.map((msg) => (
                <div key={msg}>{msg}</div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StrengthCalculator;
