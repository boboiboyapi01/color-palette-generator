import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Controls from "./components/Controls";
import ColorBox from "./components/ColorBox";
import { generatePalette, hslToCss } from "./utils/colorUtils";

export default function App() {
  const [count, setCount] = useState(5);
  const [palette, setPalette] = useState(() => {
    try {
      const raw = localStorage.getItem("last-palette");
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return generatePalette(5);
  });
  const [toast, setToast] = useState("");
  const [locked, setLocked] = useState(Array(count).fill(false));

  function toggleLock(idx) {
    setLocked((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }

  function handleGenerate() {
    setPalette((prev) =>
      prev.map((c, i) => (locked[i] ? c : generatePalette(1)[0]))
    );
    localStorage.setItem("last-palette", JSON.stringify(palette));
  }

  function handleSave() {
    try {
      const saved = JSON.parse(localStorage.getItem("saved-palettes") || "[]");
      saved.unshift({ id: Date.now(), palette });
      localStorage.setItem("saved-palettes", JSON.stringify(saved));
      setToast("Palette saved");
      setTimeout(() => setToast(""), 1500);
    } catch (e) {
      setToast("Save failed");
      setTimeout(() => setToast(""), 1500);
    }
  }

  useEffect(() => {
    // ensure palette length matches count (if user reduces slider)
    if (palette.length !== count) {
      const truncated = palette.slice(0, count);
      while (truncated.length < count)
        truncated.push(...generatePalette(count - truncated.length));
      setPalette(truncated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  function showCopied(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 1200);
  }

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div></div>
        <Controls
          count={count}
          setCount={setCount}
          onGenerate={handleGenerate}
          onSave={handleSave}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        {palette.map((c, i) => (
          <ColorBox
            key={i}
            color={c}
            index={i}
            onCopy={showCopied}
            locked={locked[i]}
            onToggleLock={() => toggleLock(i)}
          />
        ))}
      </div>

      {toast && <div className="copy-toast">{toast}</div>}
    </div>
  );
}
