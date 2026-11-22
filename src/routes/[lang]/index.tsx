import ContactPanel from "@/components/patterns/contact-panel.tsx";
import ProcessBand from "@/components/patterns/process-band.tsx";
import AboutSection from "@/components/templates/about-section.tsx";
import HeroSection from "@/components/templates/hero-section.tsx";
import ProcessSection from "@/components/templates/process-section.tsx";
import ProductsSection from "@/components/templates/products-section.tsx";
import ServicesSection from "@/components/templates/services-section.tsx";
import WorksSection from "@/components/templates/works-section.tsx";
import { useContent } from "@/i18n";

export default function Home() {
  const content = useContent();

  return (
    <>
      <HeroSection />
      <ProcessBand />
      <ProcessSection />
      <AboutSection
        id="about"
        title={content.pages.about.title}
        paragraphs={content.about}
        action={{ label: content.discover, href: "/about" }}
      />
      <ProcessBand />
      <ServicesSection
        id="services"
        title={content.sectionTitles.services}
        description={content.section}
      />
      <ProcessBand />
      <ProductsSection
        id="products"
        title={content.sectionTitles.products}
        description={content.section}
        action={{ label: content.discover, href: "/products" }}
      />
      <ProcessBand />
      <WorksSection
        id="works"
        title={content.sectionTitles.works}
        description={content.section}
        action={{ label: content.discover, href: "/works" }}
      />
      <ProcessBand noBottomMargin />
      <ContactPanel />
    </>
  );
}
