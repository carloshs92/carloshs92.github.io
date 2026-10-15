"use client";

import Link from "next/link";
import FilterList from "@/components/ui/FilterList";
import type { PostMeta } from "@/lib/posts";
import { useLocale } from "@/lib/useLocale";

type Item = PostMeta & { dateLabel: string };

export default function BlogList({ posts }: { posts: Item[] }) {
  const en = useLocale() === "en";
  if (posts.length === 0) return <p className="text-muted">{en ? "blog/ is empty. Posts coming soon." : "blog/ está vacío. Pronto habrá posts."}</p>;
  return (
    <FilterList
      items={posts}
      getTags={(p) => p.tags}
      className="divide-y divide-line border-y border-line"
      render={(p) => (
        <Link key={p.slug} href={`/blog/${p.slug}/`} hrefLang="es" className="group block py-5 hover:bg-bg-soft sm:px-3" data-piece>
          <div className="flex flex-wrap gap-x-3 text-xs text-muted">
            <span className="text-dim human:hidden">-rw-r--r--</span>
            <span>{p.dateLabel}</span>
            <span>{p.readingMinutes} {en ? "min read" : "min de lectura"}</span>
            {en && <span className="text-accent-3">ES</span>}
          </div>
          <h2 className="mt-1 text-lg font-bold text-fg group-hover:text-accent">{p.title}</h2>
          <p className="mt-1 text-sm text-muted">{p.description}</p>
          <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-accent-3">
            {p.tags.map((t) => (
              <span key={t}>#{t}</span>
            ))}
          </div>
        </Link>
      )}
    />
  );
}
