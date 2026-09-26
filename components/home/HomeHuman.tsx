import Link from "next/link";
import { featuredSkills, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { formatDate, getAllPosts } from "@/lib/posts";
import { companyCount, currentJob, yearsOfExperience } from "@/lib/profile";

const card = "rounded-xl border border-line bg-panel p-5 shadow-sm transition-colors hover:border-accent";

/** Inicio en modo humano: presentación directa, sin jerga de terminal. */
export default function HomeHuman() {
  const job = currentJob();
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="space-y-14">
      <section className="space-y-5">
        <p className="text-sm font-medium text-accent">{profile.role}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">{profile.name}</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Actualmente {job.role} en {job.company}, con más de {yearsOfExperience()} años construyendo productos web en {companyCount()}{" "}
          empresas. Hoy me enfoco en {featuredSkills.map((s) => s.name).join(", ")} e IA aplicada.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/perfil/" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-panel hover:opacity-90">
            Ver perfil profesional
          </Link>
          <Link href="/proyectos/" className="rounded-lg border border-line bg-panel px-4 py-2 text-sm font-medium text-fg hover:border-accent">
            Proyectos
          </Link>
          <Link href="/blog/" className="rounded-lg border border-line bg-panel px-4 py-2 text-sm font-medium text-fg hover:border-accent">
            Blog
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-fg">Últimos artículos</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className={card}>
              <p className="text-xs text-muted">
                {formatDate(p.date)} · {p.readingMinutes} min
              </p>
              <p className="mt-2 font-medium text-fg">{p.title}</p>
              <p className="mt-1 text-sm text-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-fg">Proyectos destacados</h2>
          <Link href="/proyectos/" className="text-sm text-accent-3 hover:underline">
            Ver todos
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {projects.slice(0, 3).map((p) => (
            <a key={p.slug} href={p.demo ?? p.repo} target="_blank" rel="noreferrer" className={card}>
              <p className="text-xs text-muted">{p.year}</p>
              <p className="mt-2 font-medium text-fg">{p.name}</p>
              <p className="mt-1 line-clamp-3 text-sm text-muted">{p.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
