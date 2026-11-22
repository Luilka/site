import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import InfoSection from "@/components/templates/info-section.tsx";
import { useContent } from "@/i18n";

export default function Job() {
  const content = useContent();
  const intro = content.pages.job;

  return (
    <>
      <PageHero {...intro} />
      <InfoSection title={intro.title} description={content.section} items={content.jobs} />
      <ContactPanel />
    </>
  );
}
