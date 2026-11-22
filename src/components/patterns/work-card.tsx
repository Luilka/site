import { ArrowUpRight } from "lucide-react";

import CardIcon from "@/components/patterns/card-icon.tsx";
import Card from "@/components/ui/card.tsx";

type WorkCardProps = {
  name: string;
  kind?: string;
  caseLabel?: string;
};

export default function WorkCard({ name, kind = "Particulier", caseLabel = "Cas d'étude" }: WorkCardProps) {
  return (
    <Card className="work">
      <div className="ph2">
        <CardIcon name={name} size={70} strokeWidth={1.5} />
      </div>
      <div className="info">
        <div className="who">
          <div className="mini">
            <CardIcon name={name} size={14} />
          </div>
          <div>
            <b>{name}</b>
            <span>{kind}</span>
          </div>
        </div>
        <span className="pill">
          {caseLabel}
          <ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </Card>
  );
}
