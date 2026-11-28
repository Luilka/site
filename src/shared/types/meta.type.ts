import type { Language } from "./site.type.ts";

export type MetaTag = {
  name?: string;
  property?: string;
  content: string;
};

export type MetaLink = {
  rel: string;
  href: string;
  hrefLang?: string;
};

export type PageMeta = {
  title: string;
  tags: readonly MetaTag[];
  links: readonly MetaLink[];
  jsonLd: string | null;
};

export type PageMetaInput = {
  language: Language;
  path: string;
  title: string;
  description: string;
  siteName: string;
  siteUrl: string;
  indexable: boolean;
  home: boolean;
  sameAs: readonly string[];
};

export type PageSubject = {
  path: string;
  title: string;
  description: string;
  home: boolean;
};

export type SiteSettings = {
  url: string;
  indexable: boolean;
};

export type MetaCopy = {
  siteName: string;
  homeTitle: string;
  homeDescription: string;
};
