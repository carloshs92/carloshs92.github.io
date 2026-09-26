import type { Metadata } from "next";
import Prompt from "@/components/terminal/Prompt";
import Scramble from "@/components/terminal/Scramble";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Proyectos y aprendizajes",
  description: "Demos, experimentos y proyectos personales de frontend e IA.",
};

export default function ProyectosPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <Prompt cmd="ls -la proyectos/" path="~/proyectos" />
        <Scramble as="h1" text="Proyectos / Aprendizajes" className="glow block text-3xl font-extrabold text-accent sm:text-5xl" />
        <p className="max-w-2xl text-muted">
          Demos, experimentos y material de aprendizaje: desde mis primeros tutoriales de testing en 2015 hasta agentes y apps con IA.
        </p>
      </section>
      <ProjectGrid projects={projects} />
    </div>
  );
}
