// Datos estructurados (JSON-LD) para Google y agentes de IA. Todo sale de data/profile.ts,
// así que basta con actualizar el CV para que el schema quede al día.

import { profile, featuredSkills, skillGroups } from "@/data/profile";
import { currentJob } from "@/lib/profile";
import { SITE, tr, type Locale } from "@/lib/i18n";
import type { PostMeta } from "@/lib/posts";

/** Imagen al compartir (app/og.png). Next no hereda openGraph entre layouts, así que cada openGraph la repite. */
export const OG_IMAGE = { url: "/og.png", width: 1200, height: 630, alt: profile.name };

/** Un solo Person para todo el sitio; las demás páginas lo referencian por @id. */
export const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

export function personSchema(locale: Locale = "es") {
  const job = currentJob();
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: `${SITE}/`,
    jobTitle: job.role,
    worksFor: { "@type": "Organization", name: job.company },
    description: tr(profile.summary[0], locale),
    address: { "@type": "PostalAddress", addressLocality: "Lima", addressCountry: "PE" },
    knowsAbout: [...featuredSkills, ...skillGroups.flatMap((g) => g.skills)].map((s) => tr(s.name, locale)),
    sameAs: Object.values(profile.links),
  };
}

export function siteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": WEBSITE_ID, url: `${SITE}/`, name: profile.name, inLanguage: ["es", "en"], publisher: { "@id": PERSON_ID } },
      personSchema("es"),
    ],
  };
}

export function profilePageSchema(path: string, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: `${SITE}${path}`,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: personSchema(locale),
  };
}

export function postSchema(post: PostMeta) {
  const url = `${SITE}/blog/${post.slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#post`,
        mainEntityOfPage: url,
        url,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        inLanguage: "es",
        keywords: post.tags,
        author: { "@id": PERSON_ID, name: profile.name, url: `${SITE}/` },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}
