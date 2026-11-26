import { PageFrame } from "@/components/patterns.tsx";
import { AboutSection, ProcessSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function About() {
  const { about } = useContent();
  return (
    <PageFrame page="about">
      <AboutSection paragraphs={about} />
      <ProcessSection />
    </PageFrame>
  );
}
