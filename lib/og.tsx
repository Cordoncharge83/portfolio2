import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { buildScene } from "@/lib/scene";

/** Shared Open Graph card: a dusk sky, the title in Fraunces, and the village band below. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const fontDir = path.join(process.cwd(), "assets", "fonts");
const scene = buildScene(7);

// Fixed dusk palette (satori cannot read CSS variables).
const c = {
  skyTop: "#1d2638",
  skyMid: "#4a3647",
  skyLow: "#c7764a",
  hillFar: "#2e3b3a",
  hillMid: "#22302a",
  hillNear: "#151e19",
  wall: "#2a2520",
  roof: "#c7673f",
  window: "#ffc46b",
  ink: "#f1e6d2",
  amber: "#f0b25a",
};

export async function renderOgImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string | null }) {
  const [fraunces, alegreya, alegreyaSC] = await Promise.all([
    readFile(path.join(fontDir, "Fraunces-144pt-Regular.ttf")),
    readFile(path.join(fontDir, "AlegreyaSans-Regular.ttf")),
    readFile(path.join(fontDir, "AlegreyaSansSC-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundImage: `linear-gradient(180deg, ${c.skyTop} 0%, ${c.skyMid} 55%, ${c.skyLow} 100%)`,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "64px 72px 0", gap: 18 }}>
          <div style={{ display: "flex", fontFamily: "Alegreya Sans SC", fontSize: 30, letterSpacing: 2, color: c.amber }}>
            {kicker}
          </div>
          <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: title.length > 28 ? 72 : 88, lineHeight: 1.04, color: c.ink, maxWidth: 1000 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ display: "flex", fontFamily: "Alegreya Sans", fontSize: 34, color: c.ink, opacity: 0.85, maxWidth: 980 }}>
              {subtitle}
            </div>
          )}
        </div>
        <svg width="1200" height="300" viewBox="0 0 1200 300" style={{ position: "absolute", left: 0, bottom: 0 }}>
          {scene.stars.map((s, i) => (
            <circle key={`s${i}`} cx={s.cx} cy={s.cy} r={s.r} fill="#fff3d6" opacity={0.5} />
          ))}
          <path d="M0 210 C 180 170, 330 190, 480 175 S 820 150, 980 180 S 1140 170, 1200 165 V300 H0Z" fill={c.hillFar} />
          {scene.farTrees.map((d, i) => (
            <path key={`f${i}`} d={d} fill={c.hillMid} />
          ))}
          <path d="M0 240 C 160 215, 300 230, 460 220 S 760 205, 900 225 S 1100 215, 1200 220 V300 H0Z" fill={c.hillMid} />
          {scene.cottages.map((h, i) => (
            <g key={`c${i}`}>
              <ellipse cx={h.glow.cx} cy={h.glow.cy} rx={h.glow.rx} ry={h.glow.ry} fill={c.window} opacity={0.12} />
              <rect x={h.wall.x} y={h.wall.y} width={h.wall.width} height={h.wall.height} fill={c.wall} />
              <path d={h.roof} fill={c.roof} />
              {h.windows.map((w, j) => (
                <rect key={j} x={w.x} y={w.y} width={w.width} height={w.height} fill={c.window} />
              ))}
            </g>
          ))}
          <path d="M0 272 C 200 255, 420 268, 600 262 S 950 252, 1200 266 V300 H0Z" fill={c.hillNear} />
          {scene.nearTrees.map((d, i) => (
            <path key={`n${i}`} d={d} fill={c.hillNear} />
          ))}
        </svg>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 400, style: "normal" },
        { name: "Alegreya Sans", data: alegreya, weight: 400, style: "normal" },
        { name: "Alegreya Sans SC", data: alegreyaSC, weight: 500, style: "normal" },
      ],
    },
  );
}
