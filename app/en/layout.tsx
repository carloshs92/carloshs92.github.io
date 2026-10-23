import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { OG_IMAGE } from "@/lib/seo";

// Metadatos por defecto de las páginas en inglés; el <html lang> lo ajusta bootScript.
export const metadata: Metadata = {
  title: { default: `${profile.name} · Systems Engineer`, template: `%s · ${profile.name}` },
  description: "Systems Engineer, Front End Lead and applied AI. Profile, blog and projects.",
  openGraph: { type: "website", locale: "en_US", alternateLocale: "es_PE", siteName: profile.name, images: [OG_IMAGE] },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
