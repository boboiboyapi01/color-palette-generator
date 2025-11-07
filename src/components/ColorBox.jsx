import { useState } from "react";
import { hslToCss, hslToHex, hslToRgb } from "../utils/colorUtils";

export default function ColorBox({ color, index, onCopy }) {
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

  return (
    <div 
      className="flex-1 relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <div
        
        className="relative w-full h-full flex items-end p-6 select-none transition-transform duration-300"
        style={{ background: css }}
      >
        <div className="flex z-10 bg-white/70 backdrop-blur-sm px-3 py-2 rounded justify-center ">
          <div className="text-[30px] font-sans">{hex}</div>
          {/* <div className="text-[30px] text-gray-600">{hslText}</div> */}
        </div>
      </div>

      {open && (
        <div className="absolute left-4 top-4 bg-white/95 p-3 rounded-lg shadow-lg text-xs z-20">
          <div className="mb-2 font-medium">Color #{index + 1}</div>
          <div className="flex gap-2 mb-2">
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
          </div>
          <div>
            <button
              onClick={() => handleCopy(hslText)}
              className="px-2 py-1 rounded border text-xs transition hover:bg-gray-50 cursor-pointer"
            >
              Copy HSL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
