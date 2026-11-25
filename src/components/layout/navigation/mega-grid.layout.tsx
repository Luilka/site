import type { DropdownItem } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";
import { ArrowUpRight } from "lucide-react";

type MegaCardTextProps = {
  item: DropdownItem;
};

function MegaCardText({ item }: MegaCardTextProps) {
  return (
    <>
      <span className="mega-card-eyebrow">{item.eyebrow}</span>
      <h3 className="mega-card-title">{item.label}</h3>
      <p className="mega-card-description">{item.description}</p>
      <span className="mega-card-action">{item.action}<ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
    </>
  );
}

type MegaCardProps = {
  item: DropdownItem;
  onClose: () => void;
};

function MegaCard({ item, onClose }: MegaCardProps) {
  return (
    <AppLink className="mega-card" href={item.href} onClick={onClose}>
      <div className="mega-media"><img src={item.image} alt="" /></div>
      <MegaCardText item={item} />
    </AppLink>
  );
}

type MegaGridProps = {
  items: readonly DropdownItem[];
  onClose: () => void;
};

export default function MegaGrid({ items, onClose }: MegaGridProps) {
  return (
    <div className="mega-grid">
      {items.map((item) => <MegaCard key={item.label} item={item} onClose={onClose} />)}
    </div>
  );
}
