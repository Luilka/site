import StepCard from "@/components/patterns/step-card.tsx";
import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

type ProcessSectionProps = {
  id?: string;
};

export default function ProcessSection({ id }: ProcessSectionProps) {
  const content = useContent();

  return (
    <section className="steps" id={id}>
      <Container className="steps-grid">
        {content.steps.map((step) => (
          <StepCard key={step.number} number={step.number} title={step.title} description={step.description} />
        ))}
      </Container>
    </section>
  );
}
