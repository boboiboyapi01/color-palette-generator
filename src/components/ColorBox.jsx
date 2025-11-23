import { useState } from "react";
import { hslToCss, hslToHex, hslToRgb } from "../utils/colorUtils";

export default function ColorBox({ color, index, onCopy, locked, onToggleLock, onSelect }) {
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
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className="relative w-full cursor-pointer h-full flex p-6 select-none transition-transform duration-300 justify-start"
        style={{ background: css }}
        onClick={() => onSelect(hex)}
      >
        <div className="flex z-10 bg-white/70 backdrop-blur-sm px-3 py-2 rounded justify-center ">
          <div className="text-[20px] font-sans">{hex}</div>
        </div>

        {open && (
        <div className="w-full flex items-center justify-end z-20" >
          <div
            className="bg-white/95 p-2 rounded-lg shadow-lg text-xs flex items-center gap-2 transition-opacity duration-150"
            role="dialog"
          >
            <div className="flex gap-2 items-center justify-center">
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

      
    </div>
  );
}
