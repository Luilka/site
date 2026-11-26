import type { Language } from "@/shared/types";
import type { Href } from "@nexy/client";

import { localizedHref } from "./locale.i18n.ts";
import { useLanguage } from "./use-language.i18n.ts";

/** Prefixes a path with the language of the page, or with the one asked for. */
export function useLocalizedHref(href: Href, language?: Language): Href {
  const current = useLanguage().language;
  return localizedHref(href, language ?? current);
}
