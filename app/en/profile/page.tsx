import type { Metadata } from "next";
import ProfileDashboard from "@/components/profile/human/ProfileDashboard";
import ProfileTerminal from "@/components/profile/terminal/ProfileTerminal";
import ModeView from "@/components/ui/ModeView";
import { profile } from "@/data/profile";
import { languageAlternates, ROUTES } from "@/lib/i18n";
import JsonLd from "@/components/seo/JsonLd";
import { profilePageSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Engineer profile",
  description: `${profile.name}'s profile: key stats, skills and certifications. Full career history on LinkedIn.`,
  alternates: languageAlternates("profile", "en"),
};

export default function EnProfilePage() {
  return (
    <>
      <JsonLd data={profilePageSchema(ROUTES.profile.en, "en")} />
      <ModeView terminal={<ProfileTerminal locale="en" />} human={<ProfileDashboard locale="en" />} />
    </>
  );
}
