import { ArrowUpRight } from "lucide-react";

import CardIcon from "@/components/patterns/card-icon.tsx";
import AppLink, { type Href } from "@/components/ui/link.tsx";

type WorkCardProps = {
  slug: string;
  name: string;
  kind?: string;
  caseLabel?: string;
};

export default function WorkCard({
  slug,
  name,
  kind = "Particulier",
  caseLabel = "Cas d'étude",
}: WorkCardProps) {
  return (
    <AppLink className="card work" href={`/work/${slug}` as Href}>
      <div className="ph2">
        <CardIcon name={name} size={70} strokeWidth={1.5} />
      </div>
      <div className="info">
        <div className="who">
          <div className="mini">
            <CardIcon name={name} size={22} />
          </div>
          <div>
            <h3>{name}</h3>
            <span>{kind}</span>
          </div>
        </div>
        <span className="pill">
          {caseLabel}
          <ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </AppLink>
  );
}
