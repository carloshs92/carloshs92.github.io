import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { ROUTES, SITE, type RouteKey } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // cada página traducida aparece en ambos idiomas, enlazadas entre sí con hreflang
  const translated = (Object.keys(ROUTES) as RouteKey[]).flatMap((key) => {
    const languages = { es: `${SITE}${ROUTES[key].es}`, en: `${SITE}${ROUTES[key].en}` };
    return [
      { url: languages.es, alternates: { languages } },
      { url: languages.en, alternates: { languages } },
    ];
  });
  const posts = getAllPosts().map((p) => ({ url: `${SITE}/blog/${p.slug}/`, lastModified: p.date }));
  return [...translated, { url: `${SITE}/design-system/` }, ...posts];
}
