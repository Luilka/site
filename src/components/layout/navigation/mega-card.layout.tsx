import MegaCardText from "@/components/layout/navigation/mega-card-text.layout.tsx";
import type { DropdownItem } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

type MegaCardProps = {
  item: DropdownItem;
  onClose: () => void;
};

export default function MegaCard({ item, onClose }: MegaCardProps) {
  return (
    <AppLink className="mega-card" href={item.href} onClick={onClose}>
      <div className="mega-media"><img src={item.image} alt="" /></div>
      <MegaCardText item={item} />
    </AppLink>
  );
}
