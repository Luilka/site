import AboutArt from "@/components/sections/about-art.section.tsx";
import AboutText from "@/components/sections/about-text.section.tsx";
import type { SectionAction } from "@/shared/i18n";
import Container from "@/shared/ui/container.ui.tsx";

type AboutSectionProps = {
  id?: string;
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export default function AboutSection({ id, ...text }: AboutSectionProps) {
  return (
    <section className="about" id={id}>
      <Container className="about-grid">
        <AboutArt />
        <AboutText {...text} />
      </Container>
    </section>
  );
}
