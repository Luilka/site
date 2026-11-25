import CardWatermark from "@/components/cards/card-watermark.card.tsx";
import WorkInfo from "@/components/cards/work-info.card.tsx";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import AppLink from "@/shared/ui/link.ui.tsx";

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
