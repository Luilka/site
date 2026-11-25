import StepCard from "@/components/cards/step-card.tsx";
import { useContent } from "@/shared/i18n";
import Container from "@/shared/ui/container.tsx";

type ProcessSectionProps = {
  id?: string;
};

export default function ProcessSection({ id }: ProcessSectionProps) {
  const { steps } = useContent();
  return (
    <section className="steps" id={id}>
      <Container className="steps-grid">
        {steps.map((step) => <StepCard key={step.number} {...step} />)}
      </Container>
    </section>
  );
}
