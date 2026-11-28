import type { Language, MetaLink, MetaTag, PageMeta, PageMetaInput } from "@/shared/types";

const LOCALES: Record<Language, string> = { fr: "fr_FR", en: "en_US" };
const OG_IMAGE = "/og-image.webp";
const TWITTER_IMAGE = "/twitter-card.webp";

function absolute(siteUrl: string, path: string): string {
  return siteUrl ? `${siteUrl.replace(/\/$/, "")}${path}` : "";
}

function localePath(language: Language, path: string): string {
  return path === "/" ? `/${language}` : `/${language}${path}`;
}

function fullTitle({ siteName, title, home }: PageMetaInput): string {
  return home ? `${siteName} | ${title}` : `${title} | ${siteName}`;
}

function openGraphImage(siteUrl: string, title: string): MetaTag[] {
  return [
    { property: "og:image", content: absolute(siteUrl, OG_IMAGE) },
    { property: "og:image:type", content: "image/webp" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: title },
  ];
}

function twitterImage(siteUrl: string, title: string): MetaTag[] {
  return [
    { name: "twitter:image", content: absolute(siteUrl, TWITTER_IMAGE) },
    { name: "twitter:image:alt", content: title },
  ];
}

function imageTags(siteUrl: string, title: string): MetaTag[] {
  return [...openGraphImage(siteUrl, title), ...twitterImage(siteUrl, title)];
}

function addressTags(input: PageMetaInput, title: string): MetaTag[] {
  const url = absolute(input.siteUrl, localePath(input.language, input.path));
  return url ? [{ property: "og:url", content: url }, ...imageTags(input.siteUrl, title)] : [];
}

function shareTags(input: PageMetaInput, title: string): MetaTag[] {
  return [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: input.siteName },
    { property: "og:title", content: title },
    { property: "og:description", content: input.description },
    { property: "og:locale", content: LOCALES[input.language] },
  ];
}

function twitterTags(input: PageMetaInput, title: string): MetaTag[] {
  return [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: input.description },
  ];
}

function baseTags(input: PageMetaInput, title: string): MetaTag[] {
  const robots = input.indexable ? "index, follow" : "noindex, nofollow";
  return [{ name: "description", content: input.description }, { name: "robots", content: robots }, ...shareTags(input, title), ...twitterTags(input, title)];
}

function languageLinks(input: PageMetaInput): MetaLink[] {
  const href = (language: Language) => absolute(input.siteUrl, localePath(language, input.path));
  return [
    { rel: "canonical", href: href(input.language) },
    { rel: "alternate", hrefLang: "fr", href: href("fr") },
    { rel: "alternate", hrefLang: "en", href: href("en") },
    { rel: "alternate", hrefLang: "x-default", href: href("fr") },
  ];
}

function organisation(input: PageMetaInput): string | null {
  if (!input.home || !input.siteUrl) return null;
  const data = { "@context": "https://schema.org", "@type": "Organization", name: input.siteName, url: absolute(input.siteUrl, "/"), logo: absolute(input.siteUrl, "/luilka.svg"), description: input.description, sameAs: input.sameAs };
  return JSON.stringify(data);
}

/** Builds the title, the head tags and the structured data of a page. Anything that needs the public address is left out while it is empty. */
export function buildPageMeta(input: PageMetaInput): PageMeta {
  const title = fullTitle(input);
  const links = input.siteUrl ? languageLinks(input) : [];
  return { title, tags: [...baseTags(input, title), ...addressTags(input, title)], links, jsonLd: organisation(input) };
}
