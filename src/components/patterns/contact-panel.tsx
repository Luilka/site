import ContactCard from "@/components/patterns/contact-card.tsx";
import Container from "@/shared/ui/container.tsx";

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
