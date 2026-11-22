import { ChevronDown } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext.tsx";

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "fr" ? "en" : "fr";

  return (
    <button
      type="button"
      className="lang cursor-pointer"
      aria-label={`Changer la langue, actuellement ${language.toUpperCase()}`}
      onClick={() => setLanguage(nextLanguage)}
    >
      <span className="flag" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {language.toUpperCase()}
      <ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}
