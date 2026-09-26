import type { Metadata } from "next";
import ProfileDashboard from "@/components/profile/human/ProfileDashboard";
import ProfileTerminal from "@/components/profile/terminal/ProfileTerminal";
import ModeView from "@/components/ui/ModeView";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Perfil de ingeniero",
  description: `CV de ${profile.name}: habilidades, experiencia, educación y certificaciones.`,
};

export default function PerfilPage() {
  return <ModeView terminal={<ProfileTerminal />} human={<ProfileDashboard />} />;
}
