// ColorDetails.jsx
import { useMemo, useState } from "react";
import { getColorName } from "../utils/colorUtils";
import {
  hexToRgb,
  rgbToHsl,
  hslToHex,
  hslToRgb,
  shiftHue,
  clamp,
} from "../utils/colorUtils";

// Returns white or black text class based on luminance
function isDark(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.55;
}

function generateHarmonies(hex) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const base = hsl;
  const harmonies = [];

  const pushHsl = (h, s, l, label) => {
    const hexx = hslToHex({ h, s: clamp(s, 0, 100), l: clamp(l, 0, 100) });
    harmonies.push({ label, hex: hexx, hsl: { h, s, l } });
  };

  pushHsl(shiftHue(base.h, 180), base.s, base.l, "Complementary");
  pushHsl(shiftHue(base.h, -30), base.s, base.l, "Analogous -30");
  pushHsl(shiftHue(base.h, 30), base.s, base.l, "Analogous +30");
  pushHsl(shiftHue(base.h, -120), base.s, base.l, "Triadic -120");
  pushHsl(shiftHue(base.h, 120), base.s, base.l, "Triadic +120");
  pushHsl(shiftHue(base.h, -150), base.s, base.l, "Split-Comp -150");
  pushHsl(shiftHue(base.h, 150), base.s, base.l, "Split-Comp +150");
  pushHsl(shiftHue(base.h, 180), base.s, base.l, "Tetradic complementer A");
  pushHsl(shiftHue(base.h, 60), base.s, base.l, "Tetradic C, A offset 60");
  pushHsl(shiftHue(base.h, 240), base.s, base.l, "Tetradic complementer C");
  pushHsl(shiftHue(base.h, 90), base.s, base.l, "Square +90");
  pushHsl(shiftHue(base.h, 180), base.s, base.l, "Square +180");
  pushHsl(shiftHue(base.h, 270), base.s, base.l, "Square +270");
  [20, 40, 60, 80].forEach((L) => pushHsl(base.h, base.s, L, `Mono L=${L}%`));
  pushHsl(base.h, clamp(base.s * 0.9), clamp(base.l * 0.6), "Shade -");
  pushHsl(base.h, clamp(base.s * 0.95), clamp(base.l * 1.1), "Tint +");
  return harmonies;
}

/* ── Harmony Swatch Strip ────────────────────────────── */
function HarmonyStrip({ label, colors }) {
  const [copiedHex, setCopiedHex] = useState(null);

  async function handleCopy(hex) {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1200);
    } catch {}
  }

  return (
    <div className="group">
      {/* Label */}
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </span>
      </div>

      {/* Swatches */}
      <div className="flex rounded-xl overflow-hidden h-14 shadow-md shadow-black/30">
        {colors.map(({ hex }, i) => (
          <button
            key={i}
            title={`Copy ${hex}`}
            onClick={() => handleCopy(hex)}
            className="flex-1 relative group/swatch cursor-pointer border-0 p-0 transition-all duration-200"
            style={{ background: hex }}
          >
            {/* Hex on hover */}
            <span
              className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold tracking-wide opacity-0 group-hover/swatch:opacity-100 transition-opacity duration-150
                ${isDark(hex) ? "text-white" : "text-gray-900"}`}
            >
              {copiedHex === hex ? "✓" : hex.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main ColorDetails component ─────────────────────── */
export default function ColorDetails({ hex }) {
  const harmonies     = useMemo(() => generateHarmonies(hex), [hex]);
  const complementary = harmonies.filter((h) => h.label === "Complementary");
  const analogous     = harmonies.filter((h) => h.label.startsWith("Analogous"));
  const triadic       = harmonies.filter((h) => h.label.startsWith("Triadic"));
  const splitComp     = harmonies.filter((h) => h.label.startsWith("Split-Comp"));
  const tetradic      = harmonies.filter((h) => h.label.startsWith("Tetradic"));
  const square        = harmonies.filter((h) => h.label.startsWith("Square"));
  const monochromatic = harmonies.filter((h) => h.label.startsWith("Mono"));
  const shadeTint     = harmonies.filter((h) => h.label === "Shade -" || h.label === "Tint +");

  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  const colorName = getColorName(hex);

  const [copiedField, setCopiedField] = useState(null);

  async function copyField(text, field) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1200);
    } catch {}
  }

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`;

  return (
    <div className="glass-strong rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-fade-slide flex flex-col">
      {/* ── Header / Base Color ──────────────────────── */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-4">
          {/* Big swatch */}
          <div
            className="w-16 h-16 rounded-xl shadow-lg shrink-0 ring-2 ring-white/10"
            style={{ background: hex }}
          />
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-[var(--text)] leading-tight">{colorName}</h2>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[
                { label: "HEX", value: hex },
                { label: "RGB", value: rgbStr },
                { label: "HSL", value: hslStr },
              ].map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => copyField(value, label)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-md cursor-pointer border transition-all duration-150 select-none
                    ${copiedField === label
                      ? "bg-green-500/20 border-green-400/50 text-green-400"
                      : "bg-white/5 border-white/10 text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text)]"
                    }`}
                >
                  {copiedField === label ? `✓ ${label}` : `${label}: ${value}`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Harmony Schemes ──────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <h3 className="text-sm font-bold uppercase tracking-widest gradient-text">
          Color Harmonies
        </h3>

        <HarmonyStrip
          label="Complementary"
          colors={[{ hex }, ...complementary]}
        />
        <HarmonyStrip
          label="Analogous"
          colors={[{ hex: analogous[0].hex }, { hex }, { hex: analogous[1].hex }]}
        />
        <HarmonyStrip
          label="Triadic"
          colors={[{ hex: triadic[0].hex }, { hex }, { hex: triadic[1].hex }]}
        />
        <HarmonyStrip
          label="Split-Complementary"
          colors={[{ hex }, { hex: splitComp[0].hex }, { hex: splitComp[1].hex }]}
        />
        <HarmonyStrip
          label="Tetradic"
          colors={[{ hex }, ...tetradic.slice(0, 3)]}
        />
        <HarmonyStrip
          label="Square"
          colors={[{ hex }, ...square]}
        />
        <HarmonyStrip
          label="Monochromatic"
          colors={[
            { hex: monochromatic[0].hex },
            { hex: monochromatic[1].hex },
            { hex },
            { hex: monochromatic[2].hex },
            { hex: monochromatic[3].hex },
          ]}
        />
        <HarmonyStrip
          label="Shade & Tint"
          colors={[{ hex }, { hex: shadeTint[0].hex }, { hex: shadeTint[1].hex }]}
        />
      </div>
    </div>
  );
}
