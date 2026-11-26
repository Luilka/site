import { dictionaries } from "./dictionaries.i18n.ts";
import { useLanguage } from "./use-language.i18n.ts";

export function useContent() {
  const { language } = useLanguage();
  return dictionaries[language];
}
