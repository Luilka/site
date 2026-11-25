import AboutSection from "@/components/sections/(home)/about-section.tsx";
import { useContent } from "@/shared/i18n";

export default function HomeAbout() {
  const { pages, about, discover } = useContent();
  return <AboutSection id="about" title={pages.about.title} paragraphs={about} action={{ label: discover, href: "/about" }} />;
}
