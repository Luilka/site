import StepText from "@/components/cards/step-text.tsx";
import Card from "@/shared/ui/card.tsx";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="step">
      <StepText title={title} description={description} />
      <div className="n">{number}</div>
    </Card>
  );
}
