"use client";

const systemIsDark = () => window.matchMedia("(prefers-color-scheme: dark)").matches;

function toggleTheme() {
  const root = document.documentElement;
  const current = root.dataset.theme ?? (systemIsDark() ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  const matchesSystem = (next === "dark") === systemIsDark();
  try {
    if (matchesSystem) localStorage.removeItem("theme");
    else localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked; the choice still applies for this page view.
  }
  if (matchesSystem) delete root.dataset.theme;
  else root.dataset.theme = next;
  (window as Window & { __syncThemeColor?: () => void }).__syncThemeColor?.();
}

export function ThemeToggle() {
  // The visible label is picked by CSS (`dark:`), so server and client markup match.
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      <svg viewBox="0 0 16 16" aria-hidden="true">
        <path d="M8 1.5a6.5 6.5 0 1 0 6.5 6.5A5 5 0 0 1 8 1.5Z" fill="currentColor" />
      </svg>
      <span className="sr-only">Switch to </span>
      <span className="dark:hidden">Dusk</span>
      <span className="hidden dark:inline">Day</span>
      <span className="sr-only"> theme</span>
    </button>
  );
}
