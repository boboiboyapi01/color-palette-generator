import { useState } from "react";
import { hslToCss, hslToHex, hslToRgb } from "../utils/colorUtils";
import namer from "color-namer";

export default function ColorBox({ color, index, onCopy, locked, onToggleLock }) {
  const [open, setOpen] = useState(false);

  const css = hslToCss(color);
  const hex = hslToHex(color);
  const rgb = hslToRgb(color);
  const hslText = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;

  async function handleCopy(text) {
    try {
      await navigator.clipboard.writeText(text);
      onCopy(`${text} copied`);
    } catch (e) {
      onCopy("Copy failed");
    }
  }

  function getColorName(hex) {
    try {
      return namer(hex).pantone[0].name; // ambil nama warna terdekat dari palet Pantone
    } catch {
      return "Unknown Color";
    }
  }

  return (
    <div
      className="flex-1 relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="relative w-full h-full flex items-end p-6 select-none transition-transform duration-300 justify-center"
        style={{ background: css }}
      >
        <div className="flex z-10 bg-white/70 backdrop-blur-sm px-3 py-2 rounded justify-center ">
          <div className="text-[20px] font-sans">{getColorName(hex)}</div>
          {/* <div className="text-[30px] text-gray-600">{hslText}</div> */}
        </div>
      </div>

      {open && (
        <div className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center z-20">
          <div
            className="bg-white/95 p-3 rounded-lg shadow-lg text-xs flex flex-col items-center gap-2 transition-opacity duration-150"
            role="dialog"
          >
            <div className="flex flex-col gap-2 items-center justify-center">
              <button
                onClick={() => handleCopy(hex)}
                className="px-2 py-1 rounded bg-indigo-600 text-white text-xs transition hover:bg-indigo-500 cursor-pointer"
              >
                Copy HEX
              </button>
              <button
                onClick={() => handleCopy(rgb)}
                className="px-2 py-1 rounded bg-gray-800 text-white text-xs transition hover:bg-gray-700 cursor-pointer"
              >
                Copy RGB
              </button>
              <button
                onClick={() => handleCopy(hslText)}
                className="px-2 py-1 rounded border text-xs transition hover:bg-gray-50 cursor-pointer"
              >
                Copy HSL
              </button>
              <button
                onClick={onToggleLock}
                className="px-2 py-1 rounded border text-xs transition hover:bg-gray-50 cursor-pointer"
              >
                {locked ? "Unlock" : "Lock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
