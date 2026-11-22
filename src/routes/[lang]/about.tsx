import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import AboutSection from "@/components/templates/about-section.tsx";
import ProcessSection from "@/components/templates/process-section.tsx";
import { useContent } from "@/i18n";

export default function About() {
  const content = useContent();
  const intro = content.pages.about;

  return (
    <>
      <PageHero {...intro} />
      <AboutSection title={intro.title} paragraphs={content.about} />
      <ProcessSection />
      <ContactPanel />
    </>
  );
}
