import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Proyectos y aprendizajes",
  description: "Demos, experimentos y proyectos personales de frontend e IA.",
  alternates: languageAlternates("projects", "es"),
};

export default function ProyectosPage() {
  return <ProjectsPage locale="es" />;
}
