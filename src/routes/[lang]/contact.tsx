import { ContactPanel, PageHero } from "@/components/patterns.tsx";
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
