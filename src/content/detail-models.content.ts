import { dictionaries } from "@/shared/i18n/dictionaries.i18n.ts";
import type { DetailImage, DetailKind, DetailModel, DetailSlugs, DetailSpec, Dictionary, Language, RawDetail } from "@/shared/types";
import { coverName } from "@/shared/utils/cover-name.util.ts";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import imageSource from "./images.json";
import slugSource from "./details.json";

export const detailSlugs: DetailSlugs = slugSource;

const SPECS: Record<DetailKind, DetailSpec> = {
  blog: {
    page: "blog",
    backHref: "/blog",
    entries: (c) => c.posts.map((p) => ({ slug: p.slug, title: p.title, description: p.description, eyebrow: p.meta })),
  },
  work: {
    page: "works",
    backHref: "/works",
    entries: (c) => c.works.map((w) => ({ slug: w.slug, title: w.name, description: w.kind, image: w.image })),
  },
  products: {
    page: "products",
    backHref: "/products",
    entries: (c) => c.products.map((p) => ({ slug: p.slug, title: p.name, description: p.description, image: p.image })),
  },
  services: {
    page: "services",
    backHref: "/services",
    entries: (c) => c.services.map((s) => ({ slug: s.slug, title: s.title, description: s.description })),
  },
};

function toCover(kind: DetailKind, raw: RawDetail): DetailModel["cover"] {
  return raw.image ? { ...raw.image, name: coverName(kind, raw.slug) } : undefined;
}

function galleryOf(kind: DetailKind, slug: string): DetailModel["gallery"] {
  const gallery = imageSource.gallery as Partial<Record<DetailKind, Record<string, DetailImage[]>>>;
  return gallery[kind]?.[slug] ?? [];
}

function nextOf(content: Dictionary, kind: DetailKind, slug: string): DetailModel["next"] {
  const entries = SPECS[kind].entries(content);
  const following = entries[(entries.findIndex((entry) => entry.slug === slug) + 1) % entries.length];
  if (!following || following.slug === slug) return null;
  return { label: content.detailNext[kind], title: following.title, href: detailHref(kind, following.slug), cover: following.image };
}

function toModel(content: Dictionary, kind: DetailKind, raw: RawDetail): DetailModel {
  const spec = SPECS[kind];
  const page = content.pages[spec.page];
  const { title, description } = raw;
  const base = { eyebrow: raw.eyebrow ?? page.eyebrow, title, description, cover: toCover(kind, raw) };
  return { ...base, gallery: galleryOf(kind, raw.slug), next: nextOf(content, kind, raw.slug), backHref: spec.backHref, backLabel: page.title };
}

export function isKnownDetailSlug(kind: DetailKind, slug: string | undefined): slug is string {
  return typeof slug === "string" && detailSlugs[kind].includes(slug);
}

export function findDetail(language: Language, kind: DetailKind, slug: string): DetailModel | null {
  const content = dictionaries[language];
  const raw = SPECS[kind].entries(content).find((entry) => entry.slug === slug);
  return raw ? toModel(content, kind, raw) : null;
}
