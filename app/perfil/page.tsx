import type { Metadata } from "next";
import Prompt from "@/components/Prompt";
import Scramble from "@/components/Scramble";
import PrintButton from "@/components/PrintButton";
import { FeaturedSkill, SkillTabs, StatCounter } from "@/components/Skills";
import { certifications, education, experience, featuredSkills, profile, skillGroups, softSkills } from "@/data/profile";

export const metadata: Metadata = {
  title: "Perfil de ingeniero",
  description: `CV de ${profile.name}: habilidades, experiencia, educación y certificaciones.`,
};

// hash corto y estable para simular un `git log`
function hash(s: string) {
  let h = 5381;
  for (const c of s) h = (h * 33) ^ c.charCodeAt(0);
  return (h >>> 0).toString(16).padStart(7, "0").slice(0, 7);
}

export default function PerfilPage() {
  const years = new Date().getFullYear() - profile.startYear;
  const companies = new Set(experience.map((e) => e.company)).size;
  const totalSkills = featuredSkills.length + skillGroups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <div className="space-y-16">
      <section className="space-y-5">
        <Prompt cmd="cat perfil.md" path="~/perfil" />
        <Scramble as="h1" text="Perfil de ingeniero" className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <div className="max-w-3xl space-y-3 text-fg">
          {profile.summary.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm" data-piece>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="rounded border border-line px-3 py-1.5 hover:border-accent hover:text-accent">
            linkedin ↗
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className="rounded border border-line px-3 py-1.5 hover:border-accent hover:text-accent">
            github ↗
          </a>
          <PrintButton />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCounter value={years} suffix="+" label="años de experiencia" />
        <StatCounter value={companies} label="empresas" />
        <StatCounter value={totalSkills} label="tecnologías en el stack" />
        <StatCounter value={education.length + certifications.length} label="estudios y certificaciones" />
      </section>

      <section className="space-y-5">
        <Prompt cmd="htop --top 4" path="~/perfil" />
        <h2 className="text-xl font-bold text-accent">
          <span className="text-dim">## </span>Stack principal
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredSkills.map((s, i) => (
            <FeaturedSkill key={s.name} skill={s} index={i} />
          ))}
        </div>
        <SkillTabs groups={skillGroups} />
        <div className="flex flex-wrap gap-2" data-piece>
          {softSkills.map((s) => (
            <span key={s} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              #{s.toLowerCase().replaceAll(" ", "-")}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <Prompt cmd="git log --graph --experiencia" path="~/perfil" />
        <h2 className="text-xl font-bold text-accent">
          <span className="text-dim">## </span>Experiencia
        </h2>
        <ol className="relative">
          {experience.map((job, i) => (
            <li key={`${job.company}-${job.start}`} className="relative flex gap-4 pb-8 last:pb-0">
              <div className="flex flex-col items-center" aria-hidden>
                <span className={`mt-1 size-3 shrink-0 rounded-full border-2 ${i === 0 ? "border-accent bg-accent" : "border-accent-3 bg-bg"}`} />
                {i < experience.length - 1 && <span className="w-px flex-1 bg-line" />}
              </div>
              <div className="min-w-0 flex-1" data-piece>
                <div className="flex flex-wrap items-center gap-x-2 text-xs">
                  <span className="text-accent-2">commit {hash(job.company + job.start)}</span>
                  {i === 0 && <span className="rounded bg-accent px-1.5 font-bold text-bg">HEAD → actual</span>}
                  <span className="text-muted">
                    {job.start} — {job.end}
                  </span>
                </div>
                <h3 className="mt-1 font-bold text-fg">
                  {job.role} <span className="text-accent-3">@ {job.company}</span>
                </h3>
                <p className="text-xs text-muted">{job.mode}</p>
                <p className="mt-2 text-sm text-fg/90">{job.description}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.stack.map((t) => (
                    <span key={t} className="rounded bg-bg-soft px-2 py-0.5 text-[11px] text-accent">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Prompt cmd="ls educacion/" path="~/perfil" />
          <ul className="space-y-3">
            {education.map((e) => (
              <li key={e.degree} className="rounded border border-line p-4" data-piece>
                <div className="text-xs text-muted">{e.period}</div>
                <div className="mt-1 font-bold text-fg">{e.degree}</div>
                <div className="text-sm text-accent-3">{e.school}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <Prompt cmd="ls certificaciones/" path="~/perfil" />
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="rounded border border-line p-4" data-piece>
                <div className="text-xs text-muted">expedición: {c.date}</div>
                <div className="mt-1 font-bold text-fg">{c.name}</div>
                <div className="text-sm text-accent-3">{c.issuer}</div>
                {"credentialId" in c && c.credentialId && <div className="mt-1 text-xs text-dim">id: {c.credentialId}</div>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
