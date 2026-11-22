import { ArrowUpRight } from "lucide-react";

import { buttonClasses } from "@/components/ui/button.tsx";
import Container from "@/components/ui/container.tsx";
import AppLink from "@/components/ui/link.tsx";
import type { SectionAction } from "@/content/site.ts";

type AboutSectionProps = {
  id?: string;
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export default function AboutSection({ id, title, paragraphs, action }: AboutSectionProps) {
  return (
    <section className="about" id={id}>
      <Container className="about-grid">
        <div className="about-img">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <use href="#finger" />
          </svg>
        </div>
        <div className="about-txt">
          <h2>{title}</h2>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {action ? (
            <AppLink className={buttonClasses("outline")} href={action.href}>
              {action.label}
              <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
            </AppLink>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
