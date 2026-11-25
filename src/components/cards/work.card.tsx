import CardWatermark from "@/components/cards/card-watermark.card.tsx";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import AppLink from "@/shared/ui/link.ui.tsx";
import { ArrowUpRight } from "lucide-react";
import CardIcon from "@/components/cards/card-icon.card.tsx";

type WorkWhoProps = {
  name: string;
  kind: string;
};

function WorkWho({ name, kind }: WorkWhoProps) {
  return (
    <div className="who">
      <div className="mini"><CardIcon name={name} size={22} /></div>
      <div><h3>{name}</h3><span>{kind}</span></div>
    </div>
  );
}

type WorkInfoProps = {
  name: string;
  kind: string;
  caseLabel: string;
};

function WorkInfo({ name, kind, caseLabel }: WorkInfoProps) {
  return (
    <div className="info">
      <WorkWho name={name} kind={kind} />
      <span className="pill">{caseLabel}<ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" /></span>
    </div>
  );
}

type WorkCardProps = {
  slug: string;
  name: string;
  kind?: string;
  caseLabel?: string;
};

export default function WorkCard({ slug, name, kind = "Particulier", caseLabel = "Cas d'étude" }: WorkCardProps) {
  return (
    <AppLink className="card work" href={detailHref("work", slug)}>
      <CardWatermark name={name} />
      <WorkInfo name={name} kind={kind} caseLabel={caseLabel} />
    </AppLink>
  );
}
