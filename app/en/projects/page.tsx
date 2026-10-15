import type { Metadata } from "next";
import ProjectsPage from "@/components/projects/ProjectsPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Projects and learning",
  description: "Demos, experiments and personal projects in frontend and AI.",
  alternates: languageAlternates("projects", "en"),
};

export default function EnProjectsPage() {
  return <ProjectsPage locale="en" />;
}
