import { DetailRoute } from "@/components/sections.tsx";
import type { DetailRouteProps } from "@/shared/types";

export default function BlogDetail(props: DetailRouteProps) {
  return <DetailRoute kind="blog" {...props} />;
}
