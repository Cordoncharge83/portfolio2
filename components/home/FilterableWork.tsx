"use client";

import { useState } from "react";

export interface WorkItem {
  slug: string;
  category: string;
  node: React.ReactNode;
}

type Filter = "all" | "software" | "game";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software", label: "Software" },
  { id: "game", label: "Games" },
];

/** The only interactive part of the work section: hides cards by category. */
export function FilterableWork({ featured, compact }: { featured: WorkItem[]; compact: WorkItem[] }) {
  const [active, setActive] = useState<Filter>("all");
  const shows = (item: WorkItem) => active === "all" || item.category === active;
  const count = featured.filter(shows).length + compact.filter(shows).length;
  const compactVisible = compact.some(shows);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filter"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
        <p className="sr-only" aria-live="polite">
          Showing {count} projects
        </p>
      </div>
      <ul className="cards">
        {featured.map((item) => (
          <li key={item.slug} hidden={!shows(item)}>
            {item.node}
          </li>
        ))}
      </ul>
      {compact.length > 0 && (
        <div className="more-work" hidden={!compactVisible}>
          <h3 className="label">Earlier games from my studies</h3>
          <ul className="compact-cards">
            {compact.map((item) => (
              <li key={item.slug} hidden={!shows(item)}>
                {item.node}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
