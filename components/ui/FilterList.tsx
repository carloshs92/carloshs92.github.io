"use client";

import { useState } from "react";
import Say from "@/components/ui/Say";
import { useLocale } from "@/lib/useLocale";

/** Chips de filtro estilo flags de CLI: `--tag=ia` */
export default function FilterList<T>({
  items,
  getTags,
  render,
  flag = "tag",
  labelFor = (tag) => tag,
  className = "",
}: {
  items: T[];
  getTags: (item: T) => string[];
  render: (item: T) => React.ReactNode;
  flag?: string;
  /** Etiqueta legible para el modo humano */
  labelFor?: (tag: string) => string;
  className?: string;
}) {
  const en = useLocale() === "en";
  const [active, setActive] = useState<string | null>(null);
  const tags = Array.from(new Set(items.flatMap(getTags))).sort();
  const visible = active ? items.filter((i) => getTags(i).includes(active)) : items;

  return (
    <>
      <div className="flex flex-wrap gap-2 text-xs" data-piece>
        <button
          type="button"
          onClick={() => setActive(null)}
          className={`rounded border px-2.5 py-1 human:rounded-full human:px-3 ${active === null ? "border-accent bg-accent text-bg" : "border-line text-muted hover:text-accent"}`}
        >
          <Say terminal="--all" human={en ? "All" : "Todos"} />
        </button>
        {tags.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setActive(t === active ? null : t)}
            className={`rounded border px-2.5 py-1 human:rounded-full human:px-3 ${t === active ? "border-accent bg-accent text-bg" : "border-line text-muted hover:text-accent"}`}
          >
            <Say terminal={`--${flag}=${t}`} human={labelFor(t)} />
          </button>
        ))}
      </div>
      <p className="text-xs text-dim">
        {visible.length} {en ? "result" : "resultado"}
        {visible.length === 1 ? "" : "s"}
      </p>
      <div className={className}>{visible.map(render)}</div>
    </>
  );
}
