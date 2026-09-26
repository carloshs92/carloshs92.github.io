import type { Metadata } from "next";
import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import BlogList from "@/components/blog/BlogList";
import { formatDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts sobre frontend, Next.js, React e IA aplicada.",
};

export default function BlogPage() {
  const posts = getAllPosts().map((p) => ({ ...p, dateLabel: formatDate(p.date) }));
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Prompt cmd="ls -lt blog/" path="~/blog" />
        <Scramble as="h1" text="Blog" className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <p className="max-w-2xl text-muted">Apuntes de un front: frontend, arquitectura y lo que voy aprendiendo sobre IA. Todo escrito en Markdown.</p>
      </section>
      <BlogList posts={posts} />
    </div>
  );
}
