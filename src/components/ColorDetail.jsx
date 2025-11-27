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

export default function ColorDetails({ hex }) {
  const harmonies = useMemo(() => generateHarmonies(hex), [hex]);
  const complementary = harmonies.filter((h) => h.label === "Complementary");
  const analogous = harmonies.filter((h) => h.label.startsWith("Analogous"));
  const triadic = harmonies.filter((h) => h.label.startsWith("Triadic"));
  const splitComp = harmonies.filter((h) => h.label.startsWith("Split-Comp"));
  const tetradic = harmonies.filter((h) => h.label.startsWith("Tetradic"));
  const square = harmonies.filter((h) => h.label.startsWith("Square"));
  const monochromatic = harmonies.filter((h) => h.label.startsWith("Mono"));
  const shadeTint = harmonies.filter(
    (h) => h.label === "Shade -" || h.label === "Tint +"
  );

  return (
    <div className="p-4 mr-10 lg:mr-0 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-semibold mb-3">Color Details</h2>

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

        <div className="p-6 max-w-4xl mx-auto ">
          <h3 className="text-2xl font-semibold py-2">Harmony</h3>

          {/* Complementary */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Complementary</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: complementary[0].hex }}
              ></div>
            </div>
          </div>

          {/* Analogous */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Analogous</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div
                className="flex-1"
                style={{ background: analogous[0].hex }}
              ></div>
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: analogous[1].hex }}
              ></div>
            </div>
          </div>

          {/* Triadic */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Triadic</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div
                className="flex-1"
                style={{ background: triadic[0].hex }}
              ></div>
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: triadic[1].hex }}
              ></div>
            </div>
          </div>

          {/* Split-Complementary */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Split-Complementary</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: splitComp[0].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: splitComp[1].hex }}
              ></div>
            </div>
          </div>

          {/* Tetradic */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Tetradic</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: tetradic[0].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: tetradic[1].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: tetradic[2].hex }}
              ></div>
            </div>
          </div>

          {/* Square */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Square</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: square[0].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: square[1].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: square[2].hex }}
              ></div>
            </div>
          </div>

          {/* Monochromatic */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Monochromatic</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div
                className="flex-1"
                style={{ background: monochromatic[0].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: monochromatic[1].hex }}
              ></div>
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: monochromatic[2].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: monochromatic[3].hex }}
              ></div>
            </div>
          </div>

          {/* Shade & Tint */}
          <div className="my-3 space-y-2 bg-gray-50 p-4 rounded">
            <h4 className="font-medium">Shade & Tint</h4>
            <div className="flex gap-0 h-20 rounded overflow-hidden">
              <div className="flex-1" style={{ background: hex }}></div>
              <div
                className="flex-1"
                style={{ background: shadeTint[0].hex }}
              ></div>
              <div
                className="flex-1"
                style={{ background: shadeTint[1].hex }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
