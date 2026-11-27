import { NotFoundPanel, ProcessBand, ContactPanel, HeroReel, ContactButton } from "@/components/patterns.tsx";
import { isSupportedLanguage, useContent } from "@/shared/i18n";
import { ProductsSection, ServicesSection, WorksSection, ProcessSection, AboutSection } from "@/components/sections.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import type { HomeProps } from "@/shared/types";

function HomeAbout() {
  const { pages, about, discover, aboutPage } = useContent();
  return <AboutSection id="about" image={aboutPage.images.studio} title={pages.about.title} paragraphs={about} action={{ label: discover, href: "/about" }} />;
}

function HeroTitle() {
  const { home } = useContent();
  return (
    <h1 className="text-(length:--text-3xl) leading-[1.15] font-semibold tracking-[-0.02em] max-w-[520px] max-[1000px]:text-(length:--text-2xl)">
      {home.prefix} {home.design} {home.middle} {home.brand}
    </h1>
  );
}

function HeroCopy() {
  const { hero } = useContent();
  return (
    <div>
      <HeroTitle />
      <p className="text-(length:--text-base) text-muted max-w-[470px] mt-[22px] mb-[28px] leading-[1.55]">{hero}</p>
      <ContactButton />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="pt-[72px] pb-[64px]">
      <Container className="grid items-center grid-cols-[1fr_540px] gap-[6px] max-[1000px]:grid-cols-[1fr]">
        <HeroCopy />
        <HeroReel />
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
