import DetailRoute from "@/components/sections/detail-route.section.tsx";
import type { DetailRouteProps } from "@/shared/types";

export default function ProductDetail(props: DetailRouteProps) {
  return <DetailRoute kind="products" {...props} />;
}
