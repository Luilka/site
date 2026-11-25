import ServicesSection from "@/components/sections/(home)/services-section.tsx";
import { useContent } from "@/shared/i18n";

export default function HomeServices() {
  const { sectionTitles, sectionDescriptions } = useContent();
  return <ServicesSection id="services" title={sectionTitles.services} description={sectionDescriptions.services} />;
}
