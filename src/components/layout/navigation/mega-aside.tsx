import { useContent, type MenuKey } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.tsx";

type MegaAsideProps = {
  menu: MenuKey;
  onClose: () => void;
};

export default function MegaAside({ menu, onClose }: MegaAsideProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <aside className="mega-aside">
      <h3>{dropdown.linksTitle}</h3>
      {dropdown.links.map((link) => <AppLink key={link.label} href={link.href} onClick={onClose}>{link.label}</AppLink>)}
    </aside>
  );
}
