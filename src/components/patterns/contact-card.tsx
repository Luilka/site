import QuoteLink from "@/components/patterns/quote-link.tsx";
import { useContent } from "@/shared/i18n";

export default function ContactCard() {
  const { contact } = useContent();
  return (
    <div className="cta">
      <h2>{contact.title}</h2>
      <p>{contact.description}</p>
      <QuoteLink variant="dark" className="btn-cta" />
    </div>
  );
}
