import ProcessBand from "@/components/patterns/process-band.pattern.tsx";
import ProductsSection from "@/components/sections/(home)/products.section.tsx";
import { useContent } from "@/shared/i18n";
import ServicesSection from "@/components/sections/(home)/services.section.tsx";

function HomeServices() {
  const { sectionTitles, sectionDescriptions } = useContent();
  return <ServicesSection id="services" title={sectionTitles.services} description={sectionDescriptions.services} />;
}

function HomeProducts() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/products" } as const;
  return <ProductsSection id="products" title={sectionTitles.products} description={sectionDescriptions.products} action={action} />;
}

export default function HomeOffer() {
  return (
    <>
      <ProcessBand reverse />
      <HomeServices />
      <ProcessBand />
      <HomeProducts />
    </>
  );
}
