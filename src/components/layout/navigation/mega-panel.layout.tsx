import MegaAside from "@/components/layout/navigation/mega-aside.layout.tsx";
import MegaContent from "@/components/layout/navigation/mega-content.layout.tsx";
import type { MenuKey } from "@/shared/i18n";

type MegaPanelProps = {
  id: string;
  menu?: MenuKey;
  open: boolean;
  onClose: () => void;
};

export default function MegaPanel({ id, menu = "services", open, onClose }: MegaPanelProps) {
  return (
    <div id={id} className={`mega-panel${open ? " is-open" : ""}`}>
      <div className="container mega-inner">
        <MegaContent menu={menu} onClose={onClose} />
        <MegaAside menu={menu} onClose={onClose} />
      </div>
    </div>
  );
}
