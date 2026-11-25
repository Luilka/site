import HeroCopy from "@/components/sections/hero-copy.section.tsx";
import HeroAccent from "@/components/patterns/hero-accent.pattern.tsx";
import Container from "@/shared/ui/container.ui.tsx";

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
