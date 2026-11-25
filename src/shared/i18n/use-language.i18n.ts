import type { Language } from "./dictionaries.i18n.ts";
import { useUrlLanguage } from "./locale.i18n.ts";

type LanguageValue = {
  language: Language;
};

export function useLanguage(): LanguageValue {
  return { language: useUrlLanguage() };
}
