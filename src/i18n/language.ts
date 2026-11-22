import { useEffect } from "react";

import type { Language } from "./dictionaries.ts";
import { clientLanguage, legacyRedirectTarget, useCurrentPathname, useUrlLanguage } from "./locale.ts";

type LanguageValue = {
  language: Language;
};

export function useLanguage(): LanguageValue {
  return { language: useUrlLanguage() };
}

export function useLanguageRedirect(): void {
  const pathname = useCurrentPathname();
  const target = legacyRedirectTarget(pathname, clientLanguage());

  useEffect(() => {
    if (target) {
      window.location.replace(target);
    }
  }, [target]);
}
