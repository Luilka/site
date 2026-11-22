import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import WorksSection from "@/components/templates/works-section.tsx";
import { useContent } from "@/content/useContent.ts";

export default function Works() {
  const content = useContent();
  const intro = content.pages.works;

  return (
    <>
      <PageHero {...intro} />
      <WorksSection
        title={intro.title}
        description={content.section}
        action={{ label: content.discover, href: "/blog" }}
      />
      <ContactPanel />
    </>
  );
}
