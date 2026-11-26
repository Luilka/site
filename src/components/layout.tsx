import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { Link } from "@/shared/ui/links.tsx";
import { useContent, useLanguageSwitch, useNavigation } from "@/shared/i18n";
import { Container } from "@/shared/ui/containers.tsx";
import { Mail, Menu, X, ChevronDown, CalendarDays, ArrowUpRight, CircleAlert, CircleCheck } from "lucide-react";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";
import { useOpenMenu } from "@/shared/hooks/use-open-menu.hook.ts";
import { useId } from "react";
import { useDismiss } from "@/shared/hooks/use-dismiss.hook.ts";
import { useCopyright } from "@/shared/hooks/use-copyright.hook.ts";
import { useMobileMenu } from "@/shared/hooks/use-mobile-menu.hook.ts";
import { useNewsletter } from "@/shared/hooks/use-newsletter.hook.ts";
import { Image } from "@/shared/ui/images.tsx";
import { Logo } from "@/shared/ui/logos.tsx";
import { Input } from "@/shared/ui/inputs.tsx";
import type { FooterColumnProps, MegaAsideProps, MegaCardProps, MegaCardTextProps, MegaContentProps, MegaGridProps, MegaHeadProps, MegaPanelProps, MobileMenuButtonProps, MobileMenuLinkProps, MobileMenuLinksProps, MobileMenuPanelProps, NavDropdownProps, NavEntryProps, NavTriggerProps, NewsletterMessageProps, NewsletterSubmitProps } from "@/shared/types";

const NAV_ITEM = "inline-flex items-center gap-1 rounded-lg min-h-[2.75rem] py-[0.5rem] px-[0.75rem] text-[#2a2a30] transition-[color,background-color] duration-160 ease-[ease] hover:text-blue hover:bg-soft";
const NEWS_FORM = "flex gap-1.5 border border-[var(--border-ui)] rounded-[13px] p-[4px]";
const NEWS_INPUT = "min-w-0 flex-1 border-0 outline-0 [font-family:inherit] leading-[inherit] text-(length:--text-sm) py-0 px-[10px]";
const NEWS_BUTTON = "flex items-center gap-1.5 bg-[var(--night)] text-paper border-0 rounded-[10px] py-[9px] px-[14px] text-(length:--text-sm) font-medium";
const MEGA_PANEL = "fixed left-0 right-0 z-12 bg-white/80 backdrop-blur top-[4.4375rem] border-y border-y-[var(--border-ui)] shadow-[0_18px_40px_rgb(0_0_0/12%)] transition-[opacity,transform,visibility] duration-160 ease-[ease] motion-reduce:transition-none";
const MEGA_CLOSED = "opacity-0 invisible [transform:translateY(-0.375rem)] pointer-events-none";
const MEGA_OPEN = "opacity-100 visible [transform:translateY(0)] pointer-events-auto";
const MOBILE_BUTTON = "row-center justify-center size-11 rounded-lg cursor-pointer text-[#2a2a30] hover:bg-soft";
const MOBILE_PANEL = "fixed inset-x-0 top-[4.4375rem] z-12 max-h-[calc(100dvh-4.4375rem)] overflow-y-auto border-y border-y-[var(--border-ui)] bg-white py-2 shadow-[0_18px_40px_rgb(0_0_0/12%)]";
const MOBILE_LINK = "flex min-h-[3rem] items-center px-6 text-(length:--text-lg) font-medium text-[#2a2a30] hover:bg-soft hover:text-blue";

export function BrandMark() {
  const { homeLabel } = useContent();
  return (
    <Link className="row-center gap-[6px] font-semibold text-(length:--text-lg)" href="/" aria-label={homeLabel}>
      <Logo className="size-6" />
      Luilka
    </Link>
  );
}

function SocialIcons() {
  const { quote } = useContent();
  return (
    <div className="flex gap-3 text-muted">
      <a href={CONTACT_MAILTO} aria-label={quote}>
        <Mail size={18} strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  );
}

function NewsletterNoScriptForm() {
  const { footer } = useContent();
  return (
    <form className={NEWS_FORM} action="/" method="post" encType="text/plain">
      <label htmlFor="newsletter-fallback" className="sr-only">{footer.emailLabel}</label>
      <input id="newsletter-fallback" name="email" type="email" required className={NEWS_INPUT} />
      <button type="submit" className={`cursor-pointer ${NEWS_BUTTON}`}>{footer.subscribe}</button>
    </form>
  );
}

function NewsletterIntro() {
  const { footer } = useContent();
  return (
    <>
      <h4 className="text-[length:16px] font-semibold mb-[12px]">{footer.newsletterTitle}</h4>
      <p className="text-(length:--text-sm) text-muted mb-[22px] max-w-[300px]">{footer.newsletterText}</p>
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
    <div className="max-[1000px]:col-span-2">
      <NewsletterIntro />
      <NewsletterForm />
      <NewsletterFallback />
    </div>
  );
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-[length:16px] font-semibold mb-[12px]">{title}</h4>
      {links.map((link) => <Link key={link.label} className="block text-(length:--text-sm) text-muted mb-[12px]" href={link.href}>{link.label}</Link>)}
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
    <div className="max-[1000px]:col-span-2">
      <BrandMark />
      <p className="text-(length:--text-sm) text-muted mt-[22px] mb-[24px] max-w-[300px] leading-[1.55]">{footer.description}</p>
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
    <footer className="pt-[60px] pb-[40px]">
      <Container className="grid items-start grid-cols-[1.4fr_0.5fr_0.5fr_1.1fr] gap-[40px] max-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <FooterCells />
      </Container>
    </footer>
  );
}

function FooterCopyright() {
  const copyright = useCopyright();
  return (
    <div className="bg-[#e9e9ee] py-[16px] px-0 text-(length:--text-sm) text-[#555]">
      <div className="container mx-auto px-[32px]">{copyright}</div>
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
  const navigation = useNavigation();
  const { navigationLabel } = useContent();
  return (
    <nav className="row-center self-stretch gap-[0.5rem] text-(length:--text-base) font-medium ml-0 max-[1140px]:hidden" aria-label={navigationLabel} onMouseLeave={menu.close} onBlur={menu.onBlur}>
      {navigation.map((item) => <NavEntry key={item.href} item={item} menu={menu} />)}
    </nav>
  );
}

function ContactLink() {
  const { contactAction } = useContent();
  return (
    <Link className={buttonClasses("outline", "bg-transparent! border-gray-400! max-[440px]:size-11 max-[440px]:justify-center max-[440px]:p-0")} href="/contact">
      <span className="max-[440px]:sr-only">{contactAction}</span><CalendarDays size={14} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}

function FlagMark() {
  return (
    <span className="inline-flex items-center w-[14px] h-[10px] rounded-[2px] overflow-hidden" aria-hidden="true">
      <i className="flex-1 bg-[var(--flag-blue)]" />
      <i className="flex-1 bg-paper border border-[#eee]" />
      <i className="flex-1 bg-[var(--flag-red)]" />
    </span>
  );
}

function LanguageToggle() {
  const { language, next, label, page } = useLanguageSwitch();
  return (
    <Link className="row-center gap-[4px] text-(length:--text-sm) font-medium" href={page} language={next} aria-label={label}>
      <FlagMark />{language.toUpperCase()}<ChevronDown size={14} strokeWidth={2.5} aria-hidden="true" />
    </Link>
  );
}

function MobileMenuLink({ item, onClose }: MobileMenuLinkProps) {
  return (
    <li>
      <Link className={MOBILE_LINK} href={item.href} onClick={onClose}>{item.label}</Link>
    </li>
  );
}

function MobileMenuLinks({ onClose }: MobileMenuLinksProps) {
  const navigation = useNavigation();
  return (
    <ul>
      {navigation.map((item) => <MobileMenuLink key={item.href} item={item} onClose={onClose} />)}
    </ul>
  );
}

function MobileMenuContact({ onClose }: MobileMenuLinksProps) {
  const { contactAction } = useContent();
  return (
    <div className="px-6 pt-3 pb-4">
      <Link className={buttonClasses("dark", "w-full justify-center")} href="/contact" onClick={onClose}>{contactAction}</Link>
    </div>
  );
}

function MobileMenuPanel({ id, open, onClose }: MobileMenuPanelProps) {
  const { mobileNavigationLabel } = useContent();
  return (
    <nav id={id} className={MOBILE_PANEL} hidden={!open} aria-label={mobileNavigationLabel}>
      <MobileMenuLinks onClose={onClose} />
      <MobileMenuContact onClose={onClose} />
    </nav>
  );
}

function MobileMenuButton({ id, menu }: MobileMenuButtonProps) {
  const { menuLabel } = useContent();
  const Icon = menu.open ? X : Menu;
  return (
    <button ref={menu.trigger} type="button" className={MOBILE_BUTTON} aria-expanded={menu.open} aria-controls={id} aria-label={menuLabel} onClick={menu.toggle}>
      <Icon size={24} strokeWidth={1.8} aria-hidden="true" />
    </button>
  );
}

function MobileMenu() {
  const id = useId();
  const menu = useMobileMenu();
  return (
    <div className="min-[1140px]:hidden" onBlur={menu.onBlur} onKeyDown={menu.onKeyDown}>
      <MobileMenuButton id={id} menu={menu} />
      <MobileMenuPanel id={id} open={menu.open} onClose={menu.close} />
    </div>
  );
}

function HeaderActions() {
  return (
    <div className="row-center gap-[36px] ml-auto max-[1140px]:gap-[16px]">
      <LanguageToggle />
      <ContactLink />
      <MobileMenu />
    </div>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-13 border-[0.04375rem] border-[#dee0e3]">
      <div className="absolute inset-0 -z-1 bg-white/80 backdrop-blur" aria-hidden="true" />
      <div className="isolate mx-auto flex h-17.75 w-full max-w-7xl flex-row items-center justify-between gap-3 px-6 min-[641px]:gap-8 lg:px-10">
        <BrandMark /><MainNavigation /><HeaderActions />
      </div>
    </header>
  );
}

function MegaCardText({ item }: MegaCardTextProps) {
  return (
    <>
      <span className="uppercase text-(length:--text-xs) font-semibold tracking-[0.06em] text-muted">{item.eyebrow}</span>
      <h3 className="[margin:0.15rem_0_0.35rem] text-(length:--text-base) font-semibold leading-[1.25] group-hover:text-blue">{item.label}</h3>
      <p className="m-0 text-(length:--text-xs) text-muted leading-[1.45]">{item.description}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-(length:--text-xs) font-semibold text-blue">{item.action}<ArrowUpRight size={12} strokeWidth={2} aria-hidden="true" /></span>
    </>
  );
}

function MegaCard({ item, onClose }: MegaCardProps) {
  return (
    <Link className="group flex flex-col text-[#2a2a30] no-underline" href={item.href} onClick={onClose}>
      <div className="mb-3 overflow-hidden h-[12rem] rounded-[0.75rem] bg-soft"><Image className="h-full w-full object-cover" src={item.image} alt="" width={320} height={320} /></div>
      <MegaCardText item={item} />
    </Link>
  );
}

export function MegaGrid({ items, onClose }: MegaGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(13rem,_1fr))] gap-[1rem]">
      {items.map((item) => <MegaCard key={item.label} item={item} onClose={onClose} />)}
    </div>
  );
}

function NavTrigger({ item, id, open }: NavTriggerProps) {
  return (
    <Link className={`${NAV_ITEM} [&_svg]:transition-transform aria-expanded:[&_svg]:[transform:rotate(180deg)]`} href={item.href} aria-haspopup="true" aria-expanded={open} aria-controls={id}>
      {item.label}
      <ChevronDown size={16} strokeWidth={2.5} aria-hidden="true" />
    </Link>
  );
}

function MegaHead({ eyebrow, title }: MegaHeadProps) {
  return (
    <div className="mb-5">
      <span className="block uppercase text-(length:--text-xs) font-semibold tracking-[0.08em] text-blue">{eyebrow}</span>
      <h2 className="[margin:0.25rem_0_0] text-(length:--text-xl) font-semibold leading-[1.2]">{title}</h2>
    </div>
  );
}

function MegaContent({ menu, onClose }: MegaContentProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <div className="min-w-0 flex-1">
      <MegaHead eyebrow={dropdown.eyebrow} title={dropdown.title} />
      <MegaGrid items={dropdown.items} onClose={onClose} />
    </div>
  );
}

function MegaAside({ menu, onClose }: MegaAsideProps) {
  const dropdown = useContent().dropdowns[menu];
  return (
    <aside className="flex w-56 shrink-0 flex-col border-l border-l-[var(--border-ui)] pl-[1.75rem]">
      <h3 className="m-0 pb-2 text-(length:--text-sm) font-semibold">{dropdown.linksTitle}</h3>
      {dropdown.links.map((link) => <Link key={link.label} className="block py-2 text-(length:--text-sm) text-[#2a2a30] no-underline hover:text-blue [a+&]:border-t [a+&]:border-t-[var(--border-ui)]" href={link.href} onClick={onClose}>{link.label}</Link>)}
    </aside>
  );
}

function MegaPanel({ id, menu = "services", open, onClose }: MegaPanelProps) {
  return (
    <div id={id} className={`${MEGA_PANEL} ${open ? MEGA_OPEN : MEGA_CLOSED}`}>
      <Container className="flex items-stretch gap-8 pt-[1.5rem] pb-[1.75rem]">
        <MegaContent menu={menu} onClose={onClose} />
        <MegaAside menu={menu} onClose={onClose} />
      </Container>
    </div>
  );
}

function NavDropdown({ item, open, onOpen, onClose }: NavDropdownProps) {
  const id = useId();
  const dismiss = useDismiss(onClose);
  return (
    <div className="relative flex items-center" onMouseEnter={onOpen} onFocus={onOpen} {...dismiss}>
      <NavTrigger item={item} id={id} open={open} />
      <MegaPanel id={id} menu={item.menu} open={open} onClose={onClose} />
    </div>
  );
}

export function NavEntry({ item, menu }: NavEntryProps) {
  if (!item.menu) return <Link className={NAV_ITEM} href={item.href} onMouseEnter={menu.close}>{item.label}</Link>;
  const key = item.menu;
  return <NavDropdown item={item} open={menu.current === key} onOpen={() => menu.open(key)} onClose={menu.close} />;
}

function NewsletterSubmit({ pending }: NewsletterSubmitProps) {
  const { footer } = useContent();
  return (
    <button type="submit" className={NEWS_BUTTON} disabled={pending}>
      {footer.subscribe}
      <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
    </button>
  );
}

function NewsletterMessage({ state }: NewsletterMessageProps) {
  if (!state.message) return null;
  const Icon = state.valid ? CircleCheck : CircleAlert;
  return (
    <p className="mt-2 flex items-center gap-1.5 text-(length:--text-sm) text-muted mb-[22px] max-w-[300px]" role={state.valid ? "status" : "alert"}>
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
      <Input id={id} className={NEWS_INPUT} name="email" type="email" placeholder={footer.emailPlaceholder} autoComplete="email" />
    </>
  );
}

export function NewsletterForm() {
  const [state, submit, pending] = useNewsletter();
  return (
    <form className={NEWS_FORM} action={submit} noValidate>
      <NewsletterField />
      <NewsletterSubmit pending={pending} />
      <NewsletterMessage state={state} />
    </form>
  );
}
