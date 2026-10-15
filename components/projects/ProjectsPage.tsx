import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";
import type { Locale } from "@/lib/i18n";

const COPY = {
  es: {
    cmd: "ls -la proyectos/",
    path: "~/proyectos",
    title: "Proyectos / Aprendizajes",
    intro: "Demos, experimentos y material de aprendizaje: desde mis primeros tutoriales de testing en 2015 hasta agentes y apps con IA.",
  },
  en: {
    cmd: "ls -la projects/",
    path: "~/projects",
    title: "Projects / Learning",
    intro: "Demos, experiments and learning material: from my first testing tutorials in 2015 to AI agents and apps.",
  },
};

export default function ProjectsPage({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Prompt cmd={t.cmd} path={t.path} />
        <Scramble as="h1" text={t.title} className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <p className="max-w-2xl text-muted">{t.intro}</p>
      </section>
      <ProjectGrid projects={projects} />
    </div>
  );
}
