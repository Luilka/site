import { usePathname, type Href } from "@nexy/client";

import type { Language, PageHref } from "./dictionaries.i18n.ts";

export function isSupportedLanguage(value: string | undefined): value is Language {
  return value === "fr" || value === "en";
}

export function languageFromPathname(pathname: string): Language {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "en" ? "en" : "fr";
}

export function pageFromPathname(pathname: string): PageHref | "/" {
  const firstSegment = pathname.split("/")[1];
  if (!isSupportedLanguage(firstSegment)) {
    return pathname as PageHref | "/";
  }
  const page = pathname.slice(firstSegment.length + 1);
  return (page || "/") as PageHref | "/";
}

export function localizedHref(href: Href, language: Language): Href {
  if (!href.startsWith("/") || href.startsWith("//")) {
    return href;
  }
  const page = pageFromPathname(href);
  return page === "/" ? (`/${language}` as Href) : (`/${language}${page}` as Href);
}

export function useUrlLanguage(): Language {
  return languageFromPathname(usePathname());
}

export function usePagePathname(): PageHref | "/" {
  return pageFromPathname(usePathname());
}
