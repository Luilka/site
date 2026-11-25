import type { FooterLink } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.tsx";

type FooterColumnProps = {
  title: string;
  links: readonly FooterLink[];
};

export default function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="fcol">
      <h4>{title}</h4>
      {links.map((link) => <AppLink key={link.label} href={link.href}>{link.label}</AppLink>)}
    </div>
  );
}
