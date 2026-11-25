import type { DetailKind } from "@/shared/types";

/** Builds the path of a detail page, such as /products/tala. */
export function detailHref(kind: DetailKind, slug: string): string {
  return `/${kind}/${slug}`;
}
