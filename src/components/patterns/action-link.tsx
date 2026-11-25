import { ArrowUpRight } from "lucide-react";

import type { SectionAction } from "@/shared/i18n";
import { buttonClasses } from "@/shared/ui/button.tsx";
import AppLink from "@/shared/ui/link.tsx";

type ActionLinkProps = {
  action: SectionAction;
  className?: string;
};

export default function ActionLink({ action, className }: ActionLinkProps) {
  return (
    <AppLink className={buttonClasses("outline", className)} href={action.href}>
      {action.label}
      <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
    </AppLink>
  );
}
