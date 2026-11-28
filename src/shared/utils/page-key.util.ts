import type { PageHref, PageKey } from "@/shared/types";

/** Turns a page address such as /about into the key of its dictionary entry. */
export function pageKey(href: PageHref): PageKey {
  return href.slice(1) as PageKey;
}
