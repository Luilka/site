import { dictionaries } from "@/content/site.ts";
import { useLanguage } from "@/contexts/LanguageContext.tsx";

export function useContent() {
  const { language } = useLanguage();
  return dictionaries[language];
}
