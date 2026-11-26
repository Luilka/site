import type { PageHref } from "./site.type.ts";
import type { DetailImage } from "./detail.type.ts";
import type { Dictionary, PageKey } from "./dictionaries.type.ts";

export type RawDetail = {
  slug: string;
  title: string;
  description: string;
  image?: DetailImage;
  eyebrow?: string;
};

export type DetailSpec = {
  page: PageKey;
  backHref: PageHref;
  entries: (content: Dictionary) => readonly RawDetail[];
};
