import { CalendarDays } from "lucide-react";

import { buttonClasses } from "@/components/ui/button.tsx";
import Container from "@/components/ui/container.tsx";
import { useContent } from "@/i18n";

type ContactPanelProps = {
  id?: string;
};

export default function ContactPanel({ id = "contact" }: ContactPanelProps) {
  const content = useContent();

  return (
    <section className="cta-wrap" id={id}>
      <Container>
        <div className="cta">
          <h2>{content.contact.title}</h2>
          <p>{content.contact.description}</p>
          <a className={buttonClasses("dark", "btn-cta")} href="mailto:bonjour@luilka.cd">
            {content.quote}
            <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
