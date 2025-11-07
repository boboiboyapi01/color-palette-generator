import { useState } from "react";

export default function Controls({ count, setCount, onGenerate}) {
  const [localCount, setLocalCount] = useState(count);

  function handleSlide(e) {
    const val = Number(e.target.value);
    setLocalCount(val);
    setCount(val);
  }

  return (
    <div className="h-[50px] flex items-center gap-4">
      <div className="flex items-center gap-2">
        <label className="text-m font-bold text-gray-600">Colors to Generate:</label>
        <input
          type="range"
          min="2"
          max="8"
          value={localCount}
          onChange={handleSlide}
          className="w-40 cursor-pointer"
        />
        <div className="w-8 text-right text-sm font-medium">{localCount}</div>
      </div>

      <button
        onClick={onGenerate}
        className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm transition-shadow shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
      >
        Generate
      </button>

      {/* <button
        onClick={onSave}
        className="px-3 py-2 bg-white text-gray-800 rounded border text-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
      >
        Save
      </button> */}
    </div>
  );
}
