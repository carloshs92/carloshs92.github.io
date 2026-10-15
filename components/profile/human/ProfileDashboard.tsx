import ModeToggle from "@/components/ui/ModeToggle";
import PrintButton from "@/components/ui/PrintButton";
import { certifications, featuredSkills, profile, skillGroups, softSkills } from "@/data/profile";
import { certificationCount, companyCount, currentJob, groupAverages, skillCount, yearsOfExperience } from "@/lib/profile";
import { BarList, buttonClass, Card, KpiTile, Tag } from "@/components/ds";
import { tr, type Locale } from "@/lib/i18n";

const button = buttonClass();
const primaryButton = buttonClass({ variant: "primary" });

const COPY = {
  es: {
    at: "en",
    cv: "Descargar CV (PDF)",
    years: "Años de experiencia",
    since: (y: number) => `En frontend desde ${y}`,
    currentRole: "Rol actual",
    companies: "Empresas",
    sectors: "E-commerce, salud, educación, finanzas",
    certs: "Certificaciones",
    techs: (n: number) => `${n} tecnologías en el stack`,
    mainStack: "Stack principal",
    scale: "Nivel de dominio, escala 0–100",
    byArea: "Competencias por área",
    byAreaSub: "Promedio de las habilidades de cada área",
    tech: "Habilidades técnicas",
    techSub: "Detalle por área, escala 0–100",
    issued: "Expedición",
    expTitle: "Experiencia y educación",
    expSub: "El detalle completo está en LinkedIn",
    expBody: (years: number, companies: number, role: string, company: string) =>
      `Más de ${years} años en ${companies} empresas, hoy como ${role} en ${company}. Si quieres conocer cada puesto, mis estudios y recomendaciones, visita mi perfil de LinkedIn.`,
    expBtn: "Ver trayectoria en LinkedIn ↗",
    soft: "Habilidades blandas",
  },
  en: {
    at: "at",
    cv: "Download résumé (PDF)",
    years: "Years of experience",
    since: (y: number) => `In frontend since ${y}`,
    currentRole: "Current role",
    companies: "Companies",
    sectors: "E-commerce, healthcare, education, finance",
    certs: "Certifications",
    techs: (n: number) => `${n} technologies in the stack`,
    mainStack: "Core stack",
    scale: "Proficiency, 0–100 scale",
    byArea: "Skills by area",
    byAreaSub: "Average of each area's skills",
    tech: "Technical skills",
    techSub: "Detail by area, 0–100 scale",
    issued: "Issued",
    expTitle: "Experience and education",
    expSub: "Full details on LinkedIn",
    expBody: (years: number, companies: number, role: string, company: string) =>
      `Over ${years} years across ${companies} companies, currently ${role} at ${company}. For every role, my education and recommendations, see my LinkedIn profile.`,
    expBtn: "View career on LinkedIn ↗",
    soft: "Soft skills",
  },
};

const localized = <T extends { name: Parameters<typeof tr>[0] }>(items: T[], locale: Locale) =>
  items.map((i) => ({ ...i, name: tr(i.name, locale) }));

/** Perfil en modo humano: dashboard sobrio pensado para reclutadores. */
export default function ProfileDashboard({ locale = "es" }: { locale?: Locale }) {
  const t = COPY[locale];
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
                {job.role} {t.at} {job.company} · {tr(profile.location, locale)}
              </p>
            </div>
            <div className="max-w-3xl space-y-2 text-sm leading-relaxed text-fg">
              {profile.summary.map((p) => (
                <p key={tr(p, "es")}>{tr(p, locale)}</p>
              ))}
            </div>
            <div className="flex flex-wrap gap-2 print:hidden">
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={button}>
                LinkedIn
              </a>
              <a href={profile.links.github} target="_blank" rel="noreferrer" className={button}>
                GitHub
              </a>
              <PrintButton className={primaryButton}>{t.cv}</PrintButton>
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
        <KpiTile hero label={t.years} value={`${yearsOfExperience()}+`} detail={t.since(profile.startYear)} />
        <KpiTile label={t.currentRole} value={job.role} detail={job.company} />
        <KpiTile label={t.companies} value={companyCount()} detail={t.sectors} />
        <KpiTile label={t.certs} value={certificationCount()} detail={t.techs(skillCount())} />
      </div>

      {/* habilidades */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card title={t.mainStack} subtitle={t.scale}>
          <BarList locale={locale} items={localized(featuredSkills, locale)} />
        </Card>
        <Card title={t.byArea} subtitle={t.byAreaSub}>
          <BarList locale={locale} items={groupAverages().map((g) => ({ name: tr(g.title, locale), level: g.level }))} />
        </Card>
      </div>

      <Card title={t.tech} subtitle={t.techSub}>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {skillGroups.map((g) => (
            <div key={g.id}>
              <h3 className="mb-3 text-sm font-semibold text-fg">{tr(g.title, locale)}</h3>
              <BarList locale={locale} items={localized(g.skills, locale)} />
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card title={t.certs}>
          <ul className="space-y-4">
            {certifications.map((c) => (
              <li key={c.name}>
                <p className="font-medium text-fg">{c.name}</p>
                <p className="text-sm text-muted">{c.issuer}</p>
                <p className="text-xs text-muted">
                  {t.issued}: {tr(c.date, locale)}
                  {c.credentialId ? ` · ID ${c.credentialId}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Card>
        <Card title={t.expTitle} subtitle={t.expSub}>
          <p className="text-sm leading-relaxed text-fg">{t.expBody(yearsOfExperience(), companyCount(), job.role, job.company.replace(/\.$/, ""))}</p>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={`${primaryButton} mt-4 print:hidden`}>
            {t.expBtn}
          </a>
          <p className="mt-2 hidden text-xs text-muted print:block">{profile.links.linkedin}</p>
        </Card>
      </div>

      <Card title={t.soft}>
        <div className="flex flex-wrap gap-2">
          {softSkills.map((s) => (
            <Tag key={tr(s, "es")} variant="pill">
              {tr(s, locale)}
            </Tag>
          ))}
        </div>
      </Card>
    </div>
  );
}
