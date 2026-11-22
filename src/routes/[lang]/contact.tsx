import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import { useContent } from "@/i18n";

export default function Contact() {
  const content = useContent();

  return (
    <>
      <PageHero {...content.pages.contact} />
      <ContactPanel />
    </>
  );
}
