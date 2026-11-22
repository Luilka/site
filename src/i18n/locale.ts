import { usePathname, type Href } from "@nexy/client";

import type { Language, PageHref } from "./dictionaries.ts";

function isLanguageSegment(segment: string | undefined): segment is Language {
  return segment === "fr" || segment === "en";
}

export function clientLanguage(): Language {
  if (typeof navigator === "undefined") {
    return "fr";
  }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return languages.some((lang) => lang.toLowerCase().startsWith("en")) ? "en" : "fr";
}

export function languageFromPathname(pathname: string): Language {
  const firstSegment = pathname.split("/")[1];
  return firstSegment === "en" ? "en" : "fr";
}

export function pageFromPathname(pathname: string): PageHref | "/" {
  const firstSegment = pathname.split("/")[1];
  if (!isLanguageSegment(firstSegment)) {
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

export function useCurrentPathname(): string {
  return usePathname();
}

export function hasLanguagePrefix(pathname: string): boolean {
  return isLanguageSegment(pathname.split("/")[1]);
}

export function legacyRedirectTarget(pathname: string, language: Language): string | null {
  if (hasLanguagePrefix(pathname)) {
    return null;
  }
  return pathname === "/" ? `/${language}` : `/${language}${pathname}`;
}
