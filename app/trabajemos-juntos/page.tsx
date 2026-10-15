import type { Metadata } from "next";
import WorkPage from "@/components/work/WorkPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Trabajemos juntos",
  description: "Consultoría frontend, productos con IA, design systems, mentorías y charlas con Carlos Huamani.",
  alternates: languageAlternates("work", "es"),
};

export default function TrabajemosJuntosPage() {
  return <WorkPage locale="es" />;
}
