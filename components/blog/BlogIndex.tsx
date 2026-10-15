import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import BlogList from "@/components/blog/BlogList";
import type { Locale } from "@/lib/i18n";
import { formatDate, getAllPosts } from "@/lib/posts";

const COPY = {
  es: {
    intro: "Apuntes de un front: frontend, arquitectura y lo que voy aprendiendo sobre IA. Todo escrito en Markdown.",
    note: "",
  },
  en: {
    intro: "Notes from a frontend engineer: frontend, architecture and what I'm learning about AI.",
    note: "For now every post is written in Spanish; your browser can translate them.",
  },
};

export default function BlogIndex({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const posts = getAllPosts().map((p) => ({ ...p, dateLabel: formatDate(p.date, locale) }));
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Prompt cmd="ls -lt blog/" path="~/blog" />
        <Scramble as="h1" text="Blog" className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <p className="max-w-2xl text-muted">{t.intro}</p>
        {t.note && <p className="max-w-2xl text-sm text-accent-2">{t.note}</p>}
      </section>
      <BlogList posts={posts} />
    </div>
  );
}
