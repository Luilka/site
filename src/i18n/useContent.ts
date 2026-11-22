import { dictionaries } from "./dictionaries.ts";
import { useLanguage } from "./language.ts";

export function useContent() {
  const { language } = useLanguage();
  return dictionaries[language];
}
