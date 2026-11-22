import { ArrowUpRight } from "lucide-react";

import CardIcon from "@/components/patterns/card-icon.tsx";
import Card from "@/components/ui/card.tsx";

type ProductCardProps = {
  name: string;
  description: string;
};

export default function ProductCard({ name, description }: ProductCardProps) {
  return (
    <Card className="prod">
      <ArrowUpRight className="arrow" size={12} strokeWidth={1.5} aria-hidden="true" />
      <div className="top">
        <div className="mini">
          <CardIcon name={name} size={14} />
        </div>
        <div>
          <small>Luilka</small>
          <h3>{name}</h3>
        </div>
      </div>
      <p>{description}</p>
      <div className="ph2">
        <CardIcon name={name} size={70} strokeWidth={1.5} />
      </div>
    </Card>
  );
}
