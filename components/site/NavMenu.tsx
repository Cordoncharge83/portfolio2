"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * The "Menu" disclosure that holds the section links at 860px and below (53.75em), where the bar has no
 * room for them. A <details>, so it opens and closes without JavaScript. With JavaScript, Escape,
 * a click outside, tabbing out of it and following one of its links also close it.
 */
export function NavMenu({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  // Back and Forward also navigate: start each page with the menu closed.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  useEffect(() => {
    const menu = ref.current;
    if (!menu) return;
    const close = (refocus: boolean) => {
      if (!menu.open) return;
      menu.open = false;
      if (refocus) menu.querySelector("summary")?.focus();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menu.open) close(menu.contains(document.activeElement));
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!menu.contains(e.target as Node)) close(false);
    };
    const onFocusOut = (e: FocusEvent) => {
      const to = e.relatedTarget as Node | null;
      if (to && !menu.contains(to)) close(false);
    };
    // A section link moves focus to its section; the CV download stays on this page, so focus returns to the button.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest("a");
      if (link) close(link.hasAttribute("download"));
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    menu.addEventListener("focusout", onFocusOut);
    menu.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      menu.removeEventListener("focusout", onFocusOut);
      menu.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <details ref={ref} className="nav-menu">
      <summary className="nav-menu-btn">
        <svg className="nav-menu-open" viewBox="0 0 16 16" aria-hidden="true">
          <path d="M2 3h12v2H2zM2 7h12v2H2zM2 11h12v2H2z" fill="currentColor" />
        </svg>
        <svg className="nav-menu-close" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M2 2h2v2H2zM4 4h2v2H4zM6 6h4v4H6zM10 4h2v2h-2zM12 2h2v2h-2zM4 10h2v2H4zM2 12h2v2H2zM10 10h2v2h-2zM12 12h2v2h-2z"
            fill="currentColor"
          />
        </svg>
        <span className="nav-menu-label">Menu</span>
      </summary>
      <div className="nav-menu-panel">{children}</div>
    </details>
  );
}
