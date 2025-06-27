import React, { useState } from "react";

function StrengthCalculator() {
  const [weight, setWeight] = React.useState(0);
  const [reps, setReps] = React.useState(1);

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

  // Probable reps list (1-12)
  const probableReps = Array.from({ length: 12 }, (_, i) => i + 1);

  // Calculate 1RM for each formula
  const oneRMs = formulas.map((f) => f.calc1RM(weight, reps));

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 min-w-[350px] max-w-[420px] mx-auto">
      <h2 className="text-xl font-bold text-blue-600 mb-2">
        One-Rep Max Calculator
      </h2>
      <div className="bg-blue-50 rounded-lg px-4 py-3 mb-6 text-blue-600 text-base">
        Estimate the max weight you could lift for different reps, based on your
        input.
      </div>
      <div className="flex gap-4 justify-center mb-6">
        <div className="flex flex-col items-start">
          <label
            className="text-blue-600 font-medium text-sm mb-1 ml-1"
            htmlFor="weight-input"
          >
            Weight (kg)
          </label>
          <input
            id="weight-input"
            type="number"
            min={1}
            value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            placeholder="Weight (kg)"
            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none text-base w-28"
          />
        </div>
        <div className="flex flex-col items-start">
          <label
            className="text-blue-600 font-medium text-sm mb-1 ml-1"
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
            className="px-4 py-2 rounded-lg border border-gray-200 focus:border-blue-600 focus:outline-none text-base w-28"
          />
        </div>
      </div>
      <div className="mt-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-blue-50 text-blue-600 font-semibold py-2 px-1">
                Reps
              </th>
              {formulas.map((f) => (
                <th
                  key={f.name}
                  className="bg-blue-50 text-blue-600 font-semibold py-2 px-1"
                >
                  {f.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {probableReps.map((r) => (
              <tr
                key={r}
                className={r === reps ? "bg-indigo-100" : "hover:bg-blue-50"}
              >
                <td className="py-1 px-1 font-medium text-center">{r}</td>
                {formulas.map((f, i) => (
                  <td key={f.name} className="py-1 px-1 text-center">
                    {weight && reps ? f.from1RM(oneRMs[i], r).toFixed(1) : "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const [tab, setTab] = useState("strength");

  return (
    <div>
      <div className="flex justify-center mb-8 gap-2">
        <button
          className={`${
            tab === "something"
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-50 text-gray-900"
          } rounded-t-2xl px-8 py-2 text-base transition-colors`}
          onClick={() => setTab("something")}
        >
          Something Calculator
        </button>
        <button
          className={`${
            tab === "strength"
              ? "bg-blue-600 text-white font-semibold"
              : "bg-gray-50 text-gray-900"
          } rounded-t-2xl px-8 py-2 text-base transition-colors`}
          onClick={() => setTab("strength")}
        >
          One-Rep Max Calculator
        </button>
      </div>
      <div className="flex justify-center">
        {tab === "something" && (
          <div className="bg-white rounded-2xl shadow-lg p-12 min-w-[350px] min-h-[300px] flex items-center justify-center text-lg text-gray-400">
            Something Calculator coming soon...
          </div>
        )}
        {tab === "strength" && <StrengthCalculator />}
      </div>
    </div>
  );
}

export default App;
