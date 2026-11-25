import NotFoundPanel from "@/components/patterns/not-found-panel.tsx";
import DetailPage from "@/components/sections/detail-page.tsx";
import { useDetail } from "@/shared/hooks/use-detail.ts";
import type { DetailKind, DetailRouteProps } from "@/shared/types";

type DetailRouteViewProps = DetailRouteProps & {
  kind: DetailKind;
};

export default function DetailRoute({ kind, lang, slug }: DetailRouteViewProps) {
  const detail = useDetail(kind, lang, slug);
  return detail ? <DetailPage detail={detail} /> : <NotFoundPanel />;
}
