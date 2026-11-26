import { Container } from "@/shared/ui/containers.tsx";
import { ActionLink, ContactPanel, PageHero, NotFoundPanel } from "@/components/patterns.tsx";
import type { SectionProps } from "@/shared/types/section-props.type.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { AboutSectionProps, AboutTextProps, CardGridProps, CollectionSectionProps, DetailBackLinkProps, DetailBodyProps, DetailCardProps, DetailPageProps, DetailRouteViewProps, HeadingTextProps, InfoCard, InfoCardBodyProps, InfoCardProps, InfoSectionProps, ProcessSectionProps, SectionHeadingProps } from "@/shared/types";
import { Link } from "@/shared/ui/links.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Badge } from "@/shared/ui/badges.tsx";
import { StepCard, ProductCard, ServiceCard, WorkCard } from "@/components/cards.tsx";
import { useContent } from "@/shared/i18n";
import { Fragment } from "react";
import { ArrowLeft } from "lucide-react";
import { useDetail } from "@/shared/hooks/use-detail.hook.ts";

const SECTION_SPACING = "py-20 px-0";
const STACK = "max-[1000px]:grid-cols-[1fr_1fr] max-[640px]:grid-cols-[1fr]";
const INFO_CARD = "min-w-0 p-[1.5rem] border border-[color-mix(in_srgb,var(--text)_12%,var(--paper))] rounded-[1.125rem] bg-paper";
const INFO_TITLE = "mt-3 mb-2 text-(length:--text-xl)";
const INFO_TEXT = "text-sm text-muted leading-[1.6]";

function AboutArt() {
  return (
    <div className="flex items-center justify-center bg-gray rounded-[22px] min-h-[400px]">
      <svg className="w-[140px] h-[140px] fill-[#2a2a30]" viewBox="0 0 24 24" aria-hidden="true">
        <use href="#finger" />
      </svg>
    </div>
  );
}

function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="pt-[36px]">
      <h2 className="text-(length:--text-2xl) font-semibold mb-[28px]">{title}</h2>
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
    <CollectionSection {...section} className={SECTION_SPACING} gridClassName={`mt-10 grid grid-cols-3 gap-4 ${STACK}`} items={items}
      getKey={(item) => item.title} render={(item) => <InfoCard {...item} href={infoHref(detail, item)} />} />
  );
}

export function ProcessSection({ id }: ProcessSectionProps) {
  const { steps } = useContent();
  return (
    <section className="pt-[70px] pb-[20px]" id={id}>
      <Container className={`grid grid-cols-4 gap-4 ${STACK}`}>
        {steps.map((step) => <StepCard key={step.number} {...step} />)}
      </Container>
    </section>
  );
}

export function ProductsSection(props: SectionProps) {
  const { products } = useContent();
  return (
    <CollectionSection {...props} className="pt-[80px] pb-[90px]" gridClassName={`grid grid-cols-3 gap-4 mt-[40px] ${STACK}`} items={products}
      getKey={(product) => product.slug} render={(product) => <ProductCard {...product} />} />
  );
}

export function ServicesSection(props: SectionProps) {
  const { services } = useContent();
  return (
    <CollectionSection {...props} className={SECTION_SPACING} gridClassName={`grid grid-cols-4 mt-[80px] ${STACK}`} items={services}
      getKey={(service) => service.slug} render={(service) => <ServiceCard {...service} />} />
  );
}

export function WorksSection(props: SectionProps) {
  const { works } = useContent();
  return (
    <CollectionSection {...props} className="pt-[80px] pb-[90px]" gridClassName="grid grid-cols-2 gap-4 mt-[40px] max-[1000px]:grid-cols-[1fr]" items={works}
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
    <Link className="btn-outline" href={detail.backHref}>
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />{detail.backLabel}
    </Link>
  );
}

function DetailCard({ title, body }: DetailCardProps) {
  return (
    <div className={`mt-10 grid grid-cols-3 gap-4 ${STACK}`}>
      <article className={INFO_CARD}>
        <h3 className={INFO_TITLE}>{title}</h3>
        <p className={INFO_TEXT}>{body}</p>
      </article>
    </div>
  );
}

function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className={SECTION_SPACING}>
      <Container>
        <DetailCard title={detail.title} body={detail.body} />
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
