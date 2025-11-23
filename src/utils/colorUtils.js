// colorUtils.js

import namer from "color-namer";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hslToCss({ h, s, l }) {
  return `hsl(${h} ${s}% ${l}%)`;
}

export function hslToRgb({ h, s, l }) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const color =
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * color);
  };
  return `rgb(${f(0)}, ${f(8)}, ${f(4)})`;
}

export function hslToHex(hsl) {
  const { h, s, l } = hsl;
  const rgb = hslToRgb({ h, s, l });
  const nums = rgb.match(/\d+/g).map(Number);
  return (
    "#" +
    nums
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function getColorName(hex) {
  try {
    const names = namer(hex);
    return (
      names.pantone?.[0]?.name ||
      names.html?.[0]?.name ||
      names.ntc?.[0]?.name ||
      "Unknown Color"
    );
  } catch {
    return "Unknown Color";
  }
}

export function randomColor() {
  const h = Math.floor(Math.random() * 360); // 0 - 359
  // Saturation 45-85% supaya warna tidak terlalu gray
  const s = Math.floor(45 + Math.random() * 40);
  // Lightness 25-70% supaya tidak terlalu gelap atau putih
  const l = Math.floor(25 + Math.random() * 45);

  return { h, s, l };
}

/* Generators */

export function generatePalette(mode = "random", count = 5) {
  const baseHue = randomInt(0, 359);
  const s = randomInt(50, 90);
  const l = randomInt(40, 80);

  switch (mode) {
    /* MONOKROMATIK */
    case "monochromatic":
      return Array.from({ length: count }).map((_, i) => ({
        h: baseHue, // Hue tetap sama
        s: Math.max(20, Math.min(100, s - i * 5)), // Saturation turun perlahan
        l: Math.max(15, Math.min(85, l + (i - Math.floor(count / 2)) * 15)), // Lightness variasi
      }));

    /* ANALOGUS */
    case "analogous":
      return Array.from({ length: count }).map((_, i) => ({
        h: (baseHue + i * 25) % 360,
        s: randomInt(55, 90),
        l: randomInt(35, 65),
      }));

    /* KOMPLEMENTER */
    case "complementary":
      return [
        { h: baseHue, s, l },
        { h: (baseHue + 180) % 360, s, l },
        { h: (baseHue + 20) % 360, s, l },
        { h: (baseHue + 200) % 360, s, l },
        { h: (baseHue + 160) % 360, s, l },
      ];

    /* SPLIT KOMPLEMENTER */
    case "split-complementary":
      return [
        { h: baseHue, s, l },
        { h: (baseHue + 150) % 360, s, l },
        { h: (baseHue + 210) % 360, s, l },
        { h: (baseHue + 30) % 360, s, l },
        { h: (baseHue + 330) % 360, s, l },
      ];

    /* TRIADIK */
    case "triadic":
      return [
        { h: baseHue, s, l },
        { h: (baseHue + 120) % 360, s, l },
        { h: (baseHue + 240) % 360, s, l },
        { h: (baseHue + 60) % 360, s, l },
        { h: (baseHue + 300) % 360, s, l },
      ];

    /* TETRADIK */
    case "tetradic":
      return [
        { h: baseHue, s, l },
        { h: (baseHue + 90) % 360, s, l },
        { h: (baseHue + 180) % 360, s, l },
        { h: (baseHue + 270) % 360, s, l },
        { h: (baseHue + 45) % 360, s, l },
      ];

    /* SQUARE */
    case "square":
      return [
        { h: baseHue, s, l },
        { h: (baseHue + 90) % 360, s, l },
        { h: (baseHue + 180) % 360, s, l },
        { h: (baseHue + 270) % 360, s, l },
        { h: (baseHue + 315) % 360, s, l },
      ];

    /* AKROMATIK */
    case "achromatic":
      return Array.from({ length: count }).map(() => ({
        h: 0,
        s: 0,
        l: randomInt(10, 90),
      }));

    /* DEFAULT RANDOM */
    default:
      return Array.from({ length: count }).map(() => ({
        h: randomInt(0, 359),
        s: randomInt(40, 100),
        l: randomInt(30, 80),
      }));
  }
}
