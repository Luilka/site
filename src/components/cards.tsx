import { BadgeCheck, Blocks, Boxes, Eye, Grid2X2, ImageIcon, Layers3, MessageSquare, PenLine, PenTool, ShieldCheck, Sparkles, Users, type LucideIcon, ArrowUpRight } from "lucide-react";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import { Link } from "@/shared/ui/links.tsx";
import { IconTile } from "@/shared/ui/icon-tiles.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Picture } from "@/shared/ui/images.tsx";
import { StripedPanel } from "@/shared/ui/panels.tsx";
import { initialsOf } from "@/shared/utils/initials.util.ts";
import { coverName } from "@/shared/utils/cover-name.util.ts";
import type { CardCoverProps, CardIconProps, ProductCardProps, ProductHeaderProps, ProductTitleProps, ServiceCardProps, StepCardProps, StepTextProps, TeamCardProps, TeamLabelProps, TeamPortraitProps, ValueCardProps, ValueIconProps, ValueTextProps, WorkCardProps, WorkInfoProps, WorkWhoProps } from "@/shared/types";

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

function CardCover({ image, name, className }: CardCoverProps) {
  return <Picture className={className} image={image} style={{ viewTransitionName: name }} />;
}

export function ProductCard({ slug, name, description, image }: ProductCardProps) {
  return (
    <Link className="min-w-0 relative flex flex-col h-[545px] overflow-hidden rounded-[18px] py-[16px] px-[14px] bg-[linear-gradient(180deg,var(--gray)_0%,var(--gray)_35%,var(--gray-2)_100%)]" href={detailHref("products", slug)}>
      <ArrowUpRight className="absolute right-3 text-[#6a6a74]" size={24} strokeWidth={1.5} aria-hidden="true" />
      <ProductHeader name={name} />
      <p className="text-(length:--text-sm) text-[#55555e] mt-[10px] leading-[1.55]">{description}</p>
      <CardCover className="mt-auto h-[300px] rounded-[12px]" image={image} name={coverName("products", slug)} />
    </Link>
  );
}

export function ServiceCard({ slug, title, description, shape }: ServiceCardProps) {
  return (
    <Link className="min-w-0 text-center py-0 px-[28px] border-l border-l-[var(--border-ui)] first:border-l-0 max-[640px]:border-l-0 max-[640px]:mb-[30px]" href={detailHref("services", slug)}>
      <div className="mx-auto flex items-center justify-center w-[48px] h-[48px] rounded-[50%_50%_50%_8px] bg-gray mb-[22px] text-[#2a2a30]" style={shape ? { borderRadius: shape } : undefined}><CardIcon name={title} /></div>
      <h3 className="text-(length:--text-xl) font-semibold mb-[18px]">{title}</h3>
      <p className="text-(length:--text-base) text-muted leading-[1.9] py-0 px-[6px]">{description}</p>
    </Link>
  );
}

function StepText({ title, description }: StepTextProps) {
  return (
    <div className="p-8">
      <h3 className="text-(length:--text-lg) font-semibold mb-[6px]">{title}</h3>
      <p className="text-(length:--text-sm) text-muted leading-[1.5]">{description}</p>
    </div>
  );
}

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="flex flex-col bg-gray rounded-[18px] p-[4px]">
      <StepText title={title} description={description} />
      <div className="bg-paper border-2 border-paper outline-1 outline-[var(--border-ui)] rounded-[16px] h-[180px] flex items-center justify-center text-[length:96px] font-medium tracking-[-0.02em] mt-auto shadow-[0_2px_8px_rgb(0_0_0/5%)]">{number}</div>
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
    <div className="flex flex-1 items-center justify-between px-[14px]">
      <WorkWho name={name} kind={kind} />
      <span className="pill-shape gap-1.5 border border-muted/50 text-(length:--text-xs) py-[4px] px-[10px] text-text">{caseLabel}<ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" /></span>
    </div>
  );
}

export function WorkCard({ slug, name, kind = "Particulier", caseLabel = "Cas d'étude", image }: WorkCardProps) {
  return (
    <Link className="min-w-0 relative flex flex-col h-[396px] overflow-hidden rounded-[18px] bg-gray" href={detailHref("work", slug)}>
      <CardCover className="h-[324px]" image={image} name={coverName("work", slug)} />
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

function TeamPortrait({ name, image }: TeamPortraitProps) {
  if (image) {
    return <div className="relative flex-1 overflow-hidden rounded-[22px]"><Picture className="absolute inset-0 size-full" image={image} /></div>;
  }
  return <div className="grid flex-1 place-content-center text-(length:--text-3xl) font-semibold text-muted/50" aria-hidden="true">{initialsOf(name)}</div>;
}

function TeamLabel({ name, role }: TeamLabelProps) {
  return (
    <div className="rounded-[18px] bg-paper px-4 py-3">
      <h3 className="text-(length:--text-base) font-semibold">{name}</h3>
      <p className="text-(length:--text-sm) text-muted">{role}</p>
    </div>
  );
}

export function TeamCard({ name, role, image }: TeamCardProps) {
  return (
    <Card className="flex min-h-[26rem] flex-col rounded-[28px] bg-gray p-2">
      <TeamPortrait name={name} image={image} />
      <TeamLabel name={name} role={role} />
    </Card>
  );
}
