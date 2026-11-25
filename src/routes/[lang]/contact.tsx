import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import PageHero from "@/components/patterns/page-hero.pattern.tsx";
import { useContent } from "@/shared/i18n";

export default function Contact() {
  const content = useContent();

  return (
    <>
      <PageHero {...content.pages.contact} />
      <ContactPanel />
    </>
  );
}
