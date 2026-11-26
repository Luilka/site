import { findDetail, isKnownDetailSlug } from "@/content/detail-models.content.ts";
import { isSupportedLanguage, useLanguage } from "@/shared/i18n";
import type { DetailKind, DetailModel } from "@/shared/types";

/** Finds the page model of a detail route, or null when the URL is unknown. */
export function useDetail(kind: DetailKind, lang?: string, slug?: string): DetailModel | null {
  const { language } = useLanguage();
  if (!isSupportedLanguage(lang) || !isKnownDetailSlug(kind, slug)) return null;
  return findDetail(language, kind, slug);
}
