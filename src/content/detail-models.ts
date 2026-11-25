import { dictionaries, type Dictionary, type Language } from "@/i18n/dictionaries.ts";
import type { DetailKind, DetailModel, DetailSlugs } from "@/types";
import slugSource from "./details.json";

export const detailSlugs: DetailSlugs = slugSource;

type DetailEntry = {
  slug: string;
  model: DetailModel;
};

const modelFactories: Record<DetailKind, (content: Dictionary) => readonly DetailEntry[]> = {
  blog: (content) =>
    content.posts.map((post) => ({
      slug: post.slug,
      model: {
        eyebrow: post.meta,
        title: post.title,
        description: post.description,
        body: post.description,
        backHref: "/blog",
        backLabel: content.pages.blog.title,
      },
    })),
  work: (content) =>
    content.works.map((work) => ({
      slug: work.slug,
      model: {
        eyebrow: content.pages.works.eyebrow,
        title: work.name,
        description: work.kind,
        body: content.section,
        backHref: "/works",
        backLabel: content.pages.works.title,
      },
    })),
  products: (content) =>
    content.products.map((product) => ({
      slug: product.slug,
      model: {
        eyebrow: content.pages.products.eyebrow,
        title: product.name,
        description: product.description,
        body: product.description,
        backHref: "/products",
        backLabel: content.pages.products.title,
      },
    })),
  services: (content) =>
    content.services.map((service) => ({
      slug: service.slug,
      model: {
        eyebrow: content.pages.services.eyebrow,
        title: service.title,
        description: service.description,
        body: service.description,
        backHref: "/services",
        backLabel: content.pages.services.title,
      },
    })),
};

export function isKnownDetailSlug(kind: DetailKind, slug: string | undefined): slug is string {
  return typeof slug === "string" && detailSlugs[kind].includes(slug);
}

export function findDetail(language: Language, kind: DetailKind, slug: string): DetailModel | null {
  return modelFactories[kind](dictionaries[language]).find((entry) => entry.slug === slug)?.model ?? null;
}
