import { PageFrame } from "@/components/patterns.tsx";
import { ServicesSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Services() {
  const { pages, section } = useContent();
  return (
    <PageFrame page="services">
      <ServicesSection title={pages.services.title} description={section} />
    </PageFrame>
  );
}
