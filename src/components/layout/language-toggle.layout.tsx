import { ChevronDown } from "lucide-react";

import FlagMark from "@/components/layout/flag-mark.layout.tsx";
import { useLanguageSwitch } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

export default function LanguageToggle() {
  const { language, next, label, page } = useLanguageSwitch();
  return (
    <AppLink className="lang" href={page} language={next} aria-label={label}>
      <FlagMark />{language.toUpperCase()}<ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}
