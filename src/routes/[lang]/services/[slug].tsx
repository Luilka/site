import DetailRoute from "@/components/sections/detail-route";
import type { DetailRouteProps } from "@/shared/types";

export default function ServiceDetail(props: DetailRouteProps) {
  return <DetailRoute kind="services" {...props} />;
}
