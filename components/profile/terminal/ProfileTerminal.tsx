import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import ModeToggle from "@/components/ui/ModeToggle";
import { buttonClass } from "@/components/ds";
import PrintButton from "@/components/ui/PrintButton";
import { FeaturedSkill, SkillTabs, StatCounter } from "./Skills";
import { certifications, featuredSkills, profile, skillGroups, softSkills } from "@/data/profile";
import { certificationCount, companyCount, skillCount, yearsOfExperience } from "@/lib/profile";
import { tr, type Locale } from "@/lib/i18n";

const COPY = {
  es: {
    dir: "~/perfil",
    file: "perfil.md",
    title: "Perfil de ingeniero",
    stats: ["años de experiencia", "empresas", "tecnologías en el stack", "certificaciones"],
    mainStack: "Stack principal",
    certsDir: "certificaciones",
    issued: "expedición",
    gitLog: "git log --experiencia --educacion",
    moved: "el historial completo se movió a LinkedIn.",
    summary: (years: number, companies: number) => `${years}+ años · ${companies} empresas · experiencia y educación con todo el detalle.`,
  },
  en: {
    dir: "~/profile",
    file: "profile.md",
    title: "Engineer profile",
    stats: ["years of experience", "companies", "technologies in the stack", "certifications"],
    mainStack: "Core stack",
    certsDir: "certifications",
    issued: "issued",
    gitLog: "git log --experience --education",
    moved: "the full history moved to LinkedIn.",
    summary: (years: number, companies: number) => `${years}+ years · ${companies} companies · full experience and education details.`,
  },
};

/** Perfil en modo terminal: estadísticas estilo htop y certificaciones; la trayectoria vive en LinkedIn. */
export default function ProfileTerminal({ locale = "es" }: { locale?: Locale }) {
  const t = COPY[locale];
  return (
    <div className="space-y-16">
      <section className="space-y-5">
        <Prompt cmd={`cat ${t.file}`} path={t.dir} />
        <Scramble as="h1" text={t.title} className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <div className="max-w-3xl space-y-3 text-fg">
          {profile.summary.map((p) => (
            <p key={tr(p, "es")}>{tr(p, locale)}</p>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 text-sm" data-piece>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={buttonClass()}>
            linkedin ↗
          </a>
          <a href={profile.links.github} target="_blank" rel="noreferrer" className={buttonClass()}>
            github ↗
          </a>
          <PrintButton>{locale === "es" ? "./exportar-cv.pdf" : "./export-resume.pdf"}</PrintButton>
        </div>
        <ModeToggle variant="banner" />
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCounter value={yearsOfExperience()} suffix="+" label={t.stats[0]} />
        <StatCounter value={companyCount()} label={t.stats[1]} />
        <StatCounter value={skillCount()} label={t.stats[2]} />
        <StatCounter value={certificationCount()} label={t.stats[3]} />
      </section>

      <section className="space-y-5">
        <Prompt cmd="htop --top 4" path={t.dir} />
        <h2 className="text-xl font-bold text-accent">
          <span className="text-dim">## </span>{t.mainStack}
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredSkills.map((s, i) => (
            <FeaturedSkill key={tr(s.name, "es")} skill={s} index={i} />
          ))}
        </div>
        <SkillTabs groups={skillGroups} />
        <div className="flex flex-wrap gap-2" data-piece>
          {softSkills.map((s) => (
            <span key={tr(s, "es")} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              #{tr(s, locale).toLowerCase().replaceAll(" ", "-")}
            </span>
          ))}
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <Prompt cmd={`ls ${t.certsDir}/`} path={t.dir} />
          <ul className="space-y-3">
            {certifications.map((c) => (
              <li key={c.name} className="rounded border border-line p-4" data-piece>
                <div className="text-xs text-muted">
                  {t.issued}: {tr(c.date, locale)}
                </div>
                <div className="mt-1 font-bold text-fg">{c.name}</div>
                <div className="text-sm text-accent-3">{c.issuer}</div>
                {c.credentialId && <div className="mt-1 text-xs text-dim">id: {c.credentialId}</div>}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <Prompt cmd={t.gitLog} path={t.dir} />
          <div className="rounded border border-line p-4 text-sm" data-piece>
            <p className="text-muted">
              <span className="text-accent-2">remote:</span> {t.moved}
            </p>
            <p className="mt-2 text-fg">{t.summary(yearsOfExperience(), companyCount())}</p>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={`${buttonClass({ variant: "primary" })} mt-4`}
            >
              open linkedin ↗
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
