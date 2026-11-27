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

export type DetailModel = {
  eyebrow: string;
  title: string;
  description: string;
  cover?: DetailCover;
  backHref: PageHref;
  backLabel: string;
};

export type DetailSlugs = Record<DetailKind, readonly string[]>;
