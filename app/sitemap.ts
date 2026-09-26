import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-static";

const SITE = "https://carloshs92.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/perfil/", "/blog/", "/proyectos/"].map((p) => ({ url: `${SITE}${p || "/"}` }));
  const posts = getAllPosts().map((p) => ({ url: `${SITE}/blog/${p.slug}/`, lastModified: p.date }));
  return [...pages, ...posts];
}
