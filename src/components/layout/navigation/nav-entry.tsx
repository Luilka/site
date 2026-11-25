import NavDropdown from "@/components/layout/navigation/nav-dropdown.tsx";
import type { NavigationItem } from "@/shared/i18n";
import type { OpenMenu } from "@/shared/hooks/use-open-menu.ts";
import AppLink from "@/shared/ui/link.tsx";

type NavEntryProps = {
  item: NavigationItem;
  menu: OpenMenu;
};

export default function NavEntry({ item, menu }: NavEntryProps) {
  if (!item.menu) return <AppLink href={item.href} onMouseEnter={menu.close}>{item.label}</AppLink>;
  const key = item.menu;
  return <NavDropdown item={item} open={menu.current === key} onOpen={() => menu.open(key)} onClose={menu.close} />;
}
