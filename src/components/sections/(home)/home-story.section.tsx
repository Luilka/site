import ProcessSection from "@/components/sections/(home)/process.section.tsx";
import ProcessBand from "@/components/patterns/process-band.pattern.tsx";
import HeroAccent from "@/components/patterns/hero-accent.pattern.tsx";
import Container from "@/shared/ui/container.ui.tsx";
import QuoteLink from "@/components/patterns/quote-link.pattern.tsx";
import { useContent } from "@/shared/i18n";
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

export default function HomeStory() {
  return (
    <>
      <HeroSection />
      <ProcessBand />
      <ProcessSection />
      <HomeAbout />
    </>
  );
}
