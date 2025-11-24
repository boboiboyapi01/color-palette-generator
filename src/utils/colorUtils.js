// colorUtils.js

import namer from "color-namer";

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function hslToCss({ h, s, l }) {
  return `hsl(${h} ${s}% ${l}%)`;
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

export function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h, 16);
  if (h.length === 3) {
    // short hex like #f0a
    const r = parseInt(h[0] + h[0], 16);
    const g = parseInt(h[1] + h[1], 16);
    const b = parseInt(h[2] + h[2], 16);
    return { r, g, b };
  } else {
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  }
}

export function rgbToHex({ r, g, b }) {
  const toHex = (n) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h: Math.round(h), s: +(s*100).toFixed(1), l: +(l*100).toFixed(1) }; // h:0-360, s/l in %
}

export function hslToRgb({ h, s, l }) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
}

export function hslToHex(hsl) {
  return rgbToHex(hslToRgb(hsl));
}

export function shiftHue(h, deg) {
  let nh = (h + deg) % 360;
  if (nh < 0) nh += 360;
  return Math.round(nh);
}

export function clamp(v, min=0, max=100) {
  return Math.max(min, Math.min(max, v));
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

export function generatePalette( count = 5) {
  const baseHue = randomInt(0, 359);
  const s = randomInt(50, 90);
  const l = randomInt(40, 80);

  return Array.from({ length: count }).map(() => ({
        h: randomInt(0, 359),
        s: randomInt(40, 100),
        l: randomInt(30, 80),
      }));
}
