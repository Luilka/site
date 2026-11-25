import type { NavigationItem } from "@/shared/i18n";
import type { OpenMenu } from "@/shared/hooks/use-open-menu.hook.ts";
import AppLink from "@/shared/ui/link.ui.tsx";
import { useId } from "react";
import { useDismiss } from "@/shared/hooks/use-dismiss.hook.ts";
import { useContent, type MenuKey } from "@/shared/i18n";
import MegaGrid from "@/components/layout/navigation/mega-grid.layout.tsx";
import { ChevronDown } from "lucide-react";

type NavTriggerProps = {
  item: NavigationItem;
  id: string;
  open: boolean;
};

function NavTrigger({ item, id, open }: NavTriggerProps) {
  return (
    <AppLink className="nav-trigger" href={item.href} aria-haspopup="true" aria-expanded={open} aria-controls={id}>
      {item.label}
      <ChevronDown size={16} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}

type MegaHeadProps = {
  eyebrow: string;
  title: string;
};

function MegaHead({ eyebrow, title }: MegaHeadProps) {
  return (
    <div className="mega-head">
      <span className="mega-eyebrow">{eyebrow}</span>
      <h2 className="mega-title">{title}</h2>
    </div>
  );
}

type MegaContentProps = {
  menu: MenuKey;
  onClose: () => void;
};

function MegaContent({ menu, onClose }: MegaContentProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <div className="mega-content">
      <MegaHead eyebrow={dropdown.eyebrow} title={dropdown.title} />
      <MegaGrid items={dropdown.items} onClose={onClose} />
    </div>
  );
}

type MegaAsideProps = {
  menu: MenuKey;
  onClose: () => void;
};

function MegaAside({ menu, onClose }: MegaAsideProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <aside className="mega-aside">
      <h3>{dropdown.linksTitle}</h3>
      {dropdown.links.map((link) => <AppLink key={link.label} href={link.href} onClick={onClose}>{link.label}</AppLink>)}
    </aside>
  );
}

type MegaPanelProps = {
  id: string;
  menu?: MenuKey;
  open: boolean;
  onClose: () => void;
};

function MegaPanel({ id, menu = "services", open, onClose }: MegaPanelProps) {
  return (
    <div id={id} className={`mega-panel${open ? " is-open" : ""}`}>
      <div className="container mega-inner">
        <MegaContent menu={menu} onClose={onClose} />
        <MegaAside menu={menu} onClose={onClose} />
      </div>
    </div>
  );
}

type NavDropdownProps = {
  item: NavigationItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

function NavDropdown({ item, open, onOpen, onClose }: NavDropdownProps) {
  const id = useId();
  const dismiss = useDismiss(onClose);
  return (
    <div className="nav-item" onMouseEnter={onOpen} onFocus={onOpen} {...dismiss}>
      <NavTrigger item={item} id={id} open={open} />
      <MegaPanel id={id} menu={item.menu} open={open} onClose={onClose} />
    </div>
  );
}

type NavEntryProps = {
  item: NavigationItem;
  menu: OpenMenu;
};

export default function NavEntry({ item, menu }: NavEntryProps) {
  if (!item.menu) return <AppLink href={item.href} onMouseEnter={menu.close}>{item.label}</AppLink>;
  const key = item.menu;
  return <NavDropdown item={item} open={menu.current === key} onOpen={() => menu.open(key)} onClose={menu.close} />;
}
