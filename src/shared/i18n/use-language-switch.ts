import { useContent } from "./use-content.ts";
import { useLanguage } from "./use-language.ts";
import { usePagePathname } from "./locale.ts";

/** Gives what the language toggle needs: the current and the other language. */
export function useLanguageSwitch() {
  const { language } = useLanguage();
  const label = useContent().switchLanguage;
  const page = usePagePathname();
  return { language, next: language === "fr" ? "en" : "fr", label, page } as const;
}
