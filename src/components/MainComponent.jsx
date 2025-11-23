import { randomColor, getColorName, hslToHex } from "../utils/colorUtils";
import ColorBox from "./ColorBox";
import ColorDetail from "./ColorDetail";
import { useState, useEffect } from "react";

export default function MainComponent() {
  const [count, setCount] = useState(5);
  const [colors, setColors] = useState([]);
  const [locked, setLocked] = useState([]);
  const [selectedHex, setSelectedHex] = useState(null);

  const generateColors = (n) => {
    const arr = Array.from({ length: n }, (_, i) =>
      locked[i] ? colors[i] : randomColor()
    );
    setColors(arr);
  };

  useEffect(() => {
    setLocked(Array(count).fill(false)); 
    generateColors(count);
  }, [count]);

  function handleToggleLock(index) {
    setLocked((prev) => prev.map((lk, i) => (i === index ? !lk : lk)));
  }

  function handleCopy(msg) {
    alert(msg); // atau tampilkan toast
  }

  return (
    <div className="min-h-screen w-full rounded-2xl mt-6 flex bg-white">
      {/* Generator Section */}
      <div className="w-4/7 aspect-video p-6 mx-10 mt-15 border-r border-gray-300">
        <div className="flex justify-between border rounded-t-xl items-center ">
          <h2 className="ml-4">Generator</h2>
          <div>
            <input
              type="range"
              min="1"
              max="5"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
            <button
              onClick={() => generateColors(count)}
              className="m-4 p-2 bg-blue-400 hover:bg-blue-300 rounded"
            >
              Go!
            </button>
          </div>
        </div>
        <div className="border-b border-l border-r rounded-b-xl overflow-hidden">
          {/* Generator content goes here */}
          {colors.map((color, index) => (
            <ColorBox
              key={index}
              color={color}
              index={index}
              locked={locked[index]}
              onToggleLock={() => handleToggleLock(index)}
              onCopy={handleCopy}
              onSelect={(hex) => setSelectedHex(hex)}
            />
          ))}
        </div>
      </div>
      {/* Details Section */}
      <div className="mt-15">
        <h2 className="text-4xl">Details</h2>
        {selectedHex ? (
          <ColorDetail hex={selectedHex} />
        ) : (
          <div className="text-gray-500">
            Klik warna untuk melihat detail
          </div>
        )}
      </div>
    </div>
  );
}
