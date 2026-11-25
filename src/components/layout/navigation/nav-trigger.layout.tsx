import { ChevronDown } from "lucide-react";

import type { NavigationItem } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

type NavTriggerProps = {
  item: NavigationItem;
  id: string;
  open: boolean;
};

export default function NavTrigger({ item, id, open }: NavTriggerProps) {
  return (
    <AppLink className="nav-trigger" href={item.href} aria-haspopup="true" aria-expanded={open} aria-controls={id}>
      {item.label}
      <ChevronDown size={16} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}
