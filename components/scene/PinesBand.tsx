import { bandPines } from "@/lib/sky";

const pines = bandPines();

/** The contact band's pine silhouette, along the bottom of a positioned parent. */
export function PinesBand() {
  return (
    <svg className="pines-band" viewBox="0 0 1200 130" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <path d={pines} style={{ fill: "var(--band-pines)" }} />
    </svg>
  );
}
