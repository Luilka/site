import HeroAccent from "@/components/patterns/hero-accent.pattern.tsx";
import Container from "@/shared/ui/container.ui.tsx";
import QuoteLink from "@/components/patterns/quote-link.pattern.tsx";
import { useContent } from "@/shared/i18n";

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

export default function HeroSection() {
  return (
    <section className="hero">
      <Container className="hero-grid">
        <HeroCopy />
        <div className="hero-img"><HeroAccent /></div>
      </Container>
    </section>
  );
}
