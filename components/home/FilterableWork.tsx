"use client";

import { useState } from "react";

export type WorkCategory = "software" | "game";

export interface WorkItem {
  slug: string;
  category: WorkCategory;
  node: React.ReactNode;
}

type Filter = "all" | WorkCategory;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software", label: "Software" },
  { id: "game", label: "Games" },
];

/** The only interactive part of the work section: hides cards and smaller projects by category. */
export function FilterableWork({ featured, compact }: { featured: WorkItem[]; compact: WorkItem[] }) {
  const [active, setActive] = useState<Filter>("all");
  const shows = (item: WorkItem) => active === "all" || item.category === active;
  const count = featured.filter(shows).length + compact.filter(shows).length;

  return (
    <>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            className="filter notch px"
            aria-pressed={active === f.id}
            onClick={() => setActive(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {`Showing ${count} ${count === 1 ? "project" : "projects"}`}
      </p>
      <ul className="cards">
        {featured.map((item) => (
          <li key={item.slug} data-category={item.category} hidden={!shows(item)}>
            {item.node}
          </li>
        ))}
      </ul>
      {compact.length > 0 && (
        <div className="minor" hidden={!compact.some(shows)}>
          <h3 className="px minor-head">Smaller and earlier projects</h3>
          <ul className="minor-list">
            {compact.map((item) => (
              <li key={item.slug} data-category={item.category} hidden={!shows(item)}>
                {item.node}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
