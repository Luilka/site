import type { DetailImage } from "@/shared/types";

/** Groups the pictures of a project in rows that alternate one wide picture and a pair. */
export function galleryRows(images: readonly DetailImage[]): DetailImage[][] {
  const rows: DetailImage[][] = [];
  for (let index = 0; index < images.length; index += rows.at(-1)?.length ?? 0) {
    rows.push(images.slice(index, index + (rows.length % 2 === 0 ? 1 : 2)));
  }
  return rows;
}
