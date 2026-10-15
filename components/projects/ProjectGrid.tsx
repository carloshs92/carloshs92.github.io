"use client";

import FilterList from "@/components/ui/FilterList";
import { categoryLabels, type Project, type ProjectCategory } from "@/data/projects";
import Say from "@/components/ui/Say";
import { Tag } from "@/components/ds";
import { tr } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

const STATUS: Record<Project["status"], { label: { es: string; en: string }; dot: string }> = {
  live: { label: { es: "online", en: "online" }, dot: "bg-accent animate-pulse" },
  demo: { label: { es: "demo", en: "demo" }, dot: "bg-accent-3" },
  archivo: { label: { es: "archivo", en: "archived" }, dot: "bg-dim" },
};

const COPY = {
  es: { dir: "~/proyectos", site: "Ir al sitio ↗", demo: "Ver demo", repo: "Repositorio ↗", article: "artículo ↗", articleHuman: "Artículo ↗" },
  en: { dir: "~/projects", site: "Visit site ↗", demo: "View demo", repo: "Repository ↗", article: "article ↗", articleHuman: "Article ↗" },
};

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const locale = useLocale();
  const t = COPY[locale];
  return (
    <FilterList
      items={projects}
      flag="cat"
      getTags={(p) => [p.category]}
      labelFor={(c) => tr(categoryLabels[c as ProjectCategory], locale)}
      className="grid gap-4 md:grid-cols-2"
      render={(p) => (
        <article key={p.slug} className="term-window flex flex-col" data-piece>
          <div className="term-bar">
            <i className={`dot ${STATUS[p.status].dot}`} />
            <span className="truncate">
              <Say terminal={`${t.dir}/${p.slug}`} human={p.stack[0]} />
            </span>
            <span className="ml-auto shrink-0">
              {STATUS[p.status].label[locale]} · {p.year}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-5">
            <h2 className="text-lg font-bold text-fg">{tr(p.name, locale)}</h2>
            <p className="flex-1 text-sm text-muted">{tr(p.description, locale)}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 border-t border-line pt-3 text-sm">
              {p.landing && (
                <a href={p.landing} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline">
                  <Say terminal="▶ open landing" human={t.site} />
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="font-bold text-accent hover:underline">
                  <Say terminal="▶ demo" human={t.demo} />
                </a>
              )}
              {p.repo && (
                <a href={p.repo} target="_blank" rel="noreferrer" className="text-accent-3 hover:underline">
                  <Say terminal="git clone ↗" human={t.repo} />
                </a>
              )}
              {p.article && (
                <a href={p.article} target="_blank" rel="noreferrer" className="text-accent-2 hover:underline">
                  <Say terminal={t.article} human={t.articleHuman} />
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    />
  );
}
