import Badge from "@/components/ui/badge.tsx";
import Card from "@/components/ui/card.tsx";

type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
};

export default function InfoCard({ title, meta, description }: InfoCardProps) {
  return (
    <Card className="info-card">
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </Card>
  );
}
