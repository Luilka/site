import DetailRoute from "@/components/sections/detail-route";
import type { DetailRouteProps } from "@/shared/types";

export default function WorkDetail(props: DetailRouteProps) {
  return <DetailRoute kind="work" {...props} />;
}
