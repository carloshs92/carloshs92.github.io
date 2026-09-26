import HomeHuman from "@/components/home/HomeHuman";
import HomeTerminal from "@/components/home/HomeTerminal";
import ModeView from "@/components/ui/ModeView";

export default function Home() {
  return <ModeView terminal={<HomeTerminal />} human={<HomeHuman />} />;
}
