import type { Metadata } from "next";
import { BarList, buttonClass, Card, KpiTile, Tag } from "@/components/ds";
import Say from "@/components/ui/Say";

export const metadata: Metadata = {
  title: "Design system",
  description: "Tokens, tipografía y componentes con los que está hecho este sitio, en modo humano y terminal.",
};

const colors: { token: string; role: string }[] = [
  { token: "bg", role: "Fondo de la página" },
  { token: "bg-soft", role: "Fondos suaves: tags, código, pistas" },
  { token: "panel", role: "Superficie de tarjetas" },
  { token: "line", role: "Bordes y divisores" },
  { token: "fg", role: "Texto principal" },
  { token: "muted", role: "Texto secundario" },
  { token: "dim", role: "Texto terciario, solo decorativo" },
  { token: "accent", role: "Acción principal y énfasis" },
  { token: "accent-2", role: "Avisos y resaltados" },
  { token: "accent-3", role: "Enlaces y datos secundarios" },
  { token: "chart-1", role: "Serie principal de gráficos" },
  { token: "chart-2", role: "Serie secundaria de gráficos" },
];

const type: { label: string; className: string; sample: string }[] = [
  { label: "Display · 5xl semibold", className: "text-5xl font-semibold tracking-tight", sample: "Carlos Huamani" },
  { label: "Título · 2xl semibold", className: "text-2xl font-semibold tracking-tight", sample: "Perfil profesional" },
  { label: "Sección · base semibold", className: "text-base font-semibold", sample: "Stack principal" },
  { label: "Cuerpo · sm", className: "text-sm leading-relaxed", sample: "Construyo interfaces rápidas y accesibles." },
  { label: "Detalle · xs muted", className: "text-xs text-muted", sample: "Nivel de dominio, escala 0–100" },
  { label: "Mono · sm", className: "font-mono text-sm", sample: "carlos@huamani:~$ whoami" },
];

const code = "rounded-md bg-bg-soft px-1.5 py-0.5 font-mono text-xs text-accent-2";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 space-y-4">
      <h2 className="text-xl font-semibold tracking-tight text-fg">{title}</h2>
      {children}
    </section>
  );
}

/** Documentación viva del design system: todo lo que se ve aquí sale de components/ds y app/globals.css. */
export default function DesignSystemPage() {
  return (
    <div className="space-y-14">
      <header className="space-y-4">
        <p className="text-sm font-medium text-accent">
          <Say terminal="cat DESIGN_SYSTEM.md" human="Design system" />
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">Un sistema, dos voces</h1>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          El sitio tiene dos modos: <b className="text-fg">humano</b>, limpio y pensado para reclutadores, y <b className="text-fg">terminal</b>,
          para desarrolladores. Ambos usan los mismos tokens y componentes; solo cambian los valores de los tokens y algunos detalles de forma.
          Cambia el modo o el tema en el header y esta página se actualiza.
        </p>
        <nav className="flex flex-wrap gap-2 text-sm" aria-label="Secciones">
          {[
            ["principios", "Principios"],
            ["color", "Color"],
            ["tipografia", "Tipografía"],
            ["componentes", "Componentes"],
            ["patrones", "Patrones por modo"],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="text-accent-3 hover:underline">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <Section id="principios" title="Principios">
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Claridad primero">
            <p className="text-sm leading-relaxed text-muted">
              El modo humano es el de entrada: sin animaciones ni jerga, con lo importante arriba. La experiencia terminal es un extra opcional.
            </p>
          </Card>
          <Card title="Solo tokens">
            <p className="text-sm leading-relaxed text-muted">
              Ningún color se escribe a mano: todo usa <code className={code}>bg-*</code>, <code className={code}>text-*</code> o{" "}
              <code className={code}>border-*</code> con los tokens de abajo, así claro/oscuro y humano/terminal funcionan solos.
            </p>
          </Card>
          <Card title="Una acción principal">
            <p className="text-sm leading-relaxed text-muted">
              Cada bloque tiene como máximo un botón primario. Lo demás es secundario o un enlace.
            </p>
          </Card>
        </div>
      </Section>

      <Section id="color" title="Color">
        <p className="max-w-2xl text-sm text-muted">
          Tokens semánticos definidos en <code className={code}>app/globals.css</code> para cuatro paletas: humano claro, humano oscuro, terminal
          claro y terminal oscuro. Los valores que ves son los de la paleta activa.
        </p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {colors.map((c) => (
            <li key={c.token} className="overflow-hidden rounded-xl border border-line bg-panel">
              <span className="block h-14 border-b border-line" style={{ background: `var(--${c.token})` }} aria-hidden />
              <div className="p-3">
                <p className="font-mono text-xs font-semibold text-fg">{c.token}</p>
                <p className="mt-0.5 text-xs text-muted">{c.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tipografia" title="Tipografía">
        <p className="max-w-2xl text-sm text-muted">
          Inter en modo humano y JetBrains Mono en modo terminal (y siempre para código). La escala es la de Tailwind.
        </p>
        <Card>
          <ul className="divide-y divide-line">
            {type.map((t) => (
              <li key={t.label} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline">
                <span className="text-xs text-muted">{t.label}</span>
                <span className={`truncate text-fg ${t.className}`}>{t.sample}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      <Section id="componentes" title="Componentes">
        <p className="max-w-2xl text-sm text-muted">
          Viven en <code className={code}>components/ds</code> y se importan desde <code className={code}>@/components/ds</code>.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Botón" subtitle="buttonClass({ variant, size }) · sirve para Link, a y button">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className={buttonClass({ variant: "primary", size: "md" })}>
                Primario md
              </button>
              <button type="button" className={buttonClass({ size: "md" })}>
                Secundario md
              </button>
              <button type="button" className={buttonClass({ variant: "primary" })}>
                Primario sm
              </button>
              <button type="button" className={buttonClass()}>
                Secundario sm
              </button>
            </div>
          </Card>

          <Card title="Tag" subtitle="variant: stack (tecnologías) · pill (habilidades, filtros)">
            <div className="flex flex-wrap items-center gap-2">
              <Tag>Next.js</Tag>
              <Tag>TypeScript</Tag>
              <Tag>Tailwind</Tag>
              <Tag variant="pill">Liderazgo técnico</Tag>
              <Tag variant="pill">Mentoría</Tag>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <KpiTile hero label="KpiTile hero" value="12+" detail="Solo uno por vista" />
          <KpiTile label="KpiTile" value="6" detail="Indicador secundario" />
          <KpiTile label="Con texto" value="Front End Lead" detail="Valores cortos" />
          <KpiTile label="Sin detalle" value="2" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card title="Card" subtitle="Contenedor base: título, subtítulo y contenido">
            <p className="text-sm leading-relaxed text-muted">
              Borde <code className={code}>line</code>, fondo <code className={code}>panel</code>, radio xl y sombra suave que desaparece al
              imprimir.
            </p>
          </Card>
          <Card title="BarList" subtitle="Barras de una sola serie, escala 0–100">
            <BarList
              items={[
                { name: "React", level: 97 },
                { name: "Design Systems", level: 88 },
                { name: "GraphQL", level: 76 },
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section id="patrones" title="Patrones por modo">
        <Card>
          <dl className="grid gap-5 text-sm sm:grid-cols-[12rem_minmax(0,1fr)]">
            <dt className="font-semibold text-fg">Vista distinta por página</dt>
            <dd className="text-muted">
              <code className={code}>{"<ModeView terminal={…} human={…} />"}</code>: ambas vistas van en el HTML estático y el CSS muestra la del
              modo activo, sin parpadeo.
            </dd>
            <dt className="font-semibold text-fg">Solo un texto distinto</dt>
            <dd className="text-muted">
              <code className={code}>{'<Say terminal="git clone ↗" human="Repositorio ↗" />'}</code> · ejemplo en vivo:{" "}
              <b className="text-fg">
                <Say terminal="git clone ↗" human="Repositorio ↗" />
              </b>
            </dd>
            <dt className="font-semibold text-fg">Solo un estilo distinto</dt>
            <dd className="text-muted">
              Variante de Tailwind <code className={code}>human:</code>, p. ej. <code className={code}>rounded human:rounded-lg</code>.
            </dd>
            <dt className="font-semibold text-fg">Animaciones</dt>
            <dd className="text-muted">
              Solo en modo terminal: revisa <code className={code}>motionEnabled()</code> antes de animar. También respetan “reducir movimiento”.
            </dd>
          </dl>
        </Card>
      </Section>
    </div>
  );
}
