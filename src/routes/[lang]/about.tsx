import PageFrame from "@/components/patterns/page-frame.pattern.tsx";
import AboutSection from "@/components/sections/(home)/about.section.tsx";
import ProcessSection from "@/components/sections/(home)/process.section.tsx";
import { useContent } from "@/shared/i18n";

export default function About() {
  const { about, pages } = useContent();
  return (
    <PageFrame page="about">
      <AboutSection title={pages.about.title} paragraphs={about} />
      <ProcessSection />
    </PageFrame>
  );
}
