import NavEntry from "@/components/layout/navigation/nav-entry.tsx";
import { navigation, useContent } from "@/shared/i18n";
import { useOpenMenu } from "@/shared/hooks/use-open-menu.ts";

export default function MainNavigation() {
  const menu = useOpenMenu();
  const { navigationLabel } = useContent();
  return (
    <nav className="nav-links" aria-label={navigationLabel} onMouseLeave={menu.close} onBlur={menu.onBlur}>
      {navigation.map((item) => <NavEntry key={item.href} item={item} menu={menu} />)}
    </nav>
  );
}
