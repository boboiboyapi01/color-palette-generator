import { randomColor, getColorName, hslToHex } from "../utils/colorUtils";
import ColorBox from "./ColorBox";
import ColorDetail from "./ColorDetail";
import { useState, useEffect, useRef, useCallback } from "react";

// Toast Component
function Toast({ message }) {
  return (
    <div className={`copy-toast ${message ? "show" : ""}`} aria-live="polite">
      {message && <>✓ {message}</>}
    </div>
  );
}

export default function MainComponent() {
  const [count, setCount] = useState(5);
  const [colors, setColors] = useState([]);
  const [locked, setLocked] = useState([]);
  const [selectedHex, setSelectedHex] = useState(null);
  const [toast, setToast] = useState("");
  const [spinning, setSpinning] = useState(false);
  const toastTimer = useRef(null);

  const generateColors = useCallback(
    (n, currentLocked = locked, currentColors = colors) => {
      const arr = Array.from({ length: n }, (_, i) =>
        currentLocked[i] ? currentColors[i] : randomColor(),
      );
      setColors(arr);
    },
    [locked, colors],
  );

  useEffect(() => {
    const newLocked = Array(count).fill(false);
    setLocked(newLocked);
    const arr = Array.from({ length: count }, () => randomColor());
    setColors(arr);
    setSelectedHex(null);
  }, [count]);

  function handleToggleLock(index) {
    setLocked((prev) => prev.map((lk, i) => (i === index ? !lk : lk)));
  }

  function handleGenerate() {
    setSpinning(true);
    generateColors(count);
    setTimeout(() => setSpinning(false), 500);
  }

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2200);
  }

  return (
    <div className="max-w-7xl mx-auto animate-fade-slide">
      {/* ── Header Row ──────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text)]">
            Your Palette
          </h2>
          <p className="text-sm text-[var(--text-muted)] mt-0.5">
            Click a color to explore harmonies · Hover to copy values
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-5 glass px-5 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">
              Colors
            </span>
            <span className="text-lg font-bold gradient-text w-5 text-center">
              {count}
            </span>
            <input
              type="range"
              min="1"
              max="5"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="w-24"
              aria-label="Number of colors"
            />
          </div>

          <div className="w-px h-6 bg-white/10 rounded-full" />

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-white cursor-pointer
              bg-gradient-to-r from-violet-600 to-cyan-500
              shadow-[0_0_20px_rgba(124,106,255,0.4)]
              hover:shadow-[0_0_28px_rgba(124,106,255,0.65)]
              hover:scale-105 active:scale-95
              transition-all duration-200"
            id="generate-btn"
          >
            <span className={`btn-spin ${spinning ? "spinning" : ""}`}>↻</span>
            Generate
          </button>
        </div>
      </div>

      {/* ── Two-column layout ────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Palette Card */}
        <div className="glass-strong rounded-2xl overflow-hidden max-h-80 shadow-2xl shadow-black/40 lg:flex-2">
          <div
            className="flex"
            style={{ minHeight: "320px" }}
          >
            {colors.map((color, index) => (
              <ColorBox
                key={index}
                color={color}
                index={index}
                locked={locked[index]}
                onToggleLock={() => handleToggleLock(index)}
                onCopy={showToast}
                onSelect={(hex) => setSelectedHex(hex)}
              />
            ))}
          </div>

          {/* Hex codes row */}
          <div className="flex border-t border-white/10">
            {colors.map((color, i) => {
              const hex = hslToHex(color);
              return (
                <div
                  key={i}
                  className="flex-1 text-center py-2 text-[11px] font-mono text-[var(--text-muted)] truncate px-1
                    border-r border-white/5 last:border-r-0 hover:text-[var(--text)] transition-colors"
                >
                  {hex.toUpperCase()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="lg:flex-[1.4] min-w-0">
          {selectedHex ? (
            <ColorDetail hex={selectedHex} />
          ) : (
            <div
              className="glass rounded-2xl flex flex-col items-center justify-center text-center p-10 gap-4 h-full"
              style={{ minHeight: "200px" }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 flex items-center justify-center text-3xl">
                🎨
              </div>
              <div>
                <p className="font-semibold text-[var(--text)]">
                  Select a Color
                </p>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Click any color swatch to see its harmony schemes and details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Toast message={toast} />
    </div>
  );
}
