import { useId } from "react";

import MegaPanel from "@/components/layout/navigation/mega-panel.layout.tsx";
import NavTrigger from "@/components/layout/navigation/nav-trigger.layout.tsx";
import { useDismiss } from "@/shared/hooks/use-dismiss.hook.ts";
import type { NavigationItem } from "@/shared/i18n";

type NavDropdownProps = {
  item: NavigationItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function NavDropdown({ item, open, onOpen, onClose }: NavDropdownProps) {
  const id = useId();
  const dismiss = useDismiss(onClose);
  return (
    <div className="nav-item" onMouseEnter={onOpen} onFocus={onOpen} {...dismiss}>
      <NavTrigger item={item} id={id} open={open} />
      <MegaPanel id={id} menu={item.menu} open={open} onClose={onClose} />
    </div>
  );
}
