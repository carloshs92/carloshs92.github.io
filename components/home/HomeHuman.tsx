import Link from "next/link";
import { buttonClass } from "@/components/ds";
import { featuredSkills, profile } from "@/data/profile";
import { primaryLink, projects } from "@/data/projects";
import { href, tr, type Locale } from "@/lib/i18n";
import { formatDate, getAllPosts } from "@/lib/posts";
import { companyCount, currentJob, yearsOfExperience } from "@/lib/profile";

const card = "rounded-xl border border-line bg-panel p-5 shadow-sm transition-colors hover:border-accent";

const COPY = {
  es: {
    intro: (role: string, company: string, years: number, companies: number, stack: string) =>
      `Actualmente ${role} en ${company}, con más de ${years} años construyendo productos web en ${companies} empresas. Hoy me enfoco en ${stack} e IA aplicada.`,
    profile: "Ver perfil profesional",
    projects: "Proyectos",
    work: "Trabajemos juntos",
    latest: "Últimos artículos",
    postsNote: "",
    featured: "Proyectos destacados",
    all: "Ver todos",
  },
  en: {
    intro: (role: string, company: string, years: number, companies: number, stack: string) =>
      `Currently ${role} at ${company}, with over ${years} years building web products across ${companies} companies. Today I focus on ${stack} and applied AI.`,
    profile: "View professional profile",
    projects: "Projects",
    work: "Work with me",
    latest: "Latest articles",
    postsNote: "Articles are written in Spanish.",
    featured: "Featured projects",
    all: "See all",
  },
};

/** Inicio en modo humano: presentación directa, sin jerga de terminal. */
export default function HomeHuman({ locale = "es" }: { locale?: Locale }) {
  const t = COPY[locale];
  const job = currentJob();
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <p className="text-sm font-medium text-accent">{tr(profile.role, locale)}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{profile.name}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          {t.intro(job.role, job.company, yearsOfExperience(), companyCount(), featuredSkills.map((s) => tr(s.name, locale)).join(", "))}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={href("profile", locale)} className={buttonClass({ variant: "primary", size: "md" })}>
            {t.profile}
          </Link>
          <Link href={href("projects", locale)} className={buttonClass({ size: "md" })}>
            {t.projects}
          </Link>
          <Link href={href("blog", locale)} className={buttonClass({ size: "md" })}>
            Blog
          </Link>
          <Link href={href("work", locale)} className={buttonClass({ size: "md" })}>
            {t.work}
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-lg font-semibold text-fg">{t.latest}</h2>
          {t.postsNote && <p className="text-xs text-muted">{t.postsNote}</p>}
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className={card} hrefLang="es">
              <p className="text-xs text-muted">
                {formatDate(p.date, locale)} · {p.readingMinutes} min
              </p>
              <p className="mt-2 font-medium text-fg">{p.title}</p>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-fg">{t.featured}</h2>
          <Link href={href("projects", locale)} className="text-sm text-accent-3 hover:underline">
            {t.all}
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <a key={p.slug} href={primaryLink(p)} target="_blank" rel="noreferrer" className={card}>
              <p className="text-xs text-muted">{p.year}</p>
              <p className="mt-2 font-medium text-fg">{tr(p.name, locale)}</p>
              <p className="mt-1 line-clamp-3 text-sm text-muted">{tr(p.description, locale)}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
