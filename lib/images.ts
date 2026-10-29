/** 16:9 screenshots ship as <name>-{640,960,1280,1920}.webp (see scripts/optimize-shots.mjs). */
const widths = [640, 960, 1280, 1920];

/**
 * srcset for a 16:9 screenshot, given its -960 or -1920 file (undefined for any other file).
 * `max` caps the list: cards and the home hero stop at 960, so the home page never loads the
 * full-size renditions.
 */
export function srcSetFor(src: string, max = 1920): string | undefined {
  const base = src.match(/^(.*)-(?:960|1920)\.webp$/)?.[1];
  if (!base) return undefined;
  return widths
    .filter((w) => w <= max)
    .map((w) => `${base}-${w}.webp ${w}w`)
    .join(", ");
}

/**
 * srcset for a card-sized image: the 16:9 renditions up to 960, or, for a native shot (kept at
 * its own size, e.g. duelsync), its 640px card copy (`cardSrc`) with the original beside it.
 */
export function cardSrcSetFor(src: string, image: { src: string; cardSrc?: string; width: number }) {
  const native = src === image.cardSrc && src !== image.src;
  return srcSetFor(src, 960) ?? (native ? `${src} 640w, ${image.src} ${image.width}w` : undefined);
}
