import { buildScene } from "@/lib/scene";

const scene = buildScene(7);

export function DuskVillage({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={compact ? "scene compact" : "scene"}>
      <svg
        viewBox={compact ? "0 100 1200 200" : "0 0 1200 300"}
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label="A woodland village at dusk, its cottage windows lit"
      >
        <defs>
          <linearGradient id="dv-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="sky-top" />
            <stop offset=".55" className="sky-mid" />
            <stop offset="1" className="sky-low" />
          </linearGradient>
          <filter id="dv-blur">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <rect width="1200" height="300" fill="url(#dv-sky)" />
        <g>
          {scene.stars.map((s, i) => (
            <circle key={i} className="star" {...s} />
          ))}
        </g>
        <path
          className="hill-far"
          d="M0 210 C 180 170, 330 190, 480 175 S 820 150, 980 180 S 1140 170, 1200 165 V300 H0Z"
        />
        <g>
          {scene.farTrees.map((d, i) => (
            <path key={i} className="hill-mid" d={d} />
          ))}
        </g>
        <path
          className="hill-mid"
          d="M0 240 C 160 215, 300 230, 460 220 S 760 205, 900 225 S 1100 215, 1200 220 V300 H0Z"
        />
        <g>
          {scene.cottages.map((c, i) => (
            <g key={i}>
              <ellipse className="glow" {...c.glow} filter="url(#dv-blur)" />
              <rect className="wall" {...c.wall} />
              <path className="roof" d={c.roof} />
              {c.windows.map((w, j) => (
                <rect key={j} className="win" rx={1} {...w} />
              ))}
            </g>
          ))}
          <rect className="wall" x={610} y={150} width={7} height={18} />
          <path className="chimney-smoke" d="M613 146 C 606 136, 622 128, 614 118 S 620 102, 612 92" />
        </g>
        <path className="hill-near" d="M0 272 C 200 255, 420 268, 600 262 S 950 252, 1200 266 V300 H0Z" />
        <g>
          {scene.nearTrees.map((d, i) => (
            <path key={i} className="hill-near" d={d} />
          ))}
        </g>
      </svg>
    </figure>
  );
}
