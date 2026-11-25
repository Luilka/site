import MegaCard from "@/components/layout/navigation/mega-card.layout.tsx";
import type { DropdownItem } from "@/shared/i18n";

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
