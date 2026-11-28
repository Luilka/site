import { usePathname } from "@nexy/client";
import { useMemo } from "react";
import site from "@/content/site.json";
import social from "@/content/social.json";
import { useContent, useLanguage } from "@/shared/i18n";
import type { Dictionary, Language, PageMeta } from "@/shared/types";
import { buildPageMeta } from "@/shared/utils/page-meta.util.ts";
import { subjectOf } from "@/shared/utils/page-subject.util.ts";
import { useDocumentHead } from "./use-document-head.hook.ts";

const SAME_AS = Object.values(social).filter(Boolean);

function metaFor(pathname: string, language: Language, copy: Dictionary): PageMeta {
  const subject = subjectOf(pathname, language, copy);
  return buildPageMeta({ ...subject, language, siteName: copy.meta.siteName, siteUrl: site.url, indexable: site.indexable, sameAs: SAME_AS });
}

/** The title, head tags and structured data of the page being shown, in its language. They are also written into the live document. */
export function usePageMeta(): PageMeta {
  const copy = useContent();
  const { language } = useLanguage();
  const pathname = usePathname();
  const meta = useMemo(() => metaFor(pathname, language, copy), [pathname, language, copy]);
  useDocumentHead(meta, language);
  return meta;
}
