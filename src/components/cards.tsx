import { Boxes, Grid2X2, ImageIcon, Layers3, MessageSquare, PenTool, ShieldCheck, Sparkles, type LucideIcon, ArrowUpRight } from "lucide-react";
import { detailHref } from "@/shared/utils/detail-href.util.ts";
import { AppLink } from "@/shared/ui/links.tsx";
import { IconTile } from "@/shared/ui/icon-tiles.tsx";
import { Card } from "@/shared/ui/cards.tsx";

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

type CardIconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
};

export function CardIcon({ name, size = 22, strokeWidth = 2 }: CardIconProps) {
  const Icon = ICONS[name] ?? ImageIcon;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}

type CardWatermarkProps = {
  name: string;
};

export function CardWatermark({ name }: CardWatermarkProps) {
  return (
    <div className="ph2">
      <CardIcon name={name} size={70} strokeWidth={1.5} />
    </div>
  );
}

type ProductTitleProps = {
  name: string;
};

function ProductTitle({ name }: ProductTitleProps) {
  return (
    <div>
      <h3>{name}</h3>
      <small className="px-1 mt-2">Luilka</small>
    </div>
  );
}

type ProductHeaderProps = {
  name: string;
};

function ProductHeader({ name }: ProductHeaderProps) {
  return (
    <div className="top">
      <IconTile><CardIcon name={name} size={24} /></IconTile>
      <ProductTitle name={name} />
    </div>
  );
}

type ProductCardProps = {
  slug: string;
  name: string;
  description: string;
};

export function ProductCard({ slug, name, description }: ProductCardProps) {
  return (
    <AppLink className="card prod" href={detailHref("products", slug)}>
      <ArrowUpRight className="arrow absolute right-3" size={24} strokeWidth={1.5} aria-hidden="true" />
      <ProductHeader name={name} />
      <p>{description}</p>
      <CardWatermark name={name} />
    </AppLink>
  );
}

type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export function ServiceCard({ slug, title, description, shape }: ServiceCardProps) {
  return (
    <AppLink className="card svc" href={detailHref("services", slug)}>
      <div className="ico" style={shape ? { borderRadius: shape } : undefined}><CardIcon name={title} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </AppLink>
  );
}

type StepTextProps = {
  title: string;
  description: string;
};

function StepText({ title, description }: StepTextProps) {
  return (
    <div className="t p-8">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

type StepCardProps = {
  number: string;
  title: string;
  description: string;
};

export function StepCard({ number, title, description }: StepCardProps) {
  return (
    <Card className="step">
      <StepText title={title} description={description} />
      <div className="n">{number}</div>
    </Card>
  );
}

type WorkWhoProps = {
  name: string;
  kind: string;
};

function WorkWho({ name, kind }: WorkWhoProps) {
  return (
    <div className="who">
      <div className="mini"><CardIcon name={name} size={22} /></div>
      <div><h3>{name}</h3><span>{kind}</span></div>
    </div>
  );
}

type WorkInfoProps = {
  name: string;
  kind: string;
  caseLabel: string;
};

function WorkInfo({ name, kind, caseLabel }: WorkInfoProps) {
  return (
    <div className="info">
      <WorkWho name={name} kind={kind} />
      <span className="pill">{caseLabel}<ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" /></span>
    </div>
  );
}

type WorkCardProps = {
  slug: string;
  name: string;
  kind?: string;
  caseLabel?: string;
};

export function WorkCard({ slug, name, kind = "Particulier", caseLabel = "Cas d'étude" }: WorkCardProps) {
  return (
    <AppLink className="card work" href={detailHref("work", slug)}>
      <CardWatermark name={name} />
      <WorkInfo name={name} kind={kind} caseLabel={caseLabel} />
    </AppLink>
  );
}
