import { ArrowLeft } from "lucide-react";

import type { DetailModel } from "@/shared/types";
import AppLink from "@/shared/ui/link.ui.tsx";

type DetailBackLinkProps = {
  detail: DetailModel;
};

export default function DetailBackLink({ detail }: DetailBackLinkProps) {
  return (
    <AppLink className="btn-outline" href={detail.backHref}>
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />{detail.backLabel}
    </AppLink>
  );
}
