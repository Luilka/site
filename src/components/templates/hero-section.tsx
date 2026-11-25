import { CalendarDays } from "lucide-react";

import HeroAccent from "@/components/patterns/hero-accent.tsx";
import { buttonClasses } from "@/components/ui/button.tsx";
import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

export default function HeroSection() {
  const content = useContent();

  return (
    <section className="hero">
      <Container className="hero-grid">
        <div>
          <h1>
            {content.home.prefix} <span className="b">{content.home.design}</span>{" "}
            {content.home.middle} <span className="p">{content.home.brand}</span>
          </h1>
          <p>{content.hero}</p>
          <a className={buttonClasses("primary")} href="mailto:bonjour@luilka.cd">
            {content.quote}
            <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
        <div className="hero-img">
          <HeroAccent />
        </div>
      </Container>
    </section>
  );
}
