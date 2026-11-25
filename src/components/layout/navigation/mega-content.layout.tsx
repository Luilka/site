import MegaGrid from "@/components/layout/navigation/mega-grid.layout.tsx";
import MegaHead from "@/components/layout/navigation/mega-head.layout.tsx";
import { useContent, type MenuKey } from "@/shared/i18n";

type MegaContentProps = {
  menu: MenuKey;
  onClose: () => void;
};

export default function MegaContent({ menu, onClose }: MegaContentProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <div className="mega-content">
      <MegaHead eyebrow={dropdown.eyebrow} title={dropdown.title} />
      <MegaGrid items={dropdown.items} onClose={onClose} />
    </div>
  );
}
