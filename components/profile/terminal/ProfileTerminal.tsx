import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import ModeToggle from "@/components/ui/ModeToggle";
import PrintButton from "@/components/ui/PrintButton";
import { FeaturedSkill, SkillTabs, StatCounter } from "./Skills";
import { certifications, featuredSkills, profile, skillGroups, softSkills } from "@/data/profile";
import { certificationCount, companyCount, skillCount, yearsOfExperience } from "@/lib/profile";

/** Perfil en modo terminal: estadísticas estilo htop y certificaciones; la trayectoria vive en LinkedIn. */
export default function ProfileTerminal() {
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
        <ModeToggle variant="banner" />
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCounter value={yearsOfExperience()} suffix="+" label="años de experiencia" />
        <StatCounter value={companyCount()} label="empresas" />
        <StatCounter value={skillCount()} label="tecnologías en el stack" />
        <StatCounter value={certificationCount()} label="certificaciones" />
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

      <section className="grid gap-8 md:grid-cols-2">
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
        <div className="space-y-4">
          <Prompt cmd="git log --experiencia --educacion" path="~/perfil" />
          <div className="rounded border border-line p-4 text-sm" data-piece>
            <p className="text-muted">
              <span className="text-accent-2">remote:</span> el historial completo se movió a LinkedIn.
            </p>
            <p className="mt-2 text-fg">
              {yearsOfExperience()}+ años · {companyCount()} empresas · experiencia y educación con todo el detalle.
            </p>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded border border-accent bg-accent px-3 py-1.5 font-bold text-bg hover:opacity-90"
            >
              open linkedin ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
