import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { heroLandscape, moonCraters, starfield, type KeepOut, type StarColor } from "@/lib/sky";

/**
 * Shared Open Graph card in the night palette: the starry sky and teal glow of the home hero,
 * the moon with its halo on the right, the hero's pine ridges along the bottom, and the text
 * in the site's three typefaces. Satori reads neither CSS variables nor WOFF2, so the colours
 * are fixed here and the fonts are static TTFs in assets/fonts.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Night tokens from styles/tokens.css.
const c = {
  bg: "#031211",
  glow: "#0a3b37",
  ink: "#e8e4d3",
  muted: "#9db3ad",
  teal: "#00aebb",
  moon: "#e8e4d3",
  crater: "#cfcab4",
  moonGlow: "#4fa39b",
  ridgeFar: "#0a2b28",
  ridgeMid: "#061f1d",
  ridgeNear: "#020b0a",
};
const starFill: Record<StarColor, string> = { star: "#e8e4d3", starHi: "#a9dcd5" };

const { width: W, height: H } = ogSize;
/** The text column: left-aligned, centred vertically in the sky above the pines, clear of the moon's halo. */
const column = { left: 80, width: 700, height: 440 };
/** The hero's moon (centre 600, 120; r 44, halo r 140) moved to the top right and scaled up. */
const moon = { x: 1000, y: 160, scale: 1.2 };
/** The hero's 1200 x 300 landscape box, set on the bottom edge. */
const landTop = H - 300;

// No stars on the moon, and only a few faint ones behind the text.
const keep: KeepOut = (x, y, big, rand) => {
  if (Math.hypot(x - moon.x, y - moon.y) < 44 * moon.scale + 14) return false;
  if (x < column.left + column.width + 30 && y < column.height) return !big && rand() > 0.7;
  return true;
};

const land = heroLandscape();
// Stars reach down to the far ridge (y 140 to 200 in the landscape box), which hides the lowest ones.
const stars = starfield({ seed: 61, count: 320, width: W, height: landTop + 180, keep });

const scene = (
  <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", left: 0, top: 0 }}>
    <defs>
      {/* --hero-bg: an ellipse 70% x 60% of the box at the bottom centre, fading out at 70% */}
      <radialGradient id="glow">
        <stop offset="0" stopColor={c.glow} />
        <stop offset="0.7" stopColor={c.bg} />
      </radialGradient>
      <radialGradient id="halo">
        <stop offset="0" stopColor={c.moonGlow} stopOpacity={0.35} />
        <stop offset="1" stopColor={c.moonGlow} stopOpacity={0} />
      </radialGradient>
    </defs>
    <rect width={W} height={H} fill={c.bg} />
    <ellipse cx={W / 2} cy={H} rx={W * 0.7} ry={H * 0.6} fill="url(#glow)" />
    {stars.map((l) => (
      <path
        key={`${l.color}-${l.opacity}-${l.twinkle}-${l.sparkle}`}
        d={l.d}
        fill={starFill[l.color]}
        fillOpacity={l.opacity}
        shapeRendering={l.sparkle ? "crispEdges" : undefined}
      />
    ))}
    <g transform={`translate(${moon.x} ${moon.y}) scale(${moon.scale}) translate(-600 -120)`}>
      <circle cx="600" cy="120" r="140" fill="url(#halo)" />
      <circle cx="600" cy="120" r="44" fill={c.moon} />
      <path d={moonCraters} fill={c.crater} />
    </g>
    <g transform={`translate(0 ${landTop})`}>
      <path d={land.far} fill={c.ridgeFar} />
      <path d={land.mid} fill={c.ridgeMid} />
      <path d={land.near} fill={c.ridgeNear} />
    </g>
  </svg>
);

/**
 * Pixelify Sans Bold runs about 0.55 to 0.65em per character. Short titles get one big line;
 * longer ones wrap onto two lines, at a size where their longest word still fits.
 */
function titleSize(title: string) {
  const oneLine = Math.floor(column.width / (0.62 * title.length));
  if (oneLine >= 80) return Math.min(oneLine, 112);
  const longest = Math.max(...title.split(/\s+/).map((word) => word.length));
  return Math.min(title.length > 30 ? 64 : 84, Math.floor(column.width / (0.65 * longest)));
}

const fontDir = path.join(process.cwd(), "assets", "fonts");
let fonts: Promise<Buffer[]> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all(
    ["PixelifySans-Bold.ttf", "Silkscreen-Regular.ttf", "InstrumentSans-Regular.ttf"].map((file) =>
      readFile(path.join(fontDir, file)),
    ),
  ));

export async function renderOgImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle?: string | null }) {
  const [pixelify, silkscreen, instrument] = await loadFonts();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: c.bg }}>
        {scene}
        <div
          style={{
            position: "absolute",
            left: column.left,
            top: 0,
            width: column.width,
            height: column.height,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "Silkscreen",
              fontSize: 24,
              lineHeight: 1.25,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: c.teal,
            }}
          >
            {kicker}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontFamily: "Pixelify Sans",
              fontWeight: 700,
              fontSize: titleSize(title),
              lineHeight: 1,
              color: c.ink,
              textWrap: "balance",
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                display: "block",
                marginTop: 26,
                fontFamily: "Instrument Sans",
                fontSize: 32,
                lineHeight: 1.35,
                color: c.muted,
                lineClamp: 2,
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Pixelify Sans", data: pixelify, weight: 700, style: "normal" },
        { name: "Silkscreen", data: silkscreen, weight: 400, style: "normal" },
        { name: "Instrument Sans", data: instrument, weight: 400, style: "normal" },
      ],
    },
  );
}
