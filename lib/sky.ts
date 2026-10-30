/**
 * Deterministic geometry for the night skies and pine silhouettes.
 * Runs at build time in server components, so each scene ships as a few SVG paths and no
 * client JavaScript. Generators return path data keyed by colour role: components map the
 * roles to theme tokens, and the Open Graph images can map them to fixed colours.
 */

/** Park–Miller minimal standard PRNG: small, fast and the same on every build. */
export function prng(seed: number): () => number {
  let s = Math.floor(Math.abs(seed)) % 2147483647 || 1;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/** Shortest decimal form ("-.5", not "-0.50"), to keep the path data small. */
const n = (v: number, digits = 1) => {
  const f = 10 ** digits;
  return String(Math.round(v * f) / f || 0).replace(/^(-?)0\./, "$1.");
};

// ---------- stars ----------

export type StarColor = "star" | "starHi";

/** Whether a star may be drawn at (x, y); `rand` is the field's PRNG, for probabilistic keep-outs. */
export type KeepOut = (x: number, y: number, big: boolean, rand: () => number) => boolean;

/** Keep-outs that keep stars off the text, one per sky. */
export const keepOuts = {
  /** Home hero: plus-shaped sparkles only right of the headline (x > 640 of 1200). */
  "sparkles-right": (x, _y, big) => !big || x > 640,
  /** Contact band: right of the copy, plus a quarter of the stars elsewhere. */
  "mostly-right": (x, _y, _big, rand) => x > 640 || rand() > 0.75,
  /** Case-study header: right of the title, plus a few faint stars elsewhere. */
  "title-right": (x, _y, big, rand) => x > 700 || (!big && rand() > 0.8),
} satisfies Record<string, KeepOut>;

export type KeepOutName = keyof typeof keepOuts;

/** Stars that share a colour, opacity and animation, merged into one path. */
export interface StarLayer {
  color: StarColor;
  opacity: number;
  /** 0 = steady; 1 and 2 = twinkling, in two phases. */
  twinkle: 0 | 1 | 2;
  /** Plus-shaped pixel sparkles, drawn with crisp edges. */
  sparkle: boolean;
  d: string;
}

/** A circle as two arcs, so many stars can share one path. */
const dot = (x: number, y: number, r: number) => {
  const rr = Math.round(r * 10) / 10;
  const a = n(rr);
  const d = n(rr * 2);
  return `M${n(x - rr)} ${n(y)}a${a} ${a} 0 1 0 ${d} 0a${a} ${a} 0 1 0-${d} 0`;
};

const plus = (x: number, y: number, u: number) => {
  const a = n(u, 2);
  const w = n(u * 5, 2);
  return `M${n(x - u * 2.5, 2)} ${n(y - u / 2, 2)}h${w}v${a}h-${w}zM${n(x - u / 2, 2)} ${n(y - u * 2.5, 2)}h${a}v${w}h-${a}z`;
};

/** Opacity bands for steady stars, so a whole field fits in a handful of paths. */
const band = (o: number) => Math.min(0.9, Math.max(0.45, 0.45 + Math.round((o - 0.45) / 0.15) * 0.15));

/**
 * A starfield over a width x height area: mostly faint specks, some medium stars and a few
 * pixel "+" sparkles; about one star in five is tinted, one in seven twinkles.
 */
export function starfield({
  seed,
  count,
  width,
  height,
  keep,
}: {
  seed: number;
  count: number;
  width: number;
  height: number;
  keep?: KeepOut;
}): StarLayer[] {
  const rand = prng(seed);
  const layers = new Map<string, StarLayer>();
  const add = (layer: StarLayer) => {
    const key = `${layer.color}|${layer.opacity}|${layer.twinkle}|${layer.sparkle}`;
    const found = layers.get(key);
    if (found) found.d += layer.d;
    else layers.set(key, layer);
  };

  for (let i = 0; i < count; i++) {
    const x = rand() * width;
    const y = rand() * height;
    const k = rand();
    const big = k > 0.97;
    const mid = k > 0.8;
    if (keep && !keep(x, y, big, rand)) continue;
    const color: StarColor = rand() > 0.8 ? "starHi" : "star";
    const twinkle: StarLayer["twinkle"] = i % 7 ? 0 : (i / 7) % 2 ? 2 : 1;

    if (big) {
      const u = 1.2 + rand() * 0.5;
      add({ color, opacity: 0.95, twinkle, sparkle: true, d: plus(Math.round(x), Math.round(y), u) });
    } else {
      const r = mid ? 1.1 + rand() * 0.5 : 0.5 + rand() * 0.55;
      const opacity = mid ? 0.6 + rand() * 0.35 : 0.4 + rand() * 0.4;
      // Twinkling stars animate their opacity anyway, so they share one base value.
      add({ color, opacity: twinkle ? 0.7 : Number(band(opacity).toFixed(2)), twinkle, sparkle: false, d: dot(x, y, r) });
    }
  }
  return [...layers.values()];
}

// ---------- pines ----------

/** One pine: a two-tier triangle standing on `base`, `h` tall. */
function pine(x: number, base: number, h: number): string {
  const w = h * 0.42;
  const mid = base - h * 0.45;
  const p = (px: number, py: number) => `${n(px)} ${n(py)}`;
  return (
    `M${p(x, base - h)}L${p(x + w / 2, mid)}L${p(x + w * 0.3, mid)}L${p(x + w * 0.62, base)}` +
    `L${p(x - w * 0.62, base)}L${p(x - w * 0.3, mid)}L${p(x - w / 2, mid)}Z`
  );
}

export interface PineRowOptions {
  seed: number;
  /** Trees are placed left to right, from `from` while x < `to`. */
  from: number;
  to: number;
  /** Distance to the next tree: min + rand * spread. */
  gap: [min: number, spread: number];
  /** Ground line: a fixed y, or [y, spread] to raise each tree by up to `spread`. */
  base: number | [y: number, spread: number];
  height: [min: number, spread: number];
  /** No trees with x inside this range (a clearing under the sun or moon). */
  clearing?: [start: number, end: number];
}

/** A row of pines as one path. */
export function pineRow(o: PineRowOptions): string {
  const rand = prng(o.seed);
  let d = "";
  for (let x = o.from; x < o.to; x += o.gap[0] + rand() * o.gap[1]) {
    if (o.clearing && x >= o.clearing[0] && x <= o.clearing[1]) continue;
    const base = typeof o.base === "number" ? o.base : o.base[0] - rand() * o.base[1];
    d += pine(x, base, o.height[0] + rand() * o.height[1]);
  }
  return d;
}

/**
 * The hero landscape in a 1200 x 300 box: three ridges, a mid row of pines and a near row
 * with a clearing under the sun or moon (centred at x 600). Each colour is one path.
 */
export function heroLandscape(seed = 11) {
  const far = "M0 200C160 160 330 185 470 170S800 140 960 168S1130 160 1200 152V300H0Z";
  const midRidge = "M0 252C200 232 420 246 610 238S960 228 1200 244V300H0Z";
  const nearRidge = "M0 284C260 270 520 282 760 276S1060 270 1200 280V300H0Z";
  const midPines = pineRow({ seed, from: 0, to: 1220, gap: [16, 20], base: [196, 16], height: [30, 34] });
  const nearPines = pineRow({
    seed: seed + 1,
    from: -10,
    to: 1220,
    gap: [34, 70],
    base: 280,
    height: [56, 60],
    clearing: [420, 780],
  });
  return { far, mid: midPines + midRidge, near: nearPines + nearRidge };
}

/** The moon's craters (moon centred at 600, 120 with r 44 in the hero box), as one path. */
export const moonCraters = dot(586, 110, 7) + dot(612, 132, 5) + dot(604, 102, 3.5);

/** The contact band's pine silhouette in a 1200 x 130 box, standing on an 8px strip. */
export function bandPines(seed = 7) {
  return pineRow({ seed, from: -10, to: 1220, gap: [18, 34], base: 124, height: [40, 70] }) + "M0 122h1200v8H0Z";
}
