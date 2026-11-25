import Card from "@/shared/ui/card.ui.tsx";

type StepTextProps = {
  title: string;
  description: string;
};

function StepText({ title, description }: StepTextProps) {
  return (
    <div className="t p-8">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

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
