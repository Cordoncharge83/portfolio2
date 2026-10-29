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
  // Icon and accessible name are both picked by CSS, so server and client markup match.
  return (
    <button type="button" className="theme-toggle" onClick={toggleTheme}>
      <svg className="day-only" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" />
      </svg>
      <svg className="night-only" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="5" fill="currentColor" />
        <path
          d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="sr-only">
        Switch to <span className="dark:hidden">night</span>
        <span className="hidden dark:inline">day</span> theme
      </span>
    </button>
  );
}
