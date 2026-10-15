import Link from "next/link";
import { buttonClass } from "@/components/ds";
import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import Typewriter from "@/components/terminal/Typewriter";
import { featuredSkills, profile } from "@/data/profile";
import { primaryLink, projects } from "@/data/projects";
import { href, tr, type Locale } from "@/lib/i18n";
import { formatDate, getAllPosts } from "@/lib/posts";
import { currentJob, yearsOfExperience } from "@/lib/profile";

const LOGO = String.raw`  ______   __    __
 /      \ |  \  |  \
|  $$$$$$\| $$  | $$
| $$   \$$| $$__| $$
| $$      | $$    $$
| $$   __ | $$$$$$$$
| $$__/  \| $$  | $$
 \$$    $$| $$  | $$
  \$$$$$$  \$$   \$$`;

const COPY = {
  es: {
    keys: ["usuario", "rol", "empresa", "uptime", "ubicación", "stack", "kernel", "editor"],
    uptime: (years: number, since: number) => `${years} años en frontend (desde ${since})`,
    kernel: "TypeScript + IA aplicada",
    tagline: "Construyo interfaces rápidas y accesibles, y las conecto con modelos de lenguaje.",
    profileBtn: "./ver-perfil.sh",
    projectsDir: "proyectos",
    workDir: "trabajemos-juntos",
    dirs: ["stats, habilidades y certificaciones", "posts en markdown sobre frontend e IA", "demos, experimentos y aprendizajes", "servicios, mentorías y contacto"],
    postsNote: "",
    allProjects: "→ ver todos los proyectos",
  },
  en: {
    keys: ["user", "role", "company", "uptime", "location", "stack", "kernel", "editor"],
    uptime: (years: number, since: number) => `${years} years in frontend (since ${since})`,
    kernel: "TypeScript + applied AI",
    tagline: "I build fast, accessible interfaces and wire them up to language models.",
    profileBtn: "./view-profile.sh",
    projectsDir: "projects",
    workDir: "work-with-me",
    dirs: ["stats, skills and certifications", "markdown posts on frontend and AI (in Spanish)", "demos, experiments and learning", "services, mentoring and contact"],
    postsNote: "# posts are written in Spanish",
    allProjects: "→ see all projects",
  },
};

/** Inicio en modo terminal: whoami, neofetch y listados estilo shell. */
export default function HomeTerminal({ locale = "es" }: { locale?: Locale }) {
  const t = COPY[locale];
  const years = yearsOfExperience();
  const posts = getAllPosts().slice(0, 3);
  const current = currentJob();

  const values = [
    `${profile.handle}@huamani`,
    current.role,
    current.company,
    t.uptime(years, profile.startYear),
    tr(profile.location, locale),
    featuredSkills.map((s) => tr(s.name, locale)).join(", "),
    t.kernel,
    "Claude Code",
  ];
  const info = t.keys.map((k, i) => [k, values[i]] as const);

  return (
    <div className="space-y-16">
      {/* hero */}
      <section className="space-y-6">
        <p className="text-sm" data-piece>
          <span className="text-accent">carlos@huamani</span>
          <span className="text-muted">:</span>
          <span className="text-accent-3">~</span>
          <span className="text-muted">$ </span>
          <Typewriter text="whoami" delay={300} />
        </p>
        <Scramble
          as="h1"
          text={profile.name}
          delay={800}
          className="glow block text-4xl font-extrabold tracking-tight text-accent sm:text-6xl"
        />
        <p className="max-w-2xl text-base text-fg sm:text-lg">
          <span className="text-muted">// </span>
          {tr(profile.role, locale)}. {t.tagline}
        </p>
        <div className="flex flex-wrap gap-3 text-sm" data-piece>
          <Link href={href("profile", locale)} className={buttonClass({ variant: "primary", size: "md" })}>
            {t.profileBtn}
          </Link>
          <Link href={href("blog", locale)} className={buttonClass({ size: "md" })}>
            cat blog/*
          </Link>
          <Link href={href("projects", locale)} className={buttonClass({ size: "md" })}>
            ls {t.projectsDir}/
          </Link>
        </div>
      </section>

      {/* neofetch */}
      <section className="space-y-4">
        <Prompt cmd="neofetch" />
        <div className="term-window" data-piece>
          <div className="term-bar">
            <i className="dot bg-danger" />
            <i className="dot bg-accent-2" />
            <i className="dot bg-accent" />
            <span className="ml-2">neofetch — zsh</span>
          </div>
          <div className="flex flex-col gap-6 p-5 md:flex-row md:items-center">
            <pre className="glow shrink-0 text-[11px] leading-snug text-accent sm:text-sm" aria-hidden>
              {LOGO}
            </pre>
            <dl className="grid gap-1 text-sm">
              <div className="mb-1 font-bold text-accent">
                {profile.handle}
                <span className="text-muted">@</span>huamani
              </div>
              <div className="mb-2 text-dim">{"-".repeat(24)}</div>
              {info.map(([k, v]) => (
                <div key={k} className="flex gap-2">
                  <dt className="w-24 shrink-0 font-bold text-accent-2">{k}</dt>
                  <dd className="text-fg">{v}</dd>
                </div>
              ))}
              <div className="mt-3 flex gap-1" aria-hidden>
                {["bg-fg", "bg-danger", "bg-accent", "bg-accent-2", "bg-accent-3", "bg-muted", "bg-dim", "bg-line"].map((c) => (
                  <i key={c} className={`h-4 w-6 ${c}`} />
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* directorios */}
      <section className="space-y-4">
        <Prompt cmd="ls -la ~/" />
        <ul className="space-y-1 text-sm">
          {[
            [href("profile", locale), locale === "es" ? "perfil/" : "profile/", t.dirs[0]],
            [href("blog", locale), "blog/", t.dirs[1]],
            [href("projects", locale), `${t.projectsDir}/`, t.dirs[2]],
            [href("work", locale), `${t.workDir}/`, t.dirs[3]],
          ].map(([to, name, desc]) => (
            <li key={to}>
              <Link href={to} className="group flex flex-wrap gap-x-4 rounded px-2 py-1.5 hover:bg-bg-soft">
                <span className="text-dim">drwxr-xr-x</span>
                <span className="w-44 font-bold text-accent-3 group-hover:text-accent">{name}</span>
                <span className="text-muted">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* últimos posts */}
      <section className="space-y-4">
        <Prompt cmd="ls -t blog/ | head -3" />
        {t.postsNote && <p className="text-xs text-dim">{t.postsNote}</p>}
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} hrefLang="es" className="group block rounded border border-line p-4 hover:border-accent">
                <div className="text-xs text-muted">
                  {formatDate(p.date, locale)} · {p.readingMinutes} min
                </div>
                <div className="mt-1 font-bold group-hover:text-accent">{p.title}</div>
                <div className="mt-1 text-sm text-muted">{p.description}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* proyectos destacados */}
      <section className="space-y-4">
        <Prompt cmd={`ls ${t.projectsDir}/ | head -3`} />
        <div className="grid gap-3 sm:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <a
              key={p.slug}
              href={primaryLink(p)}
              target="_blank"
              rel="noreferrer"
              className="group rounded border border-line p-4 hover:border-accent"
              data-piece
            >
              <div className="text-xs text-muted">{p.year}</div>
              <div className="mt-1 font-bold group-hover:text-accent">{tr(p.name, locale)}</div>
              <div className="mt-2 line-clamp-3 text-xs text-muted">{tr(p.description, locale)}</div>
            </a>
          ))}
        </div>
        <Link href={href("projects", locale)} className="inline-block text-sm text-accent-3 hover:text-accent">
          {t.allProjects}
        </Link>
      </section>
    </div>
  );
}
