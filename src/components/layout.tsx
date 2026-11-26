import { AppLink } from "@/shared/ui/links.tsx";
import { useContent, useLanguageSwitch, navigation, type MenuKey } from "@/shared/i18n";
import { Container } from "@/shared/ui/containers.tsx";
import type { FooterLink, DropdownItem, NavigationItem } from "@/shared/i18n";
import { Mail, ChevronDown, CalendarDays, ArrowUpRight, CircleAlert, CircleCheck } from "lucide-react";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";
import { useOpenMenu } from "@/shared/hooks/use-open-menu.hook.ts";
import type { OpenMenu } from "@/shared/hooks/use-open-menu.hook.ts";
import { useId } from "react";
import { useDismiss } from "@/shared/hooks/use-dismiss.hook.ts";
import { useNewsletter } from "@/shared/hooks/use-newsletter.hook.ts";
import { Input } from "@/shared/ui/inputs.tsx";
import type { NewsletterState } from "@/shared/utils/newsletter-state.util.ts";
import { Button } from "@/shared/ui/buttons.tsx";

export function BrandMark() {
  return (
    <AppLink className="logo" href="/" aria-label="Luilka, accueil">
      <svg aria-hidden="true">
        <use href="#finger" />
      </svg>
      Luilka
    </AppLink>
  );
}

function SocialIcons() {
  const { quote } = useContent();
  return (
    <div className="soc">
      <a href={CONTACT_MAILTO} aria-label={quote}>
        <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}

function NewsletterNoScriptForm() {
  const { footer } = useContent();
  return (
    <form action="/" method="post" encType="text/plain">
      <label htmlFor="newsletter-fallback" className="sr-only">{footer.emailLabel}</label>
      <input id="newsletter-fallback" name="email" type="email" required />
      <button type="submit" className="cursor-pointer">{footer.subscribe}</button>
    </form>
  );
}

function NewsletterIntro() {
  const { footer } = useContent();
  return (
    <>
      <h4>{footer.newsletterTitle}</h4>
      <p>{footer.newsletterText}</p>
    </>
  );
}

function NewsletterFallback() {
  return (
    <noscript>
      <NewsletterNoScriptForm />
    </noscript>
  );
}

function FooterNewsletter() {
  return (
    <div className="news">
      <NewsletterIntro />
      <NewsletterForm />
      <NewsletterFallback />
    </div>
  );
}

type FooterColumnProps = {
  title: string;
  links: readonly FooterLink[];
};

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="fcol">
      <h4>{title}</h4>
      {links.map((link) => <AppLink key={link.label} href={link.href}>{link.label}</AppLink>)}
    </div>
  );
}

function FooterColumns() {
  const { footer } = useContent();
  return (
    <>
      <FooterColumn title={footer.linksTitle} links={footer.links} />
      <FooterColumn title={footer.moreTitle} links={footer.more} />
    </>
  );
}

function FooterBrand() {
  const { footer } = useContent();
  return (
    <div className="about-f">
      <BrandMark />
      <p>{footer.description}</p>
      <SocialIcons />
    </div>
  );
}

function FooterCells() {
  return (
    <>
      <FooterBrand />
      <FooterColumns />
      <FooterNewsletter />
    </>
  );
}

function FooterMain() {
  return (
    <footer>
      <Container className="foot">
        <FooterCells />
      </Container>
    </footer>
  );
}

function FooterCopyright() {
  const { footer } = useContent();
  return (
    <div className="copy">
      <Container>{footer.copyright}</Container>
    </div>
  );
}

export function Footer() {
  return (
    <>
      <FooterMain />
      <FooterCopyright />
    </>
  );
}

function MainNavigation() {
  const menu = useOpenMenu();
  const { navigationLabel } = useContent();
  return (
    <nav className="nav-links" aria-label={navigationLabel} onMouseLeave={menu.close} onBlur={menu.onBlur}>
      {navigation.map((item) => <NavEntry key={item.href} item={item} menu={menu} />)}
    </nav>
  );
}

function ContactLink() {
  const { contactAction } = useContent();
  return (
    <AppLink className="btn-outline bg-transparent! border-gray-400!" href="/contact">
      {contactAction}<CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
    </AppLink>
  );
}

function FlagMark() {
  return (
    <span className="flag" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function LanguageToggle() {
  const { language, next, label, page } = useLanguageSwitch();
  return (
    <AppLink className="lang" href={page} language={next} aria-label={label}>
      <FlagMark />{language.toUpperCase()}<ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </AppLink>
  );
}

function HeaderActions() {
  return (
    <div className="nav-right">
      <LanguageToggle />
      <ContactLink />
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-13 border-[0.04375rem] border-[#dee0e3]">
      <div className="header-surface bg-white/80 backdrop-blur" aria-hidden="true" />
      <div className="nav mx-auto flex h-17.75 w-full max-w-7xl flex-row items-center justify-between gap-8 px-6 lg:px-10">
        <BrandMark /><MainNavigation /><HeaderActions />
      </div>
    </header>
  );
}

const PATH =
  "M12 3.75a6.715 6.715 0 0 0-3.722 1.118.75.75 0 1 1-.828-1.25 8.25 8.25 0 0 1 12.8 6.883c0 3.014-.574 5.897-1.62 8.543a.75.75 0 0 1-1.395-.551A21.69 21.69 0 0 0 18.75 10.5 6.75 6.75 0 0 0 12 3.75ZM6.157 5.739a.75.75 0 0 1 .21 1.04A6.715 6.715 0 0 0 5.25 10.5c0 1.613-.463 3.12-1.265 4.393a.75.75 0 0 1-1.27-.8A6.715 6.715 0 0 0 3.75 10.5c0-1.68.503-3.246 1.367-4.55a.75.75 0 0 1 1.04-.211ZM12 7.5a3 3 0 0 0-3 3c0 3.1-1.176 5.927-3.105 8.056a.75.75 0 1 1-1.112-1.008A10.459 10.459 0 0 0 7.5 10.5a4.5 4.5 0 1 1 9 0c0 .547-.022 1.09-.067 1.626a.75.75 0 0 1-1.495-.123c.041-.495.062-.996.062-1.503a3 3 0 0 0-3-3Zm0 2.25a.75.75 0 0 1 .75.75c0 3.908-1.424 7.485-3.781 10.238a.75.75 0 0 1-1.14-.975A14.19 14.19 0 0 0 11.25 10.5a.75.75 0 0 1 .75-.75Zm3.239 5.183a.75.75 0 0 1 .515.927 19.417 19.417 0 0 1-2.585 5.544.75.75 0 0 1-1.243-.84 17.915 17.915 0 0 0 2.386-5.116.75.75 0 0 1 .927-.515Z";

function FingerSymbol() {
  return (
    <symbol id="finger" viewBox="0 0 24 24">
      <path d={PATH} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </symbol>
  );
}

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <FingerSymbol />
      </defs>
    </svg>
  );
}

type MegaCardTextProps = {
  item: DropdownItem;
};

function MegaCardText({ item }: MegaCardTextProps) {
  return (
    <>
      <span className="mega-card-eyebrow">{item.eyebrow}</span>
      <h3 className="mega-card-title">{item.label}</h3>
      <p className="mega-card-description">{item.description}</p>
      <span className="mega-card-action">{item.action}<ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
    </>
  );
}

type MegaCardProps = {
  item: DropdownItem;
  onClose: () => void;
};

function MegaCard({ item, onClose }: MegaCardProps) {
  return (
    <AppLink className="mega-card" href={item.href} onClick={onClose}>
      <div className="mega-media"><img src={item.image} alt="" /></div>
      <MegaCardText item={item} />
    </AppLink>
  );
}

type MegaGridProps = {
  items: readonly DropdownItem[];
  onClose: () => void;
};

export function MegaGrid({ items, onClose }: MegaGridProps) {
  return (
    <div className="mega-grid">
      {items.map((item) => <MegaCard key={item.label} item={item} onClose={onClose} />)}
    </div>
  );
}

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

export function NavEntry({ item, menu }: NavEntryProps) {
  if (!item.menu) return <AppLink href={item.href} onMouseEnter={menu.close}>{item.label}</AppLink>;
  const key = item.menu;
  return <NavDropdown item={item} open={menu.current === key} onOpen={() => menu.open(key)} onClose={menu.close} />;
}

type NewsletterSubmitProps = {
  pending: boolean;
};

function NewsletterSubmit({ pending }: NewsletterSubmitProps) {
  const { footer } = useContent();
  return (
    <Button type="submit" disabled={pending}>
      {footer.subscribe}
      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
    </Button>
  );
}

type NewsletterMessageProps = {
  state: NewsletterState;
};

function NewsletterMessage({ state }: NewsletterMessageProps) {
  if (!state.message) return null;
  const Icon = state.valid ? CircleCheck : CircleAlert;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-sm" role={state.valid ? "status" : "alert"}>
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" />{state.message}
    </p>
  );
}

function NewsletterField() {
  const id = useId();
  const { footer } = useContent();
  return (
    <>
      <label htmlFor={id} className="sr-only">{footer.emailLabel}</label>
      <Input id={id} name="email" type="email" placeholder="pixi@domaine.com" autoComplete="email" />
    </>
  );
}

export function NewsletterForm() {
  const [state, submit, pending] = useNewsletter();
  return (
    <form action={submit} noValidate>
      <NewsletterField />
      <NewsletterSubmit pending={pending} />
      <NewsletterMessage state={state} />
    </form>
  );
}
