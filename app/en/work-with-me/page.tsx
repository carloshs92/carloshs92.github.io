import type { Metadata } from "next";
import WorkPage from "@/components/work/WorkPage";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Work with me",
  description: "Frontend consulting, AI-powered products, design systems, mentoring and talks with Carlos Huamani.",
  alternates: languageAlternates("work", "en"),
};

export default function WorkWithMePage() {
  return <WorkPage locale="en" />;
}
