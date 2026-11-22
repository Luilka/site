import CardIcon from "@/components/patterns/card-icon.tsx";
import Card from "@/components/ui/card.tsx";

type ServiceCardProps = {
  title: string;
  description: string;
  shape?: string;
};

export default function ServiceCard({ title, description, shape }: ServiceCardProps) {
  return (
    <Card className="svc">
      <div className="ico" style={shape ? { borderRadius: shape } : undefined}>
        <CardIcon name={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
