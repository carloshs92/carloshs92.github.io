import ModeToggle from "@/components/ui/ModeToggle";
import PrintButton from "@/components/ui/PrintButton";
import { certifications, education, experience, featuredSkills, profile, skillGroups, softSkills } from "@/data/profile";
import { durationMonths, formatDuration, formatRange } from "@/lib/dates";
import { companyCount, credentialCount, currentJob, groupAverages, skillCount, yearsOfExperience } from "@/lib/profile";
import BarList from "./BarList";
import Card from "./Card";
import ExperienceTimeline from "./ExperienceTimeline";
import KpiTile from "./KpiTile";

const button = "rounded-lg border border-line bg-panel px-3 py-1.5 text-sm font-medium text-fg hover:border-accent hover:text-accent";
const primaryButton = "rounded-lg border border-accent bg-accent px-3 py-1.5 text-sm font-medium text-panel hover:opacity-90";

/** Perfil en modo humano: dashboard sobrio pensado para reclutadores. */
export default function ProfileDashboard() {
  const job = currentJob();

  return (
    <div className="space-y-6">
      {/* encabezado */}
      <Card>
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <div className="grid size-16 shrink-0 place-items-center rounded-full bg-accent text-xl font-semibold text-panel" aria-hidden>
            CH
          </div>
          <div className="min-w-0 flex-1 space-y-3">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{profile.name}</h1>
              <p className="text-muted">
                {job.role} en {job.company} · {profile.location}
              </p>
            </div>
            <div className="max-w-3xl space-y-2 text-sm leading-relaxed text-fg">
              {profile.summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 print:hidden">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={button}>
                LinkedIn
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className={button}>
                GitHub
              </a>
              <PrintButton className={primaryButton}>Descargar CV (PDF)</PrintButton>
              <ModeToggle />
            </div>
            <p className="hidden text-xs text-muted print:block">
              {profile.links.linkedin} · {profile.links.github}
            </p>
          </div>
        </div>
      </Card>

      {/* indicadores */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile hero label="Años de experiencia" value={`${yearsOfExperience()}+`} detail={`En frontend desde ${profile.startYear}`} />
        <KpiTile label="Rol actual" value={job.role} detail={job.company} />
        <KpiTile label="Empresas" value={companyCount()} detail="E-commerce, salud, educación, finanzas" />
        <KpiTile label="Estudios y certificaciones" value={credentialCount()} detail={`${skillCount()} tecnologías en el stack`} />
      </div>

      {/* habilidades */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Stack principal" subtitle="Nivel de dominio, escala 0–100">
          <BarList items={featuredSkills} />
        </Card>
        <Card title="Competencias por área" subtitle="Promedio de las habilidades de cada área">
          <BarList items={groupAverages().map((g) => ({ name: g.title, level: g.level }))} />
        </Card>
      </div>

      <Card title="Trayectoria profesional" subtitle="Duración de cada puesto en el tiempo">
        <ExperienceTimeline />
      </Card>

      <Card title="Habilidades técnicas" subtitle="Detalle por área, escala 0–100">
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.id}>
              <h3 className="mb-3 text-sm font-semibold text-fg">{g.title}</h3>
              <BarList items={g.skills} />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Experiencia">
        <ol className="divide-y divide-line">
          {experience.map((e) => (
            <li key={`${e.company}-${e.from}`} className="break-inside-avoid py-4 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold text-fg">
                  {e.role} · <span className="text-accent-3">{e.company}</span>
                </h3>
                <p className="text-xs tabular-nums text-muted">
                  {formatRange(e.from, e.to)} · {formatDuration(durationMonths(e.from, e.to))}
                </p>
              </div>
              <p className="text-xs text-muted">{e.mode}</p>
              <p className="mt-2 text-sm leading-relaxed text-fg">{e.description}</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {e.stack.map((t) => (
                  <span key={t} className="rounded-md bg-bg-soft px-2 py-0.5 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title="Educación">
          <ul className="space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="font-medium text-fg">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
                <p className="text-xs text-muted">{e.period}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Certificaciones">
          <ul className="space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-medium text-fg">{c.name}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
                <p className="text-xs text-muted">
                  Expedición: {c.date}
                  {"credentialId" in c && c.credentialId ? ` · ID ${c.credentialId}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Habilidades blandas">
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 text-sm text-fg">
              {s}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
}
