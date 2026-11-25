import ContactLink from "@/components/layout/contact-link.layout.tsx";
import LanguageToggle from "@/components/layout/language-toggle.layout.tsx";

export default function HeaderActions() {
  return (
    <div className="nav-right">
      <LanguageToggle />
      <ContactLink />
    </div>
  );
}
