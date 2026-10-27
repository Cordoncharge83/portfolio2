/** Screenshots ship as <name>-960.webp and <name>-1920.webp (see scripts/optimize-shots.mjs). */
export function srcSetFor(src: string): string | undefined {
  if (!src.endsWith("-1920.webp")) return undefined;
  return `${src.replace(/-1920\.webp$/, "-960.webp")} 960w, ${src} 1920w`;
}
