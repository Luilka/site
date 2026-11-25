import type { DetailKind } from "@/shared/types";

import { detailHref } from "./detail-href.ts";

/** Links a card to its detail page when the card has a slug and a detail kind. */
export function infoHref(detail: DetailKind | undefined, item: object): string | undefined {
  if (!detail || !("slug" in item)) return undefined;
  return detailHref(detail, String(item.slug));
}
