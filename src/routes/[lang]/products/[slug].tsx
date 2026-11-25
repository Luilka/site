import DetailRoute from "@/components/templates/detail-route.tsx";
import type { DetailRouteProps } from "@/types";

export default function ProductDetail(props: DetailRouteProps) {
  return <DetailRoute kind="products" {...props} />;
}
