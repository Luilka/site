import { Container } from "@/shared/ui/containers.tsx";
import { ActionLink, Breadcrumb, ContactPanel, PageHero, PageLead, PageTitle, NotFoundPanel } from "@/components/patterns.tsx";
import type { SectionProps } from "@/shared/types/section-props.type.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { AboutHeroProps, AboutSectionProps, AboutTextProps, BandProps, CardGridProps, CollectionSectionProps, DetailBackLinkProps, DetailBodyProps, DetailMediaProps, DetailPageProps, DetailRouteViewProps, HeadingTextProps, InfoCard, InfoCardBodyProps, InfoCardProps, InfoSectionProps, MissionDetailsProps, MissionSectionProps, ProcessSectionProps, SectionHeadingProps, TeamGridProps, TeamSectionProps, ValueGridProps, ValuesSectionProps } from "@/shared/types";
import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { Link } from "@/shared/ui/links.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Picture } from "@/shared/ui/images.tsx";
import { Logo } from "@/shared/ui/logos.tsx";
import { Badge } from "@/shared/ui/badges.tsx";
import { StepCard, ProductCard, ServiceCard, TeamCard, ValueCard, WorkCard } from "@/components/cards.tsx";
import { useContent } from "@/shared/i18n";
import { Fragment } from "react";
import { ArrowLeft } from "lucide-react";
import { useDetail } from "@/shared/hooks/use-detail.hook.ts";

const LIST_SPACING = "pt-0 pb-20 has-[h2]:pt-20";
const SHOWCASE_SPACING = "pt-0 pb-[90px] has-[h2]:pt-[80px]";
const STACK = "max-[1000px]:grid-cols-[1fr_1fr] max-[640px]:grid-cols-[1fr]";
const INFO_CARD = "min-w-0 p-[1.5rem] border border-[color-mix(in_srgb,var(--text)_12%,var(--paper))] rounded-[1.125rem] bg-paper";
const INFO_TITLE = "mt-3 mb-2 text-(length:--text-xl)";
const INFO_TEXT = "text-sm text-muted leading-[1.6]";
const BAND = "py-[clamp(2.5rem,6vw,5rem)]";
const SPLIT = "grid grid-cols-2 items-center gap-16 max-[1000px]:grid-cols-[1fr] max-[1000px]:gap-10";
const ROUNDED = "rounded-[28px]";
const MISSION_TEXT = "mt-5 text-(length:--text-base) text-muted leading-[1.6]";
const VALUE_GRID = "mt-16 grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[1001px]:grid-cols-3 min-[1001px]:auto-rows-[minmax(16.5rem,auto)]";
const TEAM_GRID = "mt-16 grid grid-cols-3 gap-4 max-[1000px]:grid-cols-2 max-[640px]:grid-cols-1";

function AboutArt() {
  return (
    <div className="flex items-center justify-center bg-gray rounded-[22px] min-h-[400px]">
      <Logo className="size-[140px] text-text" />
    </div>
  );
}

function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="pt-[36px]">
      {title ? <h2 className="text-(length:--text-2xl) font-semibold mb-[28px]">{title}</h2> : null}
      {paragraphs.map((paragraph) => <p key={paragraph} className="text-(length:--text-base) text-muted leading-[1.6] mb-[22px] max-w-[520px]">{paragraph}</p>)}
      {action ? <ActionLink action={action} /> : null}
    </div>
  );
}

export function AboutSection({ id, ...text }: AboutSectionProps) {
  return (
    <section className="pt-[12px] pb-[90px]" id={id}>
      <Container className="grid items-stretch grid-cols-[540px_1fr] gap-[64px] max-[1000px]:grid-cols-[1fr]">
        <AboutArt />
        <AboutText {...text} />
      </Container>
    </section>
  );
}

function InfoCardBody({ title, meta, description }: InfoCardBodyProps) {
  return (
    <>
      <Badge>{meta}</Badge>
      <h3 className={INFO_TITLE}>{title}</h3>
      <p className={INFO_TEXT}>{description}</p>
    </>
  );
}

function InfoCard({ href, ...copy }: InfoCardProps) {
  if (!href) return <Card className={INFO_CARD}><InfoCardBody {...copy} /></Card>;
  return <Link className={INFO_CARD} href={href}><InfoCardBody {...copy} /></Link>;
}

export function InfoSection({ items, detail, ...section }: InfoSectionProps) {
  return (
    <CollectionSection {...section} className={LIST_SPACING} gridClassName={`not-first:mt-10 grid grid-cols-3 gap-4 ${STACK}`} items={items}
      getKey={(item) => item.title} render={(item) => <InfoCard {...item} href={infoHref(detail, item)} />} />
  );
}

export function ProcessSection({ id }: ProcessSectionProps) {
  const { steps } = useContent();
  return (
    <section className="pt-[70px] pb-[20px]" id={id}>
      <Container className={`grid grid-cols-4 gap-4 ${STACK}`}>
        {steps.map((step, index) => <StepCard key={step.number} {...step} index={index} />)}
      </Container>
    </section>
  );
}

function Band({ children, className }: BandProps) {
  return (
    <section className={BAND}>
      <Container className={className}>{children}</Container>
    </section>
  );
}

export function AboutHero({ eyebrow, title, description, image }: AboutHeroProps) {
  return (
    <section className="pt-[clamp(3rem,7vw,5rem)] pb-[clamp(2rem,5vw,3.5rem)]">
      <Container className={SPLIT}>
        <div><Breadcrumb current={eyebrow} /><PageTitle className="mt-8">{title}</PageTitle><PageLead>{description}</PageLead></div>
        <Picture className={ROUNDED} image={image} loading="eager" fetchPriority="high" />
      </Container>
    </section>
  );
}

function MissionDetails({ images }: MissionDetailsProps) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      <Picture className={ROUNDED} image={images.detailA} />
      <Picture className={ROUNDED} image={images.detailB} />
    </div>
  );
}

function MissionCopy({ title, paragraphs, images }: MissionSectionProps) {
  return (
    <div>
      <h2 className="text-(length:--text-2xl) font-semibold">{title}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph} className={MISSION_TEXT}>{paragraph}</p>)}
      <MissionDetails images={images} />
    </div>
  );
}

export function MissionSection(props: MissionSectionProps) {
  return (
    <Band className={SPLIT}>
      <MissionCopy {...props} />
      <Picture className={`${ROUNDED} min-[1001px]:order-first`} image={props.images.mission} />
    </Band>
  );
}

function ValueGrid({ items }: ValueGridProps) {
  return (
    <div className={VALUE_GRID}>
      {items.map((item, index) => <ValueCard key={item.title} {...item} index={index} />)}
    </div>
  );
}

export function ValuesSection({ title, description, items }: ValuesSectionProps) {
  if (items.length === 0) return null;
  return (
    <Band>
      <HeadingText title={title} description={description} />
      <ValueGrid items={items} />
    </Band>
  );
}

function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className={TEAM_GRID}>
      {members.map((member) => <TeamCard key={member.name} {...member} />)}
    </div>
  );
}

export function TeamSection({ title, description, members }: TeamSectionProps) {
  if (members.length === 0) return null;
  return (
    <Band>
      <HeadingText title={title} description={description} />
      <TeamGrid members={members} />
    </Band>
  );
}

export function ProductsSection(props: SectionProps) {
  const { products } = useContent();
  return (
    <CollectionSection {...props} className={SHOWCASE_SPACING} gridClassName={`grid grid-cols-3 gap-4 not-first:mt-[40px] ${STACK}`} items={products}
      getKey={(product) => product.slug} render={(product) => <ProductCard {...product} />} />
  );
}

export function ServicesSection(props: SectionProps) {
  const { services } = useContent();
  return (
    <CollectionSection {...props} className={LIST_SPACING} gridClassName={`grid grid-cols-4 not-first:mt-[80px] ${STACK}`} items={services}
      getKey={(service) => service.slug} render={(service) => <ServiceCard {...service} />} />
  );
}

export function WorksSection(props: SectionProps) {
  const { works } = useContent();
  return (
    <CollectionSection {...props} className={SHOWCASE_SPACING} gridClassName="grid grid-cols-2 gap-4 not-first:mt-[40px] max-[1000px]:grid-cols-[1fr]" items={works}
      getKey={(work) => work.slug} render={(work) => <WorkCard {...work} />} />
  );
}

function HeadingText({ title, description }: HeadingTextProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold">{title}</h2>
      {description ? <p className="text-(length:--text-base) text-muted max-w-[520px] mt-[22px] leading-[1.6]">{description}</p> : null}
    </div>
  );
}

function SectionHeading({ title, description, action }: SectionHeadingProps) {
  if (!title) return null;
  return (
    <div className="flex items-start justify-between">
      <HeadingText title={title} description={description} />
      {action ? <ActionLink action={action} className="mt-0" /> : null}
    </div>
  );
}

function CardGrid<T>({ className, items, getKey, render }: CardGridProps<T>) {
  return (
    <div className={className}>
      {items.map((item) => <Fragment key={getKey(item)}>{render(item)}</Fragment>)}
    </div>
  );
}

export function CollectionSection<T>({ id, className, gridClassName, items, getKey, render, ...heading }: CollectionSectionProps<T>) {
  return (
    <section className={className} id={id}>
      <Container>
        <SectionHeading {...heading} />
        <CardGrid className={gridClassName} items={items} getKey={getKey} render={render} />
      </Container>
    </section>
  );
}

function DetailBackLink({ detail }: DetailBackLinkProps) {
  return (
    <Link className={buttonClasses("outline")} href={detail.backHref}>
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />{detail.backLabel}
    </Link>
  );
}

function DetailMedia({ cover }: DetailMediaProps) {
  return (
    <Picture className="h-auto rounded-[22px]" image={cover} loading="eager" fetchPriority="high" style={{ viewTransitionName: cover.name }} />
  );
}

function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="pb-20">
      <Container className="flex flex-col items-start gap-10">
        {detail.cover ? <DetailMedia cover={detail.cover} /> : null}
        <DetailBackLink detail={detail} />
      </Container>
    </section>
  );
}

export function DetailPage({ detail }: DetailPageProps) {
  return (
    <>
      <PageHero eyebrow={detail.eyebrow} title={detail.title} description={detail.description} />
      <DetailBody detail={detail} />
      <ContactPanel />
    </>
  );
}

export function DetailRoute({ kind, lang, slug }: DetailRouteViewProps) {
  const detail = useDetail(kind, lang, slug);
  return detail ? <DetailPage detail={detail} /> : <NotFoundPanel />;
}
