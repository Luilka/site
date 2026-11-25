import DetailRoute from "@/components/templates/detail-route.tsx";
import type { DetailRouteProps } from "@/types";

export default function BlogDetail(props: DetailRouteProps) {
  return <DetailRoute kind="blog" {...props} />;
}
