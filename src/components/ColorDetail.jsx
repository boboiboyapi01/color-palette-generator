// ColorDetails.jsx
import { useMemo } from "react";
import { getColorName } from "../utils/colorUtils";
import {
  hexToRgb,
  rgbToHsl,
  hslToHex,
  hslToRgb,
  shiftHue,
  clamp,
} from "../utils/colorUtils";

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
  pushHsl(shiftHue(base.h, 90), base.s, base.l, "Tetradic +90");
  pushHsl(shiftHue(base.h, 180), base.s, base.l, "Tetradic +180");
  pushHsl(shiftHue(base.h, 270), base.s, base.l, "Tetradic +270");
  pushHsl(shiftHue(base.h, 90), base.s, base.l, "Square +90");
  pushHsl(shiftHue(base.h, 270), base.s, base.l, "Square +270");
  [20, 40, 60, 80].forEach((L) => pushHsl(base.h, base.s, L, `Mono L=${L}%`));
  pushHsl(base.h, clamp(base.s * 0.9), clamp(base.l * 0.6), "Shade -");
  pushHsl(base.h, clamp(base.s * 0.95), clamp(base.l * 1.1), "Tint +");
  return harmonies;
}

export default function ColorDetails({ hex }) {
  const harmonies = useMemo(() => generateHarmonies(hex), [hex]);

  return (
    <div className="p-4 mr-10 lg:mr-0 border rounded-lg shadow-md bg-white">
      <h3 className="text-2xl font-semibold mb-3">Color Details</h3>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2 p-3 rounded bg-gray-50">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded"
              style={{ background: hex }}
              aria-hidden
            />
            <div>
              <div className="font-medium">{getColorName(hex)}</div>
              <div className="text-sm">{hex}</div>
            </div>
          </div>
        </div>

        {harmonies.map((h, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded border">
            <div
              className="w-12 h-12 rounded"
              style={{ background: h.hex }}
              title={`${h.label} — ${h.hex}`}
            />
            <div>
              <div className="text-sm font-medium">{h.label}</div>
              <div className="text-xs text-gray-600">{h.hex}</div>
              {typeof getColorName === "function" && (
                <div className="text-xs text-gray-500">
                  {getColorName ? getColorName(h.hex) : null}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
