import { getAllPosts } from "@/lib/posts";
import { profile } from "@/data/profile";

export const dynamic = "force-static";

const SITE = "https://carloshs92.github.io";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${SITE}/blog/${p.slug}/</link><guid>${SITE}/blog/${p.slug}/</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(profile.name)} · Blog</title><link>${SITE}/blog/</link><description>Frontend e IA aplicada</description><language>es</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
