import InfoCard from "@/components/cards/info.card.tsx";
import CollectionSection from "@/components/sections/collection.section.tsx";
import type { SectionProps } from "@/components/sections/section-props.section.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { InfoCard as InfoCardData } from "@/shared/i18n";
import type { DetailKind } from "@/shared/types";

type InfoSectionProps = SectionProps & {
  items: readonly InfoCardData[];
  detail?: DetailKind;
};

export default function InfoSection({ items, detail, ...section }: InfoSectionProps) {
  return (
    <CollectionSection {...section} className="services" gridClassName="info-grid" items={items}
      getKey={(item) => item.title} render={(item) => <InfoCard {...item} href={infoHref(detail, item)} />} />
  );
}
