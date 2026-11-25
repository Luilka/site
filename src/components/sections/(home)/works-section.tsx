import WorkCard from "@/components/cards/work-card.tsx";
import CollectionSection from "@/components/sections/collection-section.tsx";
import type { SectionProps } from "@/components/sections/section-props.ts";
import { useContent } from "@/shared/i18n";

export default function WorksSection(props: SectionProps) {
  const { works } = useContent();
  return (
    <CollectionSection {...props} className="works" gridClassName="work-grid" items={works}
      getKey={(work) => work.slug} render={(work) => <WorkCard {...work} />} />
  );
}
