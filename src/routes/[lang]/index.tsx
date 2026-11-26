import NotFoundPanel from "@/components/patterns/not-found-panel.pattern.tsx";
import { isSupportedLanguage, useContent } from "@/shared/i18n";
import ProcessBand from "@/components/patterns/process-band.pattern.tsx";
import ProductsSection from "@/components/sections/(home)/products.section.tsx";
import ServicesSection from "@/components/sections/(home)/services.section.tsx";
import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import WorksSection from "@/components/sections/(home)/works.section.tsx";
import ProcessSection from "@/components/sections/(home)/process.section.tsx";
import HeroAccent from "@/components/patterns/hero-accent.pattern.tsx";
import Container from "@/shared/ui/container.ui.tsx";
import QuoteLink from "@/components/patterns/quote-link.pattern.tsx";
import AboutSection from "@/components/sections/(home)/about.section.tsx";

function HomeAbout() {
  const { pages, about, discover } = useContent();
  return <AboutSection id="about" title={pages.about.title} paragraphs={about} action={{ label: discover, href: "/about" }} />;
}

function HeroTitle() {
  const { home } = useContent();
  return (
    <h1>
      {home.prefix} <span className="b">{home.design}</span> {home.middle} <span className="p">{home.brand}</span>
    </h1>
  );
}

function HeroCopy() {
  const { hero } = useContent();
  return (
    <div>
      <HeroTitle />
      <p>{hero}</p>
      <QuoteLink />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <Container className="hero-grid">
        <HeroCopy />
        <div className="hero-img"><HeroAccent /></div>
      </Container>
    </section>
  );
}

function HomeStory() {
  return (
    <>
      <HeroSection />
      <ProcessBand />
      <ProcessSection />
      <HomeAbout />
    </>
  );
}

function HomeWorks() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/works" } as const;
  return <WorksSection id="works" title={sectionTitles.works} description={sectionDescriptions.works} action={action} />;
}

function HomeProof() {
  return (
    <>
      <ProcessBand reverse />
      <HomeWorks />
      <ProcessBand />
      <ContactPanel />
    </>
  );
}

function HomeServices() {
  const { sectionTitles, sectionDescriptions } = useContent();
  return <ServicesSection id="services" title={sectionTitles.services} description={sectionDescriptions.services} />;
}

function HomeProducts() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/products" } as const;
  return <ProductsSection id="products" title={sectionTitles.products} description={sectionDescriptions.products} action={action} />;
}

function HomeOffer() {
  return (
    <>
      <ProcessBand reverse />
      <HomeServices />
      <ProcessBand />
      <HomeProducts />
    </>
  );
}

type HomeProps = {
  lang?: string;
};

export default function Home({ lang }: HomeProps) {
  if (lang !== undefined && !isSupportedLanguage(lang)) return <NotFoundPanel />;
  return (
    <>
      <HomeStory />
      <HomeOffer />
      <HomeProof />
    </>
  );
}
