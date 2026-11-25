import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import ServicesSection from "@/components/templates/services-section.tsx";
import { useContent } from "@/i18n";

export default function Services() {
  const content = useContent();
  const intro = content.pages.services;

  return (
    <>
      <PageHero {...intro} />
      <ServicesSection title={intro.title} description={content.section} />
      <ContactPanel />
    </>
  );
}
