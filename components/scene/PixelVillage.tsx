import { pixelVillage, villageSize, type PixelColor } from "@/lib/sky";

const paths = pixelVillage();
const fills: Record<PixelColor, string> = {
  sky: "var(--pixel-sky)",
  sun: "var(--pixel-sun)",
  tree: "var(--pixel-tree)",
  window: "var(--pixel-window)",
};

/** The 48 x 27 pixel-art village; full width of its parent by default (.pixel-village). */
export function PixelVillage({
  label = "Pixel-art village by a pine wood, its windows lit",
  className,
}: {
  label?: string;
  className?: string;
}) {
  return (
    <svg
      className={["pixel-village", className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${villageSize.width} ${villageSize.height}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={label}
    >
      {(Object.keys(fills) as PixelColor[]).map((c) => (
        <path key={c} d={paths[c]} style={{ fill: fills[c] }} />
      ))}
    </svg>
  );
}
