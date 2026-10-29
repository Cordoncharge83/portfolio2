import { heroLandscape, moonCraters } from "@/lib/sky";

const land = heroLandscape();

/**
 * The bottom of the home hero and the 404 page: the sun by day, the moon with a soft halo at
 * night, ridges and two rows of pines, then a pixel dissolve into the page. Place it inside a
 * `position: relative; overflow: hidden` block that pads its bottom for the 300px scene.
 */
export function HeroScene() {
  return (
    <>
      <svg className="hero-scene" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <radialGradient id="hero-moon-glow">
            <stop offset="0" style={{ stopColor: "var(--moon-glow)", stopOpacity: 0.35 }} />
            <stop offset="1" style={{ stopColor: "var(--moon-glow)", stopOpacity: 0 }} />
          </radialGradient>
        </defs>
        <circle className="day-only" cx="600" cy="170" r="92" style={{ fill: "var(--sun)" }} />
        <g className="night-only">
          <circle cx="600" cy="120" r="140" fill="url(#hero-moon-glow)" />
          <circle cx="600" cy="120" r="44" style={{ fill: "var(--moon)" }} />
          <path d={moonCraters} style={{ fill: "var(--crater)" }} />
        </g>
        <path d={land.far} style={{ fill: "var(--ridge-far)" }} />
        <path d={land.mid} style={{ fill: "var(--ridge-mid)" }} />
        <path d={land.near} style={{ fill: "var(--ridge-near)" }} />
      </svg>
      <div className="dissolve" aria-hidden="true" />
    </>
  );
}
