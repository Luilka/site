import { useEffect } from "react";
import type { Language, MetaLink, MetaTag, PageMeta } from "@/shared/types";

function tagSelector(tag: MetaTag): string {
  return tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
}

function upsert(selector: string, create: () => HTMLElement, set: (node: HTMLElement) => void): void {
  const node = document.head.querySelector<HTMLElement>(selector) ?? document.head.appendChild(create());
  set(node);
}

function writeTag(tag: MetaTag): void {
  const attribute = tag.name ? "name" : "property";
  upsert(tagSelector(tag), () => document.createElement("meta"), (node) => {
    node.setAttribute(attribute, tag.name ?? tag.property ?? "");
    node.setAttribute("content", tag.content);
  });
}

function linkSelector(link: MetaLink): string {
  return link.hrefLang ? `link[rel="${link.rel}"][hreflang="${link.hrefLang}"]` : `link[rel="${link.rel}"]`;
}

function writeLink(link: MetaLink): void {
  upsert(linkSelector(link), () => document.createElement("link"), (node) => {
    node.setAttribute("rel", link.rel);
    node.setAttribute("href", link.href);
    if (link.hrefLang) node.setAttribute("hreflang", link.hrefLang);
  });
}

/** Keeps the title, the language and the head tags of the document in step with the page shown, because the HTML sent by the server is built once for every address of a route. */
export function useDocumentHead(meta: PageMeta, language: Language): void {
  useEffect(() => {
    document.title = meta.title;
    document.documentElement.lang = language;
    meta.tags.forEach(writeTag);
    meta.links.forEach(writeLink);
  }, [meta, language]);
}
