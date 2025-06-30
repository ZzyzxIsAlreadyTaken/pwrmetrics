import React, { useEffect } from "react";

interface StrengthCalculatorProps {
  unit: "metric" | "imperial";
}

const KG_TO_LB = 2.20462;

export const STRENGTH_COLOR = "bg-red-600";

function StrengthCalculator({ unit }: StrengthCalculatorProps) {
  const [weight, setWeight] = React.useState(0); // always store as kg internally
  const [reps, setReps] = React.useState(1);
  const [inputValue, setInputValue] = React.useState(0); // what user sees in the input
  const [lastUnit, setLastUnit] = React.useState(unit);

  // Update inputValue when unit or weight changes
  useEffect(() => {
    if (unit === lastUnit) return;
    // Convert input value to new unit
    if (unit === "imperial") {
      setInputValue(Number((weight * KG_TO_LB).toFixed(2)));
    } else {
      setInputValue(Number((weight / KG_TO_LB).toFixed(2)));
    }
    setLastUnit(unit);
    // eslint-disable-next-line
  }, [unit]);

  // Keep inputValue in sync with weight if unit doesn't change
  useEffect(() => {
    if (unit === "imperial") {
      setInputValue(Number((weight * KG_TO_LB).toFixed(2)));
    } else {
      setInputValue(Number(weight.toFixed(2)));
    }
    // eslint-disable-next-line
  }, [weight]);

  // Handle input change
  function handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setInputValue(val);
    if (unit === "imperial") {
      setWeight(Number((val / KG_TO_LB).toFixed(4)));
    } else {
      setWeight(val);
    }
  }

  // Epley, Brzycki, Lombardi, O'Conner, Wathan formulas
  const formulas = [
    {
      name: "Epley",
      calc1RM: (w: number, r: number) => w * (1 + r / 30),
      from1RM: (rm: number, r: number) => rm / (1 + r / 30),
    },
    {
      name: "Brzycki",
      calc1RM: (w: number, r: number) => (w * 36) / (37 - r),
      from1RM: (rm: number, r: number) => (rm * (37 - r)) / 36,
    },
    {
      name: "Lombardi",
      calc1RM: (w: number, r: number) => w * Math.pow(r, 0.1),
      from1RM: (rm: number, r: number) => rm / Math.pow(r, 0.1),
    },
    {
      name: "O'Conner",
      calc1RM: (w: number, r: number) => w * (1 + 0.025 * r),
      from1RM: (rm: number, r: number) => rm / (1 + 0.025 * r),
    },
    {
      name: "Wathan",
      calc1RM: (w: number, r: number) => (w * 48.8) / (53.8 - 0.201 * r),
      from1RM: (rm: number, r: number) => (rm * (53.8 - 0.201 * r)) / 48.8,
    },
  ];

  // Probable reps list (1-12 or up to reps if reps > 12)
  const maxRows = 12;
  const probableReps = Array.from(
    { length: Math.max(maxRows, reps) },
    (_, i) => i + 1
  );

  // Calculate 1RM for each formula (in kg)
  const oneRMs = formulas.map((f) => f.calc1RM(weight, reps));

  // Display results in selected unit
  function display(val: number) {
    return unit === "imperial" ? (val * KG_TO_LB).toFixed(1) : val.toFixed(1);
  }

  // Only show up to 12 rows, but allow scrolling if more
  const visibleRows = probableReps; // show all rows up to reps
  const showScroll = reps > maxRows;

  return (
    <div className="bg-white rounded-2xl shadow-lg min-w-[500px] max-w-2xl mx-auto">
      {/* Header with solid color and icon */}
      <div className="rounded-t-2xl bg-red-600 px-8 pt-8 pb-6 flex items-center gap-4">
        <div>
          <div className="text-2xl font-bold text-white leading-tight">
            One-Rep Max Calculator
          </div>
        </div>
      </div>
      {/* End header */}
      <div className="p-8">
        <div className="bg-red-50 rounded-lg px-4 py-3 mb-6 text-red-700 text-base">
          Estimate the max weight you could lift for different reps, based on
          your input.
        </div>
        <div className="flex gap-4 justify-center mb-6">
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
              value={inputValue}
              onChange={handleWeightChange}
              placeholder={unit === "imperial" ? "Weight (lb)" : "Weight (kg)"}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none text-base w-28"
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
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              placeholder="Reps"
              className="px-4 py-2 rounded-lg border border-gray-300 focus:border-red-600 focus:outline-none text-base w-28"
            />
          </div>
        </div>
        <div className="mt-6 max-w-full overflow-x-auto">
          <div className={showScroll ? "max-h-96 overflow-y-auto" : ""}>
            <table className="w-full border-collapse text-sm min-w-[500px]">
              <thead>
                <tr>
                  <th className="bg-red-50 text-red-700 font-semibold py-2 px-1">
                    Reps
                  </th>
                  {formulas.map((f) => (
                    <th
                      key={f.name}
                      className="bg-red-50 text-red-700 font-semibold py-2 px-1"
                    >
                      {f.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((r) => (
                  <tr
                    key={r}
                    className={r === reps ? "bg-red-100" : "hover:bg-red-50"}
                  >
                    <td className="py-1 px-1 font-medium text-gray-800 text-center">
                      {r}
                    </td>
                    {formulas.map((f, i) => (
                      <td
                        key={f.name}
                        className="py-1 px-1 text-center text-gray-900"
                      >
                        {weight && reps
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
        </div>
      </div>
    </div>
  );
}

export default StrengthCalculator;
