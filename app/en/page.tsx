import type { Metadata } from "next";
import HomeHuman from "@/components/home/HomeHuman";
import HomeTerminal from "@/components/home/HomeTerminal";
import ModeView from "@/components/ui/ModeView";
import { languageAlternates } from "@/lib/i18n";

export const metadata: Metadata = { alternates: languageAlternates("home", "en") };

export default function EnHome() {
  return <ModeView terminal={<HomeTerminal locale="en" />} human={<HomeHuman locale="en" />} />;
}
