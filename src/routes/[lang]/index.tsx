import { NotFoundPanel, ProcessBand, ContactPanel, HeroAccent, QuoteLink } from "@/components/patterns.tsx";
import { isSupportedLanguage, useContent } from "@/shared/i18n";
import { ProductsSection, ServicesSection, WorksSection, ProcessSection, AboutSection } from "@/components/sections.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import type { HomeProps } from "@/shared/types";

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
