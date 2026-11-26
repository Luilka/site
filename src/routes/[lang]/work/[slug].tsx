import { DetailRoute } from "@/components/sections.tsx";
import type { DetailRouteProps } from "@/shared/types";

export default function WorkDetail(props: DetailRouteProps) {
  return <DetailRoute kind="work" {...props} />;
}
