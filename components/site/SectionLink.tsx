"use client";

import Link from "next/link";

/**
 * A link to a home-page section ("/#work"). Next scrolls to the section but leaves focus on the
 * link, so the next Tab would jump back to the top of the page; this moves focus to the section
 * (it has tabIndex={-1}) once the home page shows it. A client navigation, not a plain fragment
 * link, so Back keeps working; not prefetched, so other pages don't load the home screenshots.
 */
export function SectionLink({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <Link
      href={`/#${id}`}
      prefetch={false}
      onClick={(e) => {
        // A new tab or window: nothing to focus here.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        let tries = 0;
        const focus = () => {
          const section = document.getElementById(id);
          if (section && location.pathname === "/" && location.hash === `#${id}`) section.focus({ preventScroll: true });
          else if (++tries < 120) requestAnimationFrame(focus);
        };
        requestAnimationFrame(focus);
      }}
    >
      {children}
    </Link>
  );
}
