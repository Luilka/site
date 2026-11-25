import CollectionSection from "@/components/sections/collection.section.tsx";
import type { SectionProps } from "@/components/sections/section-props.section.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { InfoCard as InfoCardData } from "@/shared/i18n";
import type { DetailKind } from "@/shared/types";
import AppLink, { type Href } from "@/shared/ui/link.ui.tsx";
import Card from "@/shared/ui/card.ui.tsx";
import Badge from "@/shared/ui/badge.ui.tsx";

type InfoCardBodyProps = {
  title: string;
  meta: string;
  description: string;
};

function InfoCardBody({ title, meta, description }: InfoCardBodyProps) {
  return (
    <>
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
}

type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
  href?: Href;
};

function InfoCard({ href, ...copy }: InfoCardProps) {
  if (!href) return <Card className="info-card"><InfoCardBody {...copy} /></Card>;
  return <AppLink className="card info-card" href={href}><InfoCardBody {...copy} /></AppLink>;
}

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
