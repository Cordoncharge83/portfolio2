import type { ThumbKey } from "@/lib/content";

export type IconKind = ThumbKey | "village";

/* 32 x 32 line icons for the card tiles, one stroked path each; they take the tile's text colour. */
const icons: Record<IconKind, { stroke: number; d: string }> = {
  search: { stroke: 2.6, d: "M5 13a8 8 0 1 0 16 0a8 8 0 1 0-16 0M19 19l8 8" },
  chat: { stroke: 2.4, d: "M5 7h16v11H11l-6 5ZM21 12h6v10l-4-3h-8v-1" },
  bracket: { stroke: 2.4, d: "M4 7h6v6H4zM4 19h6v6H4zM10 10h4v12h-4M14 16h5M19 13h7v6h-7z" },
  ranks: { stroke: 3, d: "M7 26V17M13 26V10M19 26v-8M25 26V6" },
  grid: { stroke: 2.2, d: "M5 5h22v22H5zM5 12.3h22M5 19.6h22M12.3 5v22M19.6 5v22" },
  vr: {
    stroke: 2.4,
    d: "M6 10h20a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-6l-2-3h-4l-2 3H6a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3ZM10 10V7h12v3",
  },
  island: {
    stroke: 2.2,
    d: "M3 26q3-3 6 0t6 0t6 0t6 0M7 21q9-6 18 0M16 18V9M16 9q-4-3-8 0M16 9q4-3 8 0M16 9q-3-1-5 3M16 9q3-1 5 3",
  },
  village: { stroke: 2.4, d: "M5 16 16 7l11 9M8 14v13h16V14M14 27v-7h4v7" },
};

export function ProjectIcon({ kind }: { kind: IconKind }) {
  const { stroke, d } = icons[kind];
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}
