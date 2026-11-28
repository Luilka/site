import type { CSSProperties } from "react";
import { BadgeCheck, Blocks, Boxes, Eye, Grid2X2, ImageIcon, Layers3, MessageSquare, PenLine, PenTool, ShieldCheck, Sparkles, Users, type LucideIcon, ArrowUpRight } from "lucide-react";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import { Link } from "@/shared/ui/links.tsx";
import { IconTile } from "@/shared/ui/icon-tiles.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Picture } from "@/shared/ui/images.tsx";
import { StripedPanel } from "@/shared/ui/panels.tsx";
import { SocialIcon } from "@/shared/ui/social-icons.tsx";
import { useContent } from "@/shared/i18n";
import { githubAvatar, githubProfile } from "@/shared/utils/github.util.ts";
import { initialsOf } from "@/shared/utils/initials.util.ts";
import { profileLabel } from "@/shared/utils/profile-label.util.ts";
import { twoDigits } from "@/shared/utils/two-digits.util.ts";
import { coverName } from "@/shared/utils/cover-name.util.ts";
import type { DetailPosterProps, FactPillProps, FactPillsProps, GalleryCardProps, ParagraphsProps, PointsProps, StoryCardProps, StoryTextProps, CardCoverProps, CardIconProps, ProductCardProps, ProductInfoProps, ProductHeaderProps, ProductTitleProps, ServiceCardProps, StepCardProps, StepTextProps, TeamCardProps, TeamLabelProps, TeamNameProps, TeamPortraitProps, TeamProfileLinkProps, ValueCardProps, ValueIconProps, ValueTextProps, WorkCardProps, WorkInfoProps, WorkWhoProps } from "@/shared/types";

const ICONS: Record<string, LucideIcon> = {
  "UX Design": PenTool,
  "UI design": Sparkles,
  Software: Boxes,
  COM: MessageSquare,
  Tala: Boxes,
  Vuga: Layers3,
  Pro: ShieldCheck,
  Yano: ImageIcon,
  "Vox Congo": Grid2X2,
  Mitemo: Boxes,
  "Privatis Capital Invest": Layers3,
};

export function CardIcon({ name, size = 22, strokeWidth = 2 }: CardIconProps) {
  const Icon = ICONS[name] ?? ImageIcon;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

const GLASS = "absolute inset-x-3 bottom-3 rounded-[14px] border border-paper/60 bg-paper/80 p-3 backdrop-blur-md";

function ProductTitle({ name }: ProductTitleProps) {
  return (
    <div>
      <h3 className="text-(length:--text-xl) font-semibold leading-[1.2]">{name}</h3>
      <small className="px-1 mt-2 text-(length:--text-xs) text-muted block leading-[1]">Luilka</small>
    </div>
  );
}

function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <div className="flex items-start gap-2.5">
      <IconTile><CardIcon name={name} size={24} /></IconTile>
      <ProductTitle name={name} />
    </div>
  );
}

function CardCover({ image, name }: CardCoverProps) {
  return <Picture className="absolute inset-0 size-full" image={image} style={{ viewTransitionName: name }} />;
}

function ProductTop({ name }: ProductHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-2">
      <ProductHeader name={name} />
      <ArrowUpRight className="shrink-0 text-muted" size={22} strokeWidth={1.5} aria-hidden="true" />
    </div>
  );
}

function ProductInfo({ name, description }: ProductInfoProps) {
  return (
    <div className={GLASS}>
      <ProductTop name={name} />
      <p className="mt-3 text-(length:--text-sm) text-muted leading-[1.55]">{description}</p>
    </div>
  );
}

export function ProductCard({ slug, name, description, image }: ProductCardProps) {
  return (
    <Link className="min-w-0 relative block h-[545px] overflow-hidden rounded-[18px] bg-gray max-[640px]:h-[460px]" href={detailHref("products", slug)}>
      <CardCover image={image} name={coverName("products", slug)} />
      <ProductInfo name={name} description={description} />
    </Link>
  );
}

const PURPLE = "radial-gradient(50% 50% at 50% 50%, rgba(144, 140, 248, 0.9) 0%, rgba(54, 48, 242, 0.9) 100%)";
const OCEAN = "radial-gradient(50% 50% at 50% 50%, rgba(140, 248, 182, 0.9) 0%, rgba(11, 87, 168, 0.9) 100%)";
const MINT = "radial-gradient(50% 50% at 50% 50%, rgba(57, 247, 155, 0.9) 0%, rgba(19, 176, 98, 0.9) 100%)";

const SERVICE_TILES: Record<string, CSSProperties> = {
  "UX Design": { background: PURPLE, boxShadow: "0px 4px 24px rgba(54, 48, 242, 0.4)", borderRadius: "99px 0px 99px 99px", color: "var(--paper)" },
  "UI design": { background: OCEAN, boxShadow: "0px 4px 24px rgba(11, 87, 168, 0.4)", borderRadius: "99px", color: "var(--text)" },
  Software: { background: PURPLE, boxShadow: "0px 4px 24px rgba(54, 48, 242, 0.4)", borderRadius: "99px 99px 32px 32px", color: "var(--paper)" },
  COM: { background: MINT, boxShadow: "0px 4px 24px rgba(19, 176, 98, 0.4)", borderRadius: "32px 99px 99px 99px", color: "var(--text)" },
};

export function ServiceCard({ slug, title, description }: ServiceCardProps) {
  return (
    <Link className="min-w-0 text-center py-0 px-[28px] border-l border-l-[var(--border-ui)] first:border-l-0 max-[640px]:border-l-0 max-[640px]:mb-[30px]" href={detailHref("services", slug)}>
      <div className="mx-auto mb-[22px] flex size-[58px] items-center justify-center" style={SERVICE_TILES[title] ?? SERVICE_TILES["UX Design"]}><CardIcon name={title} /></div>
      <h3 className="text-(length:--text-xl) font-semibold mb-[18px]">{title}</h3>
      <p className="text-(length:--text-base) text-muted leading-[1.9] py-0 px-[6px]">{description}</p>
    </Link>
  );
}

function StepText({ title, description }: StepTextProps) {
  return (
    <div className="p-8">
      <h3 className="text-(length:--text-lg) font-semibold mb-[6px]">{title}</h3>
      <p className="text-(length:--text-sm) opacity-85 leading-[1.5]">{description}</p>
    </div>
  );
}

const STEP_TONES: readonly string[] = ["bg-night text-paper", "bg-gold text-night", "bg-gray text-text", "bg-accent text-paper"];

const NUMBER_PANEL = "bg-paper bg-grid text-text border-2 border-paper outline-1 outline-[var(--border-ui)] rounded-[16px] flex items-center justify-center font-medium tracking-[-0.02em] mt-auto shadow-[0_2px_8px_rgb(0_0_0/5%)]";

const STEP_NUMBER = `${NUMBER_PANEL} h-[180px]`;

export function StepCard({ number, title, description, index = 0 }: StepCardProps) {
  return (
    <Card className={`flex flex-col rounded-[18px] p-[4px] ${STEP_TONES[index % STEP_TONES.length]}`}>
      <StepText title={title} description={description} />
      <div className={STEP_NUMBER}><span className="text-[length:96px]">{number}</span></div>
    </Card>
  );
}

function WorkWho({ name, kind }: WorkWhoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex shrink-0 items-center justify-center w-[42px] h-[42px] rounded-[10px] bg-paper text-text"><CardIcon name={name} size={22} /></div>
      <div><h3 className="m-0 text-(length:--text-sm) font-semibold block leading-[1.1]">{name}</h3><span className="text-(length:--text-xs) text-muted block">{kind}</span></div>
    </div>
  );
}

function WorkInfo({ name, kind, caseLabel }: WorkInfoProps) {
  return (
    <div className={`${GLASS} flex items-center justify-between`}>
      <WorkWho name={name} kind={kind} />
      <span className="pill-shape gap-1.5 border border-muted/50 text-(length:--text-xs) py-[4px] px-[10px] text-text">{caseLabel}<ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" /></span>
    </div>
  );
}

export function WorkCard({ slug, name, kind = "Particulier", caseLabel = "Cas d'étude", image }: WorkCardProps) {
  return (
    <Link className="min-w-0 relative block h-[500px] overflow-hidden rounded-[18px] bg-gray max-[640px]:h-[380px]" href={detailHref("work", slug)}>
      <CardCover image={image} name={coverName("work", slug)} />
      <WorkInfo name={name} kind={kind} caseLabel={caseLabel} />
    </Link>
  );
}

const VALUE_ICONS: readonly LucideIcon[] = [Eye, Users, Blocks, PenLine, BadgeCheck];
const VALUE_PLACES: readonly string[] = [
  "min-[641px]:col-span-2 min-[1001px]:col-span-1 min-[1001px]:col-start-2 min-[1001px]:row-span-2 min-[1001px]:row-start-1",
  "min-[1001px]:col-start-1 min-[1001px]:row-start-1",
  "min-[1001px]:col-start-1 min-[1001px]:row-start-2",
  "min-[1001px]:col-start-3 min-[1001px]:row-start-1",
  "min-[1001px]:col-start-3 min-[1001px]:row-start-2",
];
const VALUE_BASE = "flex flex-col justify-between gap-8 p-7";
const VALUE_FEATURED = `${VALUE_BASE} text-paper`;
const VALUE_PLAIN = `${VALUE_BASE} bg-gray rounded-[28px] text-text`;

function ValueIcon({ index, featured }: ValueIconProps) {
  const Icon = VALUE_ICONS[index % VALUE_ICONS.length];
  return (
    <span className={`relative grid size-11 place-content-center rounded-xl ${featured ? "bg-paper/15 text-paper" : "bg-paper text-text"}`}>
      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

function ValueText({ title, description, featured }: ValueTextProps) {
  return (
    <div className="relative">
      <h3 className={featured ? "text-(length:--text-2xl) font-semibold" : "text-(length:--text-xl) font-semibold"}>{title}</h3>
      <p className={`mt-2 text-(length:--text-sm) leading-[1.6] ${featured ? "text-paper/85" : "text-muted"}`}>{description}</p>
    </div>
  );
}

export function ValueCard({ title, description, index }: ValueCardProps) {
  const featured = index === 0;
  const Surface = featured ? StripedPanel : Card;
  return (
    <Surface className={`${featured ? VALUE_FEATURED : VALUE_PLAIN} ${VALUE_PLACES[index] ?? ""}`}>
      <ValueIcon index={index} featured={featured} />
      <ValueText title={title} description={description} featured={featured} />
    </Surface>
  );
}

const PORTRAIT = "relative grid flex-1 place-content-center overflow-hidden rounded-[22px] text-(length:--text-3xl) font-semibold text-muted/50";
const PROFILE_LINK = "row-center justify-center size-11 shrink-0 rounded-full border border-[var(--border-ui)] text-muted hover:bg-soft hover:text-text";

function TeamPortrait({ name, github }: TeamPortraitProps) {
  return (
    <div className={PORTRAIT}>
      <span aria-hidden="true">{initialsOf(name)}</span>
      {github ? <Picture className="absolute inset-0 size-full" image={githubAvatar(github)} referrerPolicy="no-referrer" /> : null}
    </div>
  );
}

function TeamProfileLink({ name, github }: TeamProfileLinkProps) {
  const { aboutPage } = useContent();
  return (
    <a className={PROFILE_LINK} href={githubProfile(github)} aria-label={profileLabel(aboutPage.profileLabel, name)} target="_blank" rel="noopener noreferrer">
      <SocialIcon network="github" className="size-5" />
    </a>
  );
}

function TeamName({ name, role }: TeamNameProps) {
  return (
    <div>
      <h3 className="text-(length:--text-base) font-semibold">{name}</h3>
      <p className="text-(length:--text-sm) text-muted">{role}</p>
    </div>
  );
}

function TeamLabel({ name, role, github }: TeamLabelProps) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[18px] bg-paper px-4 py-3">
      <TeamName name={name} role={role} />
      {github ? <TeamProfileLink name={name} github={github} /> : null}
    </div>
  );
}

export function TeamCard({ name, role, github }: TeamCardProps) {
  return (
    <Card className="flex min-h-[26rem] flex-col rounded-[28px] bg-gray p-2">
      <TeamPortrait name={name} github={github} />
      <TeamLabel name={name} role={role} github={github} />
    </Card>
  );
}

function Paragraphs({ items }: ParagraphsProps) {
  return <>{items.map((text) => <p key={text} className="mt-3 text-(length:--text-sm) opacity-85 leading-[1.6]">{text}</p>)}</>;
}

function Points({ items }: PointsProps) {
  return <ul className="mt-3 flex list-disc flex-col gap-2 pl-5 text-(length:--text-sm) opacity-85 leading-[1.6]">{items.map((text) => <li key={text}>{text}</li>)}</ul>;
}

function StoryText({ section }: StoryTextProps) {
  return (
    <div className="p-8">
      <h2 className="text-(length:--text-lg) font-semibold">{section.title}</h2>
      <Paragraphs items={section.paragraphs} />
      {section.points ? <Points items={section.points} /> : null}
    </div>
  );
}

export function StoryCard({ section, index }: StoryCardProps) {
  return (
    <Card data-part="story-section" className={`flex flex-col rounded-[18px] p-[4px] ${STEP_TONES[index % STEP_TONES.length]}`}>
      <StoryText section={section} />
      <div data-part="story-number" className={`${NUMBER_PANEL} h-[140px]`}><span className="text-[length:72px]">{twoDigits(index)}</span></div>
    </Card>
  );
}

export function GalleryCard({ image, pair }: GalleryCardProps) {
  return (
    <figure className="relative m-0 overflow-hidden rounded-[18px] bg-gray">
      <Picture className={`w-full object-cover ${pair ? "aspect-square" : "aspect-[3/2]"}`} image={image} />
      {image.caption ? <figcaption className={`${GLASS} text-(length:--text-sm) leading-[1.5]`}>{image.caption}</figcaption> : null}
    </figure>
  );
}

function FactPill({ fact }: FactPillProps) {
  return (
    <span data-part="fact" className="pill-shape gap-1.5 border border-muted/50 text-(length:--text-xs) py-[4px] px-[10px] text-text">
      <span className="text-muted">{fact.label}</span>{fact.value}
    </span>
  );
}

function FactPills({ facts }: FactPillsProps) {
  return <div className={`${GLASS} flex flex-wrap gap-2`}>{facts.map((fact) => <FactPill key={fact.label} fact={fact} />)}</div>;
}

export function DetailPoster({ cover, facts }: DetailPosterProps) {
  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-[18px] bg-gray max-[640px]:h-[420px]">
      <Picture className="absolute inset-0 size-full" image={cover} loading="eager" fetchPriority="high" style={{ viewTransitionName: cover.name }} />
      {facts.length > 0 ? <FactPills facts={facts} /> : null}
    </div>
  );
}
