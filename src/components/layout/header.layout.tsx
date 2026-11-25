import BrandMark from "@/components/layout/brand-mark.layout.tsx";
import MainNavigation from "@/components/layout/navigation/main-navigation.layout.tsx";
import { ChevronDown, CalendarDays } from "lucide-react";
import { useLanguageSwitch, useContent } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

function ContactLink() {
  const { contactAction } = useContent();
  return (
    <AppLink className="btn-outline bg-transparent! border-gray-400!" href="/contact">
      {contactAction}<CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
    </AppLink>
  );
}

function FlagMark() {
  return (
    <span className="flag" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function LanguageToggle() {
  const { language, next, label, page } = useLanguageSwitch();
  return (
    <AppLink className="lang" href={page} language={next} aria-label={label}>
      <FlagMark />{language.toUpperCase()}<ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}

function HeaderActions() {
  return (
    <div className="nav-right">
      <LanguageToggle />
      <ContactLink />
    </div>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-13 border-[0.04375rem] border-[#dee0e3]">
      <div className="header-surface bg-white/80 backdrop-blur" aria-hidden="true" />
      <div className="nav mx-auto flex h-17.75 w-full max-w-7xl flex-row items-center justify-between gap-8 px-6 lg:px-10">
        <BrandMark /><MainNavigation /><HeaderActions />
      </div>
    </header>
  );
}
