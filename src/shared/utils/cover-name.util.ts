import type { DetailKind } from "@/shared/types";

/** Names the cover of a work or a product, so its card and its page share one view transition. */
export function coverName(kind: DetailKind, slug: string): string {
  return `cover-${kind}-${slug}`;
}
