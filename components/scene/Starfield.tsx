import { keepOuts, starfield, type KeepOutName, type StarColor } from "@/lib/sky";

const fills: Record<StarColor, string> = { star: "var(--star)", starHi: "var(--star-hi)" };

interface StarfieldOptions {
  seed: number;
  count: number;
  /** Area the stars are scattered over, in viewBox units. */
  width: number;
  height: number;
  /** viewBox height when it is taller than the starry area (the hero keeps its bottom clear). */
  viewHeight?: number;
  preserveAspectRatio?: string;
  keepOut?: KeepOutName;
}

/** The three skies: home hero (and 404), contact band, case-study header. */
const presets = {
  hero: { seed: 11, count: 340, width: 1200, height: 600, viewHeight: 700, keepOut: "sparkles-right" },
  band: { seed: 29, count: 200, width: 1200, height: 380, viewHeight: 500, keepOut: "mostly-right" },
  header: { seed: 47, count: 140, width: 1200, height: 420, keepOut: "title-right" },
} satisfies Record<string, StarfieldOptions>;

/**
 * A night-only starfield, generated at build time and drawn in a handful of paths.
 * Fills its positioned parent (.starfield); pass a preset, then override any option.
 */
export function Starfield({
  preset,
  className,
  ...overrides
}: Partial<StarfieldOptions> & { preset?: keyof typeof presets; className?: string }) {
  const o: StarfieldOptions = { seed: 1, count: 150, width: 1200, height: 600, ...(preset && presets[preset]), ...overrides };
  const layers = starfield({ ...o, keep: o.keepOut && keepOuts[o.keepOut] });
  const draw = (twinkle: number) =>
    layers
      .filter((l) => l.twinkle === twinkle)
      .map((l) => (
        <path
          key={`${l.color}-${l.opacity}-${l.sparkle}`}
          d={l.d}
          style={{ fill: fills[l.color] }}
          fillOpacity={l.opacity}
          shapeRendering={l.sparkle ? "crispEdges" : undefined}
        />
      ));

  return (
    <svg
      className={["starfield night-only", className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${o.width} ${o.viewHeight ?? o.height}`}
      preserveAspectRatio={o.preserveAspectRatio ?? "xMidYMid slice"}
      aria-hidden="true"
    >
      {draw(0)}
      <g className="twinkle">{draw(1)}</g>
      <g className="twinkle twinkle-late">{draw(2)}</g>
    </svg>
  );
}
