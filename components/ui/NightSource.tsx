/**
 * The night variant of an eager screenshot, as the first <source> of its <picture>, so the
 * browser downloads only the variant that matches the OS theme. ThemeScript rewrites `media`
 * when the visitor picked a theme with the toggle (`data-night` marks the sources it manages),
 * so React must not flag that attribute on hydration.
 */
export function NightSource({ srcSet, sizes }: { srcSet: string; sizes?: string }) {
  return (
    <source media="(prefers-color-scheme: dark)" srcSet={srcSet} sizes={sizes} data-night="" suppressHydrationWarning />
  );
}
