import DetailRoute from "@/components/templates/detail-route.tsx";
import type { DetailRouteProps } from "@/types";

export default function ServiceDetail(props: DetailRouteProps) {
  return <DetailRoute kind="services" {...props} />;
}
