import { ArrowUpRight } from "lucide-react";

import type { DropdownItem } from "@/shared/i18n";

type MegaCardTextProps = {
  item: DropdownItem;
};

export default function MegaCardText({ item }: MegaCardTextProps) {
  return (
    <>
      <span className="mega-card-eyebrow">{item.eyebrow}</span>
      <h3 className="mega-card-title">{item.label}</h3>
      <p className="mega-card-description">{item.description}</p>
      <span className="mega-card-action">{item.action}<ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
    </>
  );
}
