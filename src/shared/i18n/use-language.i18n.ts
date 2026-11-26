import { useUrlLanguage } from "./locale.i18n.ts";
import type { LanguageValue } from "@/shared/types";

export function useLanguage(): LanguageValue {
  return { language: useUrlLanguage() };
}
