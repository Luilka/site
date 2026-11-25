import type { PageHref } from "./site.ts";

export type DetailKind = "blog" | "work" | "products" | "services";

export type DetailRouteProps = {
  lang?: string;
  slug?: string;
};

export type DetailModel = {
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  backHref: PageHref;
  backLabel: string;
};

export type DetailSlugs = Record<DetailKind, readonly string[]>;
