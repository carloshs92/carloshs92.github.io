import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Blog",
  description: "Posts on frontend, Next.js, React and applied AI (written in Spanish).",
  alternates: languageAlternates("blog", "en"),
};

export default function EnBlogPage() {
  return <BlogIndex locale="en" />;
}
