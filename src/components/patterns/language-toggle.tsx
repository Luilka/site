import { ChevronDown } from "lucide-react";

import AppLink from "@/components/ui/link.tsx";
import { useContent } from "@/i18n";
import { useLanguage } from "@/i18n";
import { usePagePathname } from "@/i18n";

export default function LanguageToggle() {
  const { language } = useLanguage();
  const content = useContent();
  const page = usePagePathname();
  const nextLanguage = language === "fr" ? "en" : "fr";

  return (
    <AppLink className="lang" href={page} language={nextLanguage} aria-label={content.switchLanguage}>
      <span className="flag" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {language.toUpperCase()}
      <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}
