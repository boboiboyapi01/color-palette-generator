// Utilities to generate HSL colors and convert to HEX/RGB strings

export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomColorHSL() {
  const h = randomInt(0, 359);
  const s = randomInt(55, 90); // saturation
  const l = randomInt(35, 60); // lightness
  return { h, s, l };
}

export function hslToCss({ h, s, l }) {
  return `hsl(${h} ${s}% ${l}%)`;
}

// Convert HSL to RGB
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

// Convert HSL to HEX
export function hslToHex(hsl) {
  const { h, s, l } = hsl;
  const rgb = hslToRgb({ h, s, l });
  // rgb is like "rgb(r, g, b)"
  const nums = rgb.match(/\d+/g).map(Number);
  return (
    "#" +
    nums
      .map((n) => n.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

export function generatePalette(count = 5) {
  return Array.from({ length: count }).map(() => randomColorHSL());
}
