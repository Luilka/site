import type { Language } from "./dictionaries.ts";
import { useUrlLanguage } from "./locale.ts";

type LanguageValue = {
  language: Language;
};

export function useLanguage(): LanguageValue {
  return { language: useUrlLanguage() };
}
