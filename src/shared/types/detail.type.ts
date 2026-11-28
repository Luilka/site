import type { DetailFact, DetailSection } from "./content.type.ts";
import type { PageHref } from "./site.type.ts";

export type DetailKind = "blog" | "work" | "products" | "services";

export type DetailRouteProps = {
  lang?: string;
  slug?: string;
};

export type DetailImage = {
  src: string;
  width: number;
  height: number;
};

export type DetailCover = DetailImage & {
  name: string;
};

export type CaptionedImage = DetailImage & {
  caption?: string;
};

export type DetailNext = {
  label: string;
  title: string;
  href: string;
  cover?: DetailImage;
};

export type DetailModel = {
  facts: readonly DetailFact[];
  sections: readonly DetailSection[];
  eyebrow: string;
  title: string;
  description: string;
  cover?: DetailCover;
  gallery: readonly CaptionedImage[];
  next: DetailNext | null;
  backHref: PageHref;
  backLabel: string;
};

export type DetailSlugs = Record<DetailKind, readonly string[]>;
