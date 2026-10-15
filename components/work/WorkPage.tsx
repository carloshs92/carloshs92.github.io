import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import Say from "@/components/ui/Say";
import { buttonClass, Tag } from "@/components/ds";
import { profile } from "@/data/profile";
import { contact, services, steps } from "@/data/services";
import { tr, type Locale } from "@/lib/i18n";

const COPY = {
  es: {
    cmd: "cat trabajemos-juntos.md",
    path: "~/trabajemos-juntos",
    title: "Trabajemos juntos",
    intro:
      "Ayudo a equipos y empresas a construir productos web rápidos, ordenados y con IA donde aporta valor. Trabajo de forma remota desde Lima, en español o inglés.",
    services: "Cómo te puedo ayudar",
    how: "Cómo trabajamos",
    ctaTitle: "¿Tienes un proyecto en mente?",
    ctaBody: "Escríbeme por LinkedIn con un par de líneas sobre lo que necesitas y te respondo.",
    linkedin: "Escríbeme por LinkedIn ↗",
    email: "Enviar un correo",
    calendar: "Agendar una llamada ↗",
  },
  en: {
    cmd: "cat work-with-me.md",
    path: "~/work-with-me",
    title: "Work with me",
    intro:
      "I help teams and companies build web products that are fast, well organized and use AI where it adds value. I work remotely from Lima, in English or Spanish.",
    services: "How I can help",
    how: "How we work",
    ctaTitle: "Have a project in mind?",
    ctaBody: "Message me on LinkedIn with a couple of lines about what you need and I'll get back to you.",
    linkedin: "Message me on LinkedIn ↗",
    email: "Send an email",
    calendar: "Book a call ↗",
  },
};

export default function WorkPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <Prompt cmd={t.cmd} path={t.path} />
        <Scramble as="h1" text={t.title} className="glow block text-3xl font-extrabold text-accent sm:text-5xl human:text-fg human:font-semibold" />
        <p className="max-w-2xl text-lg leading-relaxed text-muted">{t.intro}</p>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={buttonClass({ variant: "primary", size: "md" })}>
          {t.linkedin}
        </a>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-accent human:text-lg human:font-semibold human:text-fg">
          <span className="text-dim human:hidden">## </span>
          {t.services}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.id} className="term-window flex flex-col" data-piece>
              <div className="term-bar human:hidden">
                <i className="dot bg-accent" />
                <span className="truncate">
                  {t.path}/{tr(s.slug, locale)}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-bold text-fg human:font-semibold">{tr(s.title, locale)}</h3>
                <p className="flex-1 text-sm text-muted">{tr(s.description, locale)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.examples.map((e) => (
                    <Tag key={tr(e, "es")}>{tr(e, locale)}</Tag>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-accent human:text-lg human:font-semibold human:text-fg">
          <span className="text-dim human:hidden">## </span>
          {t.how}
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={tr(s.title, "es")} className="rounded border border-line p-4 human:rounded-xl human:bg-panel" data-piece>
              <p className="text-xs text-muted">
                <Say terminal={`[${i + 1}/${steps.length}]`} human={`${i + 1}`} />
              </p>
              <p className="mt-1 font-bold text-fg human:font-medium">{tr(s.title, locale)}</p>
              <p className="mt-1 text-sm text-muted">{tr(s.description, locale)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 rounded border border-accent/50 bg-bg-soft p-6 human:rounded-xl" data-piece>
        <h2 className="text-xl font-bold text-fg human:font-semibold">{t.ctaTitle}</h2>
        <p className="max-w-2xl text-muted">{t.ctaBody}</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className={buttonClass({ variant: "primary", size: "md" })}>
            {t.linkedin}
          </a>
          {contact.calendar && (
            <a href={contact.calendar} target="_blank" rel="noreferrer" className={buttonClass({ size: "md" })}>
              {t.calendar}
            </a>
          )}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className={buttonClass({ size: "md" })}>
              {t.email}
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
