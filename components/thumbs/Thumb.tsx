import type { ThumbKey } from "@/lib/content";

/*
 * Illustrated stand-ins for projects without a screenshot yet. Drawn in the
 * journal palette (token classes), so they follow the day/dusk theme.
 */

const label = { fontSize: 11 } as const;

function Search() {
  const cards = [40, 124, 208];
  return (
    <>
      <rect x="40" y="26" width="240" height="28" rx="6" className="t-surface s-timber" strokeWidth="1.5" />
      <circle cx="57" cy="40" r="6" fill="none" className="s-muted" strokeWidth="2" />
      <rect x="71" y="36" width="84" height="8" rx="4" className="t-muted" opacity=".45" />
      {["Angela", "Chanse"].map((name, i) => (
        <g key={name}>
          <rect x={186 + i * 46} y="32" width="40" height="16" rx="8" className="t-forest" opacity=".85" />
          <text x={206 + i * 46} y="44" textAnchor="middle" className="t-text" style={{ fontSize: 8, fill: "var(--on-forest)" }}>
            {name}
          </text>
        </g>
      ))}
      {cards.map((x, i) => (
        <g key={x}>
          <rect x={x} y="70" width="72" height="88" rx="6" className={i === 1 ? "t-forest" : "t-surface s-rule"} strokeWidth="1.5" />
          {i === 1 ? (
            <>
              <rect x={x + 10} y="82" width="52" height="30" rx="3" className="t-fill" opacity=".9" />
              <path d={`M${x + 31} 89 l12 8 l-12 8 z`} className="t-clay" />
              <text x={x + 36} y="132" textAnchor="middle" className="t-text" style={{ ...label, fill: "var(--on-forest)" }}>
                12:34
              </text>
              <rect x={x + 14} y="141" width="44" height="7" rx="3.5" className="t-amber" />
            </>
          ) : (
            <>
              <rect x={x + 10} y="82" width="48" height="7" rx="3.5" className="t-ink" opacity=".7" />
              <rect x={x + 10} y="95" width="38" height="6" rx="3" className="t-muted" opacity=".45" />
              <rect x={x + 10} y="132" width="22" height="12" rx="6" className="t-clay" opacity=".8" />
              <circle cx={x + 46} cy="138" r="6" className="t-timber" opacity=".6" />
              <circle cx={x + 56} cy="138" r="6" className="t-forest" opacity=".55" />
            </>
          )}
        </g>
      ))}
    </>
  );
}

function Chat() {
  return (
    <>
      <rect x="34" y="28" width="150" height="34" rx="10" className="t-surface s-rule" strokeWidth="1.5" />
      <rect x="46" y="38" width="96" height="6" rx="3" className="t-muted" opacity=".5" />
      <rect x="46" y="49" width="70" height="6" rx="3" className="t-muted" opacity=".35" />
      <rect x="112" y="74" width="150" height="34" rx="10" className="t-forest" />
      <text x="187" y="95" textAnchor="middle" className="t-text" style={{ ...label, fill: "var(--on-forest)" }}>
        Could we meet at 52k?
      </text>
      <rect x="34" y="120" width="120" height="34" rx="10" className="t-surface s-rule" strokeWidth="1.5" />
      <rect x="46" y="130" width="84" height="6" rx="3" className="t-muted" opacity=".5" />
      <rect x="46" y="141" width="56" height="6" rx="3" className="t-muted" opacity=".35" />
      <path d="M216 156 a40 40 0 0 1 80 0" fill="none" className="s-rule" strokeWidth="10" strokeLinecap="round" />
      <path d="M216 156 a40 40 0 0 1 64 -31" fill="none" stroke="var(--amber)" strokeWidth="10" strokeLinecap="round" />
      <text x="256" y="152" textAnchor="middle" className="t-text" style={{ fontSize: 15, fill: "var(--ink)" }}>
        78
      </text>
    </>
  );
}

function Bracket() {
  const ys = [30, 50, 74, 94, 118, 138, 160, 180].map((y) => y - 10);
  return (
    <>
      {ys.map((y, i) => (
        <rect key={y} x="32" y={y - 6} width="56" height="12" rx="3" className={i % 2 ? "t-surface s-rule" : "t-surface s-timber"} strokeWidth="1" />
      ))}
      {[0, 2, 4, 6].map((i) => {
        const a = ys[i];
        const b = ys[i + 1];
        const m = (a + b) / 2;
        return (
          <g key={i}>
            <path d={`M88 ${a} H100 V${b} H88 M100 ${m} H112`} fill="none" className="s-timber" strokeWidth="1.5" />
            <rect x="112" y={m - 6} width="50" height="12" rx="3" className={i === 2 ? "t-forest" : "t-surface s-rule"} strokeWidth="1" />
          </g>
        );
      })}
      <path d="M162 30 H174 V74 H162 M174 52 H186 M162 118 H174 V160 H162 M174 139 H186" fill="none" className="s-timber" strokeWidth="1.5" />
      <rect x="186" y="46" width="46" height="12" rx="3" className="t-forest" />
      <rect x="186" y="133" width="46" height="12" rx="3" className="t-surface s-rule" strokeWidth="1" />
      <path d="M232 52 H242 V139 H232 M242 96 H252" fill="none" className="s-timber" strokeWidth="1.5" />
      <rect x="252" y="88" width="40" height="16" rx="4" className="t-amber" />
      <g transform="translate(250 22)">
        <rect width="44" height="44" rx="4" className="t-surface s-rule" strokeWidth="1" />
        {[
          [5, 5], [27, 5], [5, 27],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x} y={y} width="12" height="12" className="t-ink" />
            <rect x={x + 3} y={y + 3} width="6" height="6" className="t-surface" />
          </g>
        ))}
        {[
          [22, 22], [30, 30], [22, 34], [34, 22], [26, 26],
        ].map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" className="t-ink" />
        ))}
      </g>
    </>
  );
}

function Ranks() {
  const bars = [
    [200, "61%"],
    [168, "57%"],
    [134, "54%"],
    [104, "52%"],
  ] as const;
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x={56 + i * 44} y="22" width="34" height="34" rx="6" className={i === 0 ? "t-clay" : i === 1 ? "t-forest" : "t-surface s-rule"} strokeWidth="1.5" strokeDasharray={i > 1 ? "3 3" : undefined} />
          {i < 2 && (
            <g transform={`translate(${67 + i * 44} 30)`}>
              <rect x="1" y="7" width="10" height="9" rx="2" fill="var(--bg)" />
              <path d="M3 7 V5 a3 3 0 0 1 6 0 V7" fill="none" stroke="var(--bg)" strokeWidth="2" />
            </g>
          )}
        </g>
      ))}
      {bars.map(([w, pct], i) => (
        <g key={pct}>
          <rect x="56" y={74 + i * 24} width={w} height="12" rx="3" className="t-forest" opacity={1 - i * 0.2} />
          <text x={64 + w} y={84 + i * 24} className="t-text" style={label}>
            {pct}
          </text>
        </g>
      ))}
    </>
  );
}

function Grid() {
  const cols = 10;
  const rows = 6;
  const s = 26;
  const ox = (320 - cols * s) / 2;
  const oy = (180 - rows * s) / 2;
  const blocked = new Set(["3,1", "3,2", "6,3", "6,4", "4,4"]);
  const reach = new Set(["1,2", "2,2", "1,3", "2,3", "2,1", "1,1", "2,4", "0,2"]);
  const cells = [];
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const k = `${c},${r}`;
      cells.push(
        <rect
          key={k}
          x={ox + c * s}
          y={oy + r * s}
          width={s - 2}
          height={s - 2}
          rx="3"
          className={`${blocked.has(k) ? "t-timber" : reach.has(k) ? "t-forest" : "t-fill"} s-rule`}
          opacity={reach.has(k) ? 0.35 : 1}
          strokeWidth="1"
        />,
      );
    }
  return (
    <>
      {cells}
      <circle cx={ox + s + 12} cy={oy + 2 * s + 12} r="8" className="t-forest" />
      <circle cx={ox + 8 * s + 12} cy={oy + 3 * s + 12} r="8" className="t-clay" />
      <rect x={ox + 7 * s + 6} y={oy + s + 6} width="12" height="12" rx="6" className="t-amber" />
    </>
  );
}

function Vr() {
  return (
    <>
      <circle cx="252" cy="44" r="18" className="t-amber" />
      <path d="M0 132 C 80 116, 180 124, 320 112 V180 H0Z" className="t-forest" opacity=".25" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${40 + i * 62} ${100 + i * 6}) skewX(-18)`}>
          <rect width="54" height="30" rx="2" className="t-forest" opacity=".85" />
          <path d="M18 0 V30 M36 0 V30 M0 15 H54" className="s-rule" strokeWidth="1.5" />
        </g>
      ))}
      <g transform="translate(206 92)">
        <rect width="86" height="44" rx="14" className="t-surface s-timber" strokeWidth="2" />
        <rect x="10" y="10" width="28" height="24" rx="8" className="t-clay" opacity=".85" />
        <rect x="48" y="10" width="28" height="24" rx="8" className="t-clay" opacity=".85" />
        <path d="M-12 22 H0 M86 22 H98" className="s-timber" strokeWidth="4" strokeLinecap="round" />
      </g>
    </>
  );
}

function Island() {
  return (
    <>
      <path d="M0 120 C 40 112, 80 116, 110 112 L118 180 H0Z" className="t-forest" opacity=".75" />
      <path d="M320 116 C 280 110, 240 114, 206 110 L198 180 H320Z" className="t-forest" opacity=".75" />
      {[132, 148, 164].map((y) => (
        <path key={y} d={`M118 ${y} q 10 -5 20 0 t 20 0 t 20 0 t 20 0`} fill="none" className="s-forest" strokeWidth="2" opacity=".5" />
      ))}
      {[110, 124, 138, 178, 192].map((x) => (
        <rect key={x} x={x} y="106" width="12" height="8" rx="1.5" className="t-timber" />
      ))}
      <path d="M110 104 H206" className="s-timber" strokeWidth="2" />
      <rect x="150" y="104" width="26" height="12" fill="none" className="s-clay" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="78" cy="86" r="7" className="t-clay" />
      <rect x="72" y="93" width="12" height="18" rx="4" className="t-clay" />
      <path d="M92 86 l14 -10 M100 72 l10 8" className="s-timber" strokeWidth="3" strokeLinecap="round" />
      <path d="M262 74 l8 -22 l8 22 z" className="t-forest" />
      <path d="M248 82 l10 -28 l10 28 z" className="t-forest" opacity=".8" />
    </>
  );
}

const thumbs: Record<ThumbKey, () => React.JSX.Element> = {
  search: Search,
  chat: Chat,
  bracket: Bracket,
  ranks: Ranks,
  grid: Grid,
  vr: Vr,
  island: Island,
};

export function Thumb({
  kind,
  square = false,
  fit = "slice",
}: {
  kind: ThumbKey;
  square?: boolean;
  fit?: "slice" | "meet";
}) {
  const Art = thumbs[kind];
  return (
    <svg
      viewBox={square ? "70 0 180 180" : "0 0 320 180"}
      preserveAspectRatio={`xMidYMid ${fit}`}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0" y="0" width="320" height="180" className="t-fill" />
      <Art />
    </svg>
  );
}
