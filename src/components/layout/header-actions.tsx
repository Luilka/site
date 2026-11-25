import ContactLink from "@/components/layout/contact-link.tsx";
import LanguageToggle from "@/components/layout/language-toggle.tsx";

export default function HeaderActions() {
  return (
    <div className="nav-right">
      <LanguageToggle />
      <ContactLink />
    </div>
  );
}
