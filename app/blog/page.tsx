import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts sobre frontend, Next.js, React e IA aplicada.",
  alternates: languageAlternates("blog", "es"),
};

export default function BlogPage() {
  return <BlogIndex locale="es" />;
}
