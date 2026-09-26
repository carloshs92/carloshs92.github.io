import Link from "next/link";
import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import Typewriter from "@/components/terminal/Typewriter";
import { featuredSkills, profile } from "@/data/profile";
import { projects } from "@/data/projects";
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

/** Inicio en modo terminal: whoami, neofetch y listados estilo shell. */
export default function HomeTerminal() {
  const years = yearsOfExperience();
  const posts = getAllPosts().slice(0, 3);
  const current = currentJob();

  const info: [string, string][] = [
    ["usuario", `${profile.handle}@huamani`],
    ["rol", current.role],
    ["empresa", current.company],
    ["uptime", `${years} años en frontend (desde ${profile.startYear})`],
    ["ubicación", profile.location],
    ["stack", featuredSkills.map((s) => s.name).join(", ")],
    ["kernel", "TypeScript + IA aplicada"],
    ["editor", "Claude Code"],
  ];

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
          {profile.role}. Construyo interfaces rápidas y accesibles, y las conecto con modelos de lenguaje.
        </p>
        <div className="flex flex-wrap gap-3 text-sm" data-piece>
          <Link href="/perfil/" className="rounded border border-accent bg-accent px-4 py-2 font-bold text-bg hover:opacity-90">
            ./ver-perfil.sh
          </Link>
          <Link href="/blog/" className="rounded border border-line px-4 py-2 hover:border-accent hover:text-accent">
            cat blog/*
          </Link>
          <Link href="/proyectos/" className="rounded border border-line px-4 py-2 hover:border-accent hover:text-accent">
            ls proyectos/
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
            ["/perfil/", "perfil/", "CV, habilidades como estadísticas y experiencia"],
            ["/blog/", "blog/", "posts en markdown sobre frontend e IA"],
            ["/proyectos/", "proyectos/", "demos, experimentos y aprendizajes"],
          ].map(([href, name, desc]) => (
            <li key={href}>
              <Link href={href} className="group flex flex-wrap gap-x-4 rounded px-2 py-1.5 hover:bg-bg-soft">
                <span className="text-dim">drwxr-xr-x</span>
                <span className="w-28 font-bold text-accent-3 group-hover:text-accent">{name}</span>
                <span className="text-muted">{desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* últimos posts */}
      <section className="space-y-4">
        <Prompt cmd="ls -t blog/ | head -3" />
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}/`} className="group block rounded border border-line p-4 hover:border-accent">
                <div className="text-xs text-muted">
                  {formatDate(p.date)} · {p.readingMinutes} min
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
        <Prompt cmd="ls proyectos/ | head -3" />
        <div className="grid gap-3 sm:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <a
              key={p.slug}
              href={p.demo ?? p.repo}
              target="_blank"
              rel="noreferrer"
              className="group rounded border border-line p-4 hover:border-accent"
              data-piece
            >
              <div className="text-xs text-muted">{p.year}</div>
              <div className="mt-1 font-bold group-hover:text-accent">{p.name}</div>
              <div className="mt-2 line-clamp-3 text-xs text-muted">{p.description}</div>
            </a>
          ))}
        </div>
        <Link href="/proyectos/" className="inline-block text-sm text-accent-3 hover:text-accent">
          → ver todos los proyectos
        </Link>
      </section>
    </div>
  );
}
