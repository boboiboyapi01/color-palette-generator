import { useState, useCallback } from "react";
import { hslToCss, hslToHex, hslToRgb } from "../utils/colorUtils";

// Returns true if white text is more readable on given hex background
function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  // Perceived luminance formula
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.55;
}

export default function ColorBox({ color, index, onCopy, locked, onToggleLock, onSelect }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(null);

  const css     = hslToCss(color);
  const hex     = hslToHex(color);
  const rgb     = hslToRgb(color);
  const hslText = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;

  const textClass = isDark(hex) ? "text-white" : "text-gray-900";
  const pillBg    = isDark(hex) ? "bg-white/20" : "bg-black/15";

  async function handleCopy(text, label) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      onCopy(`${label} copied!`);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      onCopy("Copy failed");
    }
  }

  return (
    <div
      className="relative flex-1 cursor-pointer transition-all duration-300"
      style={{ minHeight: "130px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(hex)}
    >
      {/* Main color swatch */}
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 px-3 py-4 transition-all duration-300 select-none relative"
        style={{
          background: css,
          transform: hovered ? "scaleY(1.02)" : "scaleY(1)",
          transformOrigin: "center",
        }}
      >
        {/* Lock indicator */}
        {locked && (
          <div className={`absolute top-3 left-3 text-sm ${textClass} opacity-80`} title="Locked">
            🔒
          </div>
        )}

        {/* Color info chip */}
        <div className={`${pillBg} backdrop-blur-sm px-3 py-1.5 rounded-full flex flex-col items-center`}>
          <span className={`text-sm font-bold tracking-wide ${textClass}`}>{hex.toUpperCase()}</span>
        </div>

        {/* Hover action buttons */}
        <div
          className={`absolute bottom-3 inset-x-2 flex flex-col gap-1 justify-center transition-all duration-200 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          {[
            { label: "HEX", value: hex },
            { label: "RGB", value: rgb },
            { label: "HSL", value: hslText },
          ].map(({ label, value }) => (
            <button
              key={label}
              onClick={(e) => { e.stopPropagation(); handleCopy(value, label); }}
              className={`text-[10px] font-semibold px-2 py-1 rounded-full
                ${copied === label
                  ? "bg-green-400 text-white"
                  : isDark(hex)
                    ? "bg-white/25 hover:bg-white/40 text-white"
                    : "bg-black/20 hover:bg-black/35 text-gray-900"
                }
                backdrop-blur-sm transition-all duration-150 cursor-pointer select-none`}
            >
              {copied === label ? "✓" : label}
            </button>
          ))}

          {/* Lock toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleLock(); }}
            title={locked ? "Unlock" : "Lock"}
            className={`text-[10px] font-semibold px-2 py-1 rounded-full
              ${locked
                ? "bg-amber-400 text-gray-900"
                : isDark(hex)
                  ? "bg-white/25 hover:bg-white/40 text-white"
                  : "bg-black/20 hover:bg-black/35 text-gray-900"
              }
              backdrop-blur-sm transition-all duration-150 cursor-pointer select-none`}
          >
            {locked ? "🔓" : "🔒"}
          </button>
        </div>
      </div>
    </div>
  );
}
