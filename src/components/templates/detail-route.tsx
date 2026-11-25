import NotFoundPanel from "@/components/patterns/not-found-panel.tsx";
import { findDetail, isKnownDetailSlug } from "@/content/detail-models.ts";
import DetailPage from "@/components/templates/detail-page.tsx";
import { isSupportedLanguage, useLanguage } from "@/i18n";
import type { DetailKind, DetailRouteProps } from "@/types";

type DetailRouteViewProps = DetailRouteProps & {
  kind: DetailKind;
};

export default function DetailRoute({ kind, lang, slug }: DetailRouteViewProps) {
  const { language } = useLanguage();

  if (!isSupportedLanguage(lang) || !isKnownDetailSlug(kind, slug)) {
    return <NotFoundPanel />;
  }

  const detail = findDetail(language, kind, slug);
  if (!detail) {
    return <NotFoundPanel />;
  }

  return <DetailPage detail={detail} />;
}
