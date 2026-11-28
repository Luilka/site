import type { DetailImage, DetailSection, StoryBlock } from "@/shared/types";

/** Pairs each text section with the row of pictures that follows it, then keeps the rows or sections left over. */
export function storyBlocks(sections: readonly DetailSection[], rows: readonly (readonly DetailImage[])[]): StoryBlock[] {
  const count = Math.max(sections.length, rows.length);
  return Array.from({ length: count }, (_, index) => ({ section: sections[index], row: rows[index] }));
}
