import ServiceCard from "@/components/cards/service.card.tsx";
import CollectionSection from "@/components/sections/collection.section.tsx";
import type { SectionProps } from "@/components/sections/section-props.section.ts";
import { useContent } from "@/shared/i18n";

export default function ServicesSection(props: SectionProps) {
  const { services } = useContent();
  return (
    <CollectionSection {...props} className="services" gridClassName="svc-grid" items={services}
      getKey={(service) => service.slug} render={(service) => <ServiceCard {...service} />} />
  );
}
