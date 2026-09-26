"use client";

import FilterList from "./FilterList";
import type { Project } from "@/data/projects";

const STATUS: Record<Project["status"], { label: string; dot: string }> = {
  live: { label: "online", dot: "bg-accent animate-pulse" },
  demo: { label: "demo", dot: "bg-accent-3" },
  archivo: { label: "archivo", dot: "bg-dim" },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <FilterList
      items={projects}
      flag="cat"
      getTags={(p) => [p.category]}
      className="grid gap-4 md:grid-cols-2"
      render={(p) => (
        <article key={p.slug} className="term-window flex flex-col" data-piece>
          <div className="term-bar">
            <i className={`dot ${STATUS[p.status].dot}`} />
            <span className="truncate">~/proyectos/{p.slug}</span>
            <span className="ml-auto shrink-0">
              {STATUS[p.status].label} · {p.year}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h2 className="text-lg font-bold text-fg">{p.name}</h2>
            <p className="flex-1 text-sm text-muted">{p.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span key={s} className="rounded bg-bg-soft px-2 py-0.5 text-[11px] text-accent">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 border-t border-line pt-3 text-sm">
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline">
                  ▶ demo
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="text-accent-3 hover:underline">
                  git clone ↗
                </a>
              )}
              {p.article && (
                <a href={p.article} target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">
                  artículo ↗
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    />
  );
}
