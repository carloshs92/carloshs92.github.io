import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readPostFile(slug: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, `${slug}.md`), "utf8");
  const { data, content } = matter(raw);
  const words = content.trim().split(/\s+/).length;
  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    date: data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? ""),
    description: data.description ?? "",
    tags: data.tags ?? [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
  return { meta, content, draft: Boolean(data.draft) };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f.replace(/\.md$/, "")))
    .filter((p) => !p.draft)
    .map((p) => p.meta)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post> {
  const { meta, content } = readPostFile(slug);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: { dark: "github-dark-dimmed", light: "github-light" },
      keepBackground: false,
    })
    .use(rehypeStringify)
    .process(content);
  return { ...meta, html: String(file) };
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}
