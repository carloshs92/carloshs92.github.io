// llms.txt: resumen del sitio en Markdown para agentes de IA (propuesta de llmstxt.org).
// Se genera en build desde los mismos datos que las páginas.

import { profile, featuredSkills } from "@/data/profile";
import { projects, primaryLink } from "@/data/projects";
import { services } from "@/data/services";
import { currentJob, yearsOfExperience } from "@/lib/profile";
import { getAllPosts, getPostMarkdown } from "@/lib/posts";
import { ROUTES, SITE, tr } from "@/lib/i18n";

const page = (key: keyof typeof ROUTES) => `${SITE}${ROUTES[key].es}`;

export function llmsTxt() {
  const job = currentJob();
  const posts = getAllPosts();
  return [
    `# ${profile.name}`,
    "",
    `> ${profile.name}: ${tr(profile.role, "es")}. Vive en ${tr(profile.location, "es")} y lleva más de ${yearsOfExperience()} años construyendo productos web; hoy es ${job.role} en ${job.company.replace(/\.$/, "")}. Este es su sitio personal: perfil, blog, proyectos y servicios. El sitio está en español; la versión en inglés vive bajo ${SITE}/en/.`,
    "",
    ...profile.summary.map((s) => tr(s, "es")),
    "",
    `Habilidades principales: ${featuredSkills.map((s) => tr(s.name, "es")).join(", ")}.`,
    "",
    "## Páginas",
    "",
    `- [Perfil](${page("profile")}): indicadores, habilidades y certificaciones. English: ${SITE}${ROUTES.profile.en}`,
    `- [Proyectos](${page("projects")}): demos y proyectos personales de frontend e IA. English: ${SITE}${ROUTES.projects.en}`,
    `- [Trabajemos juntos](${page("work")}): servicios de consultoría y cómo contratarlo. English: ${SITE}${ROUTES.work.en}`,
    `- [Blog](${page("blog")}): posts sobre frontend e IA aplicada. RSS: ${SITE}/feed.xml`,
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${SITE}/blog/${p.slug}/): ${p.description}`),
    "",
    "## Proyectos",
    "",
    ...projects.map((p) => `- [${tr(p.name, "es")}](${primaryLink(p) ?? page("projects")}) (${p.year}): ${tr(p.description, "es")}`),
    "",
    "## Servicios",
    "",
    ...services.map((s) => `- ${tr(s.title, "es")}: ${tr(s.description, "es")}`),
    "",
    "## Perfiles",
    "",
    ...Object.entries(profile.links).map(([name, url]) => `- ${name}: ${url}`),
    "",
    "## Optional",
    "",
    `- [Texto completo del blog](${SITE}/llms-full.txt): todos los posts en Markdown en un solo archivo.`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  const posts = getAllPosts().map((p) =>
    [`# ${p.title}`, "", `URL: ${SITE}/blog/${p.slug}/`, `Fecha: ${p.date}`, `Autor: ${profile.name}`, "", getPostMarkdown(p.slug)].join("\n")
  );
  return [llmsTxt(), "---", "", ...posts.flatMap((p) => [p, "", "---", ""])].join("\n");
}
