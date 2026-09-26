"use client";

import { useState } from "react";

/** Chips de filtro estilo flags de CLI: `--tag=ia` */
export default function FilterList<T>({
  items,
  getTags,
  render,
  flag = "tag",
  className = "",
}: {
  items: T[];
  getTags: (item: T) => string[];
  render: (item: T) => React.ReactNode;
  flag?: string;
  className?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const tags = Array.from(new Set(items.flatMap(getTags))).sort();
  const visible = active ? items.filter((i) => getTags(i).includes(active)) : items;

  return (
    <>
      <div className="flex flex-wrap gap-2 text-xs" data-piece>
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`rounded border px-2.5 py-1 ${active === null ? "border-accent bg-accent text-bg" : "border-line text-muted hover:text-accent"}`}
        >
          --all
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t === active ? null : t)}
            className={`rounded border px-2.5 py-1 ${t === active ? "border-accent bg-accent text-bg" : "border-line text-muted hover:text-accent"}`}
          >
            --{flag}={t}
          </button>
        ))}
      </div>
      <p className="text-xs text-dim">
        {visible.length} resultado{visible.length === 1 ? "" : "s"}
      </p>
      <div className={className}>{visible.map(render)}</div>
    </>
  );
}
