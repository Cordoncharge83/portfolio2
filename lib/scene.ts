/**
 * Deterministic geometry for the dusk village band. Runs at build time only,
 * so the scene ships as plain SVG with no client JavaScript.
 */

export interface Star {
  cx: number;
  cy: number;
  r: number;
}

export interface Cottage {
  glow: { cx: number; cy: number; rx: number; ry: number };
  wall: { x: number; y: number; width: number; height: number };
  roof: string;
  windows: { x: number; y: number; width: number; height: number }[];
}

export interface Scene {
  stars: Star[];
  farTrees: string[];
  nearTrees: string[];
  cottages: Cottage[];
}

const round = (n: number) => Math.round(n * 10) / 10;

function pine(x: number, base: number, h: number): string {
  const w = h * 0.42;
  const p = (px: number, py: number) => `${round(px)} ${round(py)}`;
  return [
    `M${p(x, base - h)}`,
    `L${p(x + w / 2, base - h * 0.45)}`,
    `L${p(x + w * 0.3, base - h * 0.45)}`,
    `L${p(x + w * 0.62, base)}`,
    `L${p(x - w * 0.62, base)}`,
    `L${p(x - w * 0.3, base - h * 0.45)}`,
    `L${p(x - w / 2, base - h * 0.45)}`,
    "Z",
  ].join(" ");
}

export function buildScene(seed = 7): Scene {
  // Park–Miller PRNG, same sequence as the approved style tile.
  let s = seed;
  const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;

  const stars: Star[] = [];
  for (let i = 0; i < 40; i++) {
    stars.push({ cx: round(rand() * 1200), cy: round(rand() * 120), r: round(rand() * 1.2 + 0.4) });
  }

  const farTrees: string[] = [];
  for (let x = 0; x < 1220; x += 14 + rand() * 18) {
    if (x < 470 || x > 760) farTrees.push(pine(x, 205 - rand() * 18, 30 + rand() * 30));
  }

  const nearTrees: string[] = [];
  for (let x = -10; x < 1220; x += 30 + rand() * 60) {
    if (x < 360 || x > 860) nearTrees.push(pine(x, 285, 50 + rand() * 50));
  }

  const cottages: Cottage[] = (
    [
      [500, 222, 52, 34],
      [575, 214, 64, 42],
      [660, 220, 48, 32],
      [722, 226, 40, 26],
    ] as const
  ).map(([x, y, w, h]) => {
    const ww = Math.max(7, w * 0.16);
    return {
      glow: { cx: x + w / 2, cy: y - h / 2, rx: round(w * 0.9), ry: round(h * 0.8) },
      wall: { x, y: y - h, width: w, height: h },
      roof: `M${x - 6} ${y - h} L${x + w / 2} ${round(y - h - h * 0.75)} L${x + w + 6} ${y - h} Z`,
      windows: [
        { x: round(x + w * 0.2), y: round(y - h * 0.62), width: round(ww), height: round(ww * 1.2) },
        { x: round(x + w * 0.62), y: round(y - h * 0.62), width: round(ww), height: round(ww * 1.2) },
      ],
    };
  });

  return { stars, farTrees, nearTrees, cottages };
}
