import { useId, useState, type FocusEvent } from "react";
import { CalendarDays } from "lucide-react";

import BrandMark from "@/components/patterns/brand-mark.tsx";
import LanguageToggle from "@/components/patterns/language-toggle.tsx";
import NavDropdown from "@/components/patterns/nav-dropdown.tsx";
import AppLink from "@/components/ui/link.tsx";
import { navigation } from "@/i18n";
import { useContent } from "@/i18n";

export default function SiteHeader() {
  const content = useContent();
  const generatedId = useId();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  function closeOnNavBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpenMenu(null);
    }
  }

  return (
    <header className="sticky top-0 z-[13] border-[0.04375rem] border-[#dee0e3] bg-white/60 backdrop-blur">
      <div className="nav mx-auto flex h-[4.4375rem] w-full max-w-[80rem] flex-row items-center justify-between gap-8 px-6 lg:px-10">
        <BrandMark />
        <nav
          className="nav-links"
          aria-label="Navigation principale"
          onMouseLeave={() => setOpenMenu(null)}
          onBlur={closeOnNavBlur}
        >
          {navigation.map((item) => {
            if (item.menu) {
              const menu = item.menu;
              return (
                <NavDropdown
                  key={item.href}
                  id={`menu-${generatedId}-${menu}`}
                  label={item.label}
                  href={item.href}
                  dropdown={content.dropdowns[menu]}
                  open={openMenu === menu}
                  onOpen={() => setOpenMenu(menu)}
                  onClose={() => setOpenMenu(null)}
                />
              );
            }
            return (
              <AppLink key={item.href} href={item.href} onMouseEnter={() => setOpenMenu(null)}>
                {item.label}
              </AppLink>
            );
          })}
        </nav>
        <div className="nav-right">
          <LanguageToggle />
          <AppLink className="btn-outline" href="/contact">
            Contact us
            <CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
          </AppLink>
        </div>
      </div>
    </header>
  );
}
