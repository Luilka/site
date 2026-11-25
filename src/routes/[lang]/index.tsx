import ContactPanel from "@/components/patterns/contact-panel.tsx";
import NotFoundPanel from "@/components/patterns/not-found-panel.tsx";
import ProcessBand from "@/components/patterns/process-band.tsx";
import AboutSection from "@/components/templates/about-section.tsx";
import HeroSection from "@/components/templates/hero-section.tsx";
import ProcessSection from "@/components/templates/process-section.tsx";
import ProductsSection from "@/components/templates/products-section.tsx";
import ServicesSection from "@/components/templates/services-section.tsx";
import WorksSection from "@/components/templates/works-section.tsx";
import { isSupportedLanguage, useContent } from "@/i18n";

type HomeProps = {
  lang?: string;
};

export default function Home({ lang }: HomeProps) {
  const content = useContent();

  if (lang !== undefined && !isSupportedLanguage(lang)) {
    return <NotFoundPanel />;
  }

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
      <ProcessBand reverse />
      <ServicesSection
        id="services"
        title={content.sectionTitles.services}
        description={content.sectionDescriptions.services}
      />
      <ProcessBand />
      <ProductsSection
        id="products"
        title={content.sectionTitles.products}
        description={content.sectionDescriptions.products}
        action={{ label: content.discover, href: "/products" }}
      />
      <ProcessBand reverse />
      <WorksSection
        id="works"
        title={content.sectionTitles.works}
        description={content.sectionDescriptions.works}
        action={{ label: content.discover, href: "/works" }}
      />
      <ProcessBand noBottomMargin />
      <ContactPanel />
    </>
  );
}
