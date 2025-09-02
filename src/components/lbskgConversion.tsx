import { useState } from "react";

export default function LbsKgConversion() {
  const [weight, setWeight] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<"lbs" | "kg">("lbs");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const convertWeight = () => {
    // Clear previous results and errors
    setResult("");
    setError("");

    // Validate input
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      setError("Please enter a valid positive number");
      return;
    }

    const weightValue = parseFloat(weight);
    let convertedValue: number;
    let resultUnit: string;

    if (fromUnit === "lbs") {
      // Convert lbs to kg
      convertedValue = weightValue * 0.453592;
      resultUnit = "kg";
    } else {
      // Convert kg to lbs
      convertedValue = weightValue * 2.20462;
      resultUnit = "lbs";
    }

    setResult(`${convertedValue.toFixed(2)} ${resultUnit}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      convertWeight();
    }
  };

  const clearAll = () => {
    setWeight("");
    setResult("");
    setError("");
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 min-w-[350px] max-w-[500px] mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
        Weight Converter
      </h2>

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <input
            type="number"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            onKeyPress={handleKeyPress}
            className="px-4 py-3 rounded-xl border border-gray-300 text-base w-full sm:w-36 outline-none transition-colors focus:border-green-500"
            step="0.01"
            min="0"
          />

          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as "lbs" | "kg")}
            className="px-4 py-3 rounded-xl border border-gray-300 text-base bg-white cursor-pointer outline-none transition-colors focus:border-green-500 w-full sm:w-auto"
          >
            <option value="lbs">Pounds (lbs)</option>
            <option value="kg">Kilograms (kg)</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={convertWeight}
            className="bg-green-600 text-white border-none px-8 py-3 rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-green-700 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            Convert
          </button>
          <button
            onClick={clearAll}
            className="bg-gray-500 text-white border-none px-8 py-3 rounded-xl text-base font-semibold cursor-pointer transition-all hover:bg-gray-600 hover:-translate-y-0.5 active:translate-y-0 w-full sm:w-auto"
          >
            Clear
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-200 text-center font-medium">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <h3 className="text-green-700 mb-2 text-lg font-semibold">
              Result:
            </h3>
            <div className="text-2xl font-bold text-green-800">{result}</div>
          </div>
        )}

        <div className="bg-gray-50 rounded-xl p-4 text-left border border-gray-200">
          <p className="mb-2 text-gray-700 text-sm">
            <strong className="text-gray-800">Conversion rates:</strong>
          </p>
          <p className="mb-1 text-gray-600 text-sm">
            1 pound (lb) = 0.453592 kilograms (kg)
          </p>
          <p className="text-gray-600 text-sm">
            1 kilogram (kg) = 2.20462 pounds (lb)
          </p>
        </div>
      </div>
    </div>
  );
}
