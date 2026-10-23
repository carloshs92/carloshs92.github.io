import type { Metadata } from "next";
import ProfileDashboard from "@/components/profile/human/ProfileDashboard";
import ProfileTerminal from "@/components/profile/terminal/ProfileTerminal";
import ModeView from "@/components/ui/ModeView";
import { profile } from "@/data/profile";
import { languageAlternates, ROUTES } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Perfil de ingeniero",
  description: `Perfil de ${profile.name}: indicadores, habilidades y certificaciones. Trayectoria completa en LinkedIn.`,
  alternates: languageAlternates("profile", "es"),
};

export default function PerfilPage() {
  return (
    <>
      <JsonLd data={profilePageSchema(ROUTES.profile.es, "es")} />
      <ModeView terminal={<ProfileTerminal locale="es" />} human={<ProfileDashboard locale="es" />} />
    </>
  );
}
