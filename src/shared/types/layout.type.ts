import type { DropdownItem, FooterLink, MenuKey, NavigationItem } from "./dictionaries.type.ts";
import type { MobileMenuState, OpenMenu } from "./hooks.type.ts";
import type { NewsletterState } from "./utils.type.ts";

export type FooterColumnProps = {
  title: string;
  links: readonly FooterLink[];
};

export type MegaCardTextProps = {
  item: DropdownItem;
};

export type MegaCardProps = {
  item: DropdownItem;
  onClose: () => void;
};

export type MegaGridProps = {
  items: readonly DropdownItem[];
  onClose: () => void;
};

export type NavTriggerProps = {
  item: NavigationItem;
  id: string;
  open: boolean;
};

export type MegaHeadProps = {
  eyebrow: string;
  title: string;
};

export type MegaContentProps = {
  menu: MenuKey;
  onClose: () => void;
};

export type MegaAsideProps = {
  menu: MenuKey;
  onClose: () => void;
};

export type MegaPanelProps = {
  id: string;
  menu?: MenuKey;
  open: boolean;
  onClose: () => void;
};

export type NavDropdownProps = {
  item: NavigationItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type NavEntryProps = {
  item: NavigationItem;
  menu: OpenMenu;
};

export type MobileMenuLinkProps = {
  item: NavigationItem;
  onClose: () => void;
};

export type MobileMenuLinksProps = {
  onClose: () => void;
};

export type MobileMenuPanelProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

export type MobileMenuButtonProps = {
  id: string;
  menu: MobileMenuState;
};

export type NewsletterSubmitProps = {
  pending: boolean;
};

export type NewsletterMessageProps = {
  state: NewsletterState;
};
