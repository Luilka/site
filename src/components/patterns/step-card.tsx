import Card from "@/components/ui/card.tsx";

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="step">
      <div className="t p-px">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div className="n">{number}</div>
    </Card>
  );
}
