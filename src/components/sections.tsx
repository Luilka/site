import type { SectionAction, InfoCard as InfoCardData } from "@/shared/i18n";
import { Container } from "@/shared/ui/containers.tsx";
import { ActionLink, ContactPanel, PageHero, NotFoundPanel } from "@/components/patterns.tsx";
import type { SectionProps } from "@/shared/types/section-props.type.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { DetailKind, DetailModel, DetailRouteProps } from "@/shared/types";
import { AppLink, type Href } from "@/shared/ui/links.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Badge } from "@/shared/ui/badges.tsx";
import { StepCard, ProductCard, ServiceCard, WorkCard } from "@/components/cards.tsx";
import { useContent } from "@/shared/i18n";
import { Fragment, type ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { useDetail } from "@/shared/hooks/use-detail.hook.ts";

function AboutArt() {
  return (
    <div className="about-img">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <use href="#finger" />
      </svg>
    </div>
  );
}

type AboutTextProps = {
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="about-txt">
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {action ? <ActionLink action={action} /> : null}
    </div>
  );
}

type AboutSectionProps = {
  id?: string;
  title: string;
  paragraphs: readonly string[];
  action?: SectionAction;
};

export function AboutSection({ id, ...text }: AboutSectionProps) {
  return (
    <section className="about" id={id}>
      <Container className="about-grid">
        <AboutArt />
        <AboutText {...text} />
      </Container>
    </section>
  );
}

type InfoCardBodyProps = {
  title: string;
  meta: string;
  description: string;
};

function InfoCardBody({ title, meta, description }: InfoCardBodyProps) {
  return (
    <>
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
}

type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
  href?: Href;
};

function InfoCard({ href, ...copy }: InfoCardProps) {
  if (!href) return <Card className="info-card"><InfoCardBody {...copy} /></Card>;
  return <AppLink className="card info-card" href={href}><InfoCardBody {...copy} /></AppLink>;
}

type InfoSectionProps = SectionProps & {
  items: readonly InfoCardData[];
  detail?: DetailKind;
};

export function InfoSection({ items, detail, ...section }: InfoSectionProps) {
  return (
    <CollectionSection {...section} className="services" gridClassName="info-grid" items={items}
      getKey={(item) => item.title} render={(item) => <InfoCard {...item} href={infoHref(detail, item)} />} />
  );
}

type ProcessSectionProps = {
  id?: string;
};

export function ProcessSection({ id }: ProcessSectionProps) {
  const { steps } = useContent();
  return (
    <section className="steps" id={id}>
      <Container className="steps-grid">
        {steps.map((step) => <StepCard key={step.number} {...step} />)}
      </Container>
    </section>
  );
}

export function ProductsSection(props: SectionProps) {
  const { products } = useContent();
  return (
    <CollectionSection {...props} className="products" gridClassName="prod-grid" items={products}
      getKey={(product) => product.slug} render={(product) => <ProductCard {...product} />} />
  );
}

export function ServicesSection(props: SectionProps) {
  const { services } = useContent();
  return (
    <CollectionSection {...props} className="services" gridClassName="svc-grid" items={services}
      getKey={(service) => service.slug} render={(service) => <ServiceCard {...service} />} />
  );
}

export function WorksSection(props: SectionProps) {
  const { works } = useContent();
  return (
    <CollectionSection {...props} className="works" gridClassName="work-grid" items={works}
      getKey={(work) => work.slug} render={(work) => <WorkCard {...work} />} />
  );
}

type HeadingTextProps = {
  title: string;
  description?: string;
};

function HeadingText({ title, description }: HeadingTextProps) {
  return (
    <div>
      <h2 className="sec">{title}</h2>
      {description ? <p className="sec-p">{description}</p> : null}
    </div>
  );
}

type SectionHeadingProps = {
  title: string;
  description?: string;
  action?: SectionAction;
};

function SectionHeading({ title, description, action }: SectionHeadingProps) {
  return (
    <div className="sec-head">
      <HeadingText title={title} description={description} />
      {action ? <ActionLink action={action} className="section-action" /> : null}
    </div>
  );
}

type CardGridProps<T> = {
  className: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

function CardGrid<T>({ className, items, getKey, render }: CardGridProps<T>) {
  return (
    <div className={className}>
      {items.map((item) => <Fragment key={getKey(item)}>{render(item)}</Fragment>)}
    </div>
  );
}

type CollectionSectionProps<T> = SectionProps & {
  className: string;
  gridClassName: string;
  items: readonly T[];
  getKey: (item: T) => string;
  render: (item: T) => ReactNode;
};

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

type DetailBackLinkProps = {
  detail: DetailModel;
};

function DetailBackLink({ detail }: DetailBackLinkProps) {
  return (
    <AppLink className="btn-outline" href={detail.backHref}>
      <ArrowLeft size={14} strokeWidth={1.8} aria-hidden="true" />{detail.backLabel}
    </AppLink>
  );
}

type DetailCardProps = {
  title: string;
  body: string;
};

function DetailCard({ title, body }: DetailCardProps) {
  return (
    <div className="info-grid">
      <article className="card info-card">
        <h3>{title}</h3>
        <p>{body}</p>
      </article>
    </div>
  );
}

type DetailBodyProps = {
  detail: DetailModel;
};

function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="services">
      <Container>
        <DetailCard title={detail.title} body={detail.body} />
        <DetailBackLink detail={detail} />
      </Container>
    </section>
  );
}

type DetailPageProps = {
  detail: DetailModel;
};

export function DetailPage({ detail }: DetailPageProps) {
  return (
    <>
      <PageHero eyebrow={detail.eyebrow} title={detail.title} description={detail.description} />
      <DetailBody detail={detail} />
      <ContactPanel />
    </>
  );
}

type DetailRouteViewProps = DetailRouteProps & {
  kind: DetailKind;
};

export function DetailRoute({ kind, lang, slug }: DetailRouteViewProps) {
  const detail = useDetail(kind, lang, slug);
  return detail ? <DetailPage detail={detail} /> : <NotFoundPanel />;
}
