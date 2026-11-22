import { Link as NexyLink, type Href, type LinkProps } from "@nexy/client";

import type { Language } from "@/i18n";
import { useLanguage } from "@/i18n";
import { cn } from "@/lib/cn.ts";
import { localizedHref } from "@/i18n";

type AppLinkProps = Omit<LinkProps, "href"> & {
  href: Href;
  language?: Language;
};

export default function AppLink({ className, children, href, language, ...props }: AppLinkProps) {
  const { language: currentLanguage } = useLanguage();
  const targetLanguage = language ?? currentLanguage;
  return (
    <NexyLink
      className={cn("app-link cursor-pointer", className)}
      href={localizedHref(href, targetLanguage)}
      {...props}
    >
      {children}
    </NexyLink>
  );
}
