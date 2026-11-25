import { dictionaries, type Dictionary, type Language, type PageKey } from "@/shared/i18n/dictionaries.i18n.ts";
import type { DetailKind, DetailModel, DetailSlugs, PageHref } from "@/shared/types";
import slugSource from "./details.json";

export const detailSlugs: DetailSlugs = slugSource;

type RawDetail = {
  slug: string;
  title: string;
  description: string;
  body: string;
  eyebrow?: string;
};

type DetailSpec = {
  page: PageKey;
  backHref: PageHref;
  entries: (content: Dictionary) => readonly RawDetail[];
};

const SPECS: Record<DetailKind, DetailSpec> = {
  blog: {
    page: "blog",
    backHref: "/blog",
    entries: (c) => c.posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, body: p.description, eyebrow: p.meta })),
  },
  work: {
    page: "works",
    backHref: "/works",
    entries: (c) => c.works.map((w) => ({ slug: w.slug, title: w.name, description: w.kind, body: c.section })),
  },
  products: {
    page: "products",
    backHref: "/products",
    entries: (c) => c.products.map((p) => ({ slug: p.slug, title: p.name, description: p.description, body: p.description })),
  },
  services: {
    page: "services",
    backHref: "/services",
    entries: (c) => c.services.map((s) => ({ slug: s.slug, title: s.title, description: s.description, body: s.description })),
  },
};

function toModel(content: Dictionary, spec: DetailSpec, raw: RawDetail): DetailModel {
  const page = content.pages[spec.page];
  const { title, description, body } = raw;
  return { eyebrow: raw.eyebrow ?? page.eyebrow, title, description, body, backHref: spec.backHref, backLabel: page.title };
}

export function isKnownDetailSlug(kind: DetailKind, slug: string | undefined): slug is string {
  return typeof slug === "string" && detailSlugs[kind].includes(slug);
}

export function findDetail(language: Language, kind: DetailKind, slug: string): DetailModel | null {
  const content = dictionaries[language];
  const raw = SPECS[kind].entries(content).find((entry) => entry.slug === slug);
  return raw ? toModel(content, SPECS[kind], raw) : null;
}
