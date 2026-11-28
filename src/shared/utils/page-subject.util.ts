import { findDetail } from "@/content/detail-models.content.ts";
import type { DetailKind, Dictionary, Language, PageKey, PageSubject } from "@/shared/types";

const PAGE_KEYS: readonly string[] = ["about", "services", "products", "works", "blog", "job", "contact"];
const DETAIL_KINDS: readonly string[] = ["work", "products", "services", "blog"];

function homeSubject(copy: Dictionary): PageSubject {
  return { path: "/", title: copy.meta.homeTitle, description: copy.meta.homeDescription, home: true };
}

function detailSubject(language: Language, section: string, slug: string | undefined): PageSubject | null {
  const detail = DETAIL_KINDS.includes(section) ? findDetail(language, section as DetailKind, slug ?? "") : null;
  return detail ? { path: `/${section}/${slug}`, title: detail.title, description: detail.description, home: false } : null;
}

function pageSubject(copy: Dictionary, key: PageKey): PageSubject {
  const { title, description } = copy.pages[key];
  return { path: `/${key}`, title, description, home: false };
}

/** Says what a page address is about: the home page, a page of the site, or one case, product, service or post. */
export function subjectOf(pathname: string, language: Language, copy: Dictionary): PageSubject {
  const [, , section = "", slug] = pathname.split("/");
  const detail = detailSubject(language, section, slug);
  if (detail) return detail;
  return PAGE_KEYS.includes(section) ? pageSubject(copy, section as PageKey) : homeSubject(copy);
}
