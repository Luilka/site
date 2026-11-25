import type { SectionAction } from "@/shared/i18n";
import Container from "@/shared/ui/container.ui.tsx";
import ActionLink from "@/components/patterns/action-link.pattern.tsx";

function AboutArt() {
  return (
    <div className="about-img">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <use href="#finger" />
      </svg>
    </div>
  );
}

type AboutTextProps = {
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="about-txt">
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {action ? <ActionLink action={action} /> : null}
    </div>
  );
}

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
