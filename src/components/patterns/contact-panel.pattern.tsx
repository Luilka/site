import Container from "@/shared/ui/container.ui.tsx";
import QuoteLink from "@/components/patterns/quote-link.pattern.tsx";
import { useContent } from "@/shared/i18n";

function ContactCard() {
  const { contact } = useContent();
  return (
    <div className="cta">
      <h2>{contact.title}</h2>
      <p>{contact.description}</p>
      <QuoteLink variant="dark" className="btn-cta" />
    </div>
  );
}

type ContactPanelProps = {
  id?: string;
};

export default function ContactPanel({ id = "contact" }: ContactPanelProps) {
  return (
    <section className="cta-wrap" id={id}>
      <Container>
        <ContactCard />
      </Container>
    </section>
  );
}
