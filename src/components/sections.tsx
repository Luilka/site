import { Container } from "@/shared/ui/containers.tsx";
import { ActionLink, Breadcrumb, ContactPanel, PageHero, PageLead, PageTitle, NotFoundPanel } from "@/components/patterns.tsx";
import type { SectionProps } from "@/shared/types/section-props.type.ts";
import { infoHref } from "@/shared/utils/info-href.util.ts";
import type { AboutArtProps, DetailFactsProps, GalleryItemProps, GalleryRowProps, NextDetailProps, ParagraphsProps, PointsProps, StoryBlockViewProps, StorySectionProps, AboutHeroProps, FilmPlayerProps, FilmSectionProps, FilmTranscriptProps, AboutSectionProps, AboutTextProps, BandProps, CardGridProps, CollectionSectionProps, DetailBackLinkProps, DetailBodyProps, DetailMediaProps, DetailPageProps, DetailRouteViewProps, HeadingTextProps, InfoCard, InfoCardBodyProps, InfoCardProps, InfoSectionProps, MissionDetailsProps, MissionSectionProps, ProcessSectionProps, SectionHeadingProps, TeamGridProps, TeamSectionProps, ValueGridProps, ValuesSectionProps } from "@/shared/types";
import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { Link } from "@/shared/ui/links.tsx";
import { Card } from "@/shared/ui/cards.tsx";
import { Picture } from "@/shared/ui/images.tsx";
import { Badge } from "@/shared/ui/badges.tsx";
import { StepCard, ProductCard, ServiceCard, TeamCard, ValueCard, WorkCard } from "@/components/cards.tsx";
import { useContent } from "@/shared/i18n";
import { galleryRows } from "@/shared/utils/gallery-rows.util.ts";
import { storyBlocks } from "@/shared/utils/story-blocks.util.ts";
import { Fragment } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
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

function AboutArt({ image }: AboutArtProps) {
  return (
    <div className="relative min-h-[400px] overflow-hidden rounded-[22px] bg-gray">
      <Picture className="absolute inset-0 size-full" image={image} />
    </div>
  );
}

function AboutText({ title, paragraphs, action }: AboutTextProps) {
  return (
    <div className="flex flex-col justify-center">
      {title ? <h2 className="text-(length:--text-2xl) font-semibold mb-[28px]">{title}</h2> : null}
      {paragraphs.map((paragraph) => <p key={paragraph} className="text-(length:--text-base) text-muted leading-[1.6] mb-[22px] max-w-[520px]">{paragraph}</p>)}
      {action ? <ActionLink action={action} className="w-fit" /> : null}
    </div>
  );
}

export function AboutSection({ id, image, ...text }: AboutSectionProps) {
  return (
    <section className="pt-[12px] pb-[90px]" id={id}>
      <Container className="grid items-stretch grid-cols-[540px_1fr] gap-[64px] max-[1000px]:grid-cols-[1fr]">
        <AboutArt image={image} />
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

function FilmPlayer({ title, film }: FilmPlayerProps) {
  const track = film.captions;
  return (
    <video className="mt-10 aspect-video w-full rounded-[28px] bg-night" controls preload="none" playsInline poster={film.poster} aria-label={title}>
      <source src={film.src} type="video/mp4" />
      {track && <track kind="captions" src={track.src} srcLang={track.lang} label={track.label} default />}
    </video>
  );
}

function FilmTranscript({ film }: FilmTranscriptProps) {
  return (
    <details className="mt-6 max-w-[44rem] text-muted">
      <summary className="cursor-pointer py-2 font-medium text-text">{film.transcriptLabel}</summary>
      {film.transcript.map((line) => <p key={line} className="mt-3 leading-[1.6]">{line}</p>)}
    </details>
  );
}

export function FilmSection({ title, description, film }: FilmSectionProps) {
  return (
    <Band>
      <HeadingText title={title} description={description} />
      <FilmPlayer title={title} film={film} />
      <p className="mt-4 text-(length:--text-sm) text-muted">{film.note}</p>
      <FilmTranscript film={film} />
    </Band>
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
    <Picture className="max-h-[720px] rounded-[22px]" image={cover} loading="eager" fetchPriority="high" style={{ viewTransitionName: cover.name }} />
  );
}

const GALLERY_PICTURE = "w-full rounded-[22px] object-cover";

function GalleryItem({ image, pair }: GalleryItemProps) {
  return (
    <figure className="m-0">
      <Picture className={`${GALLERY_PICTURE} ${pair ? "aspect-square" : "aspect-[3/2]"}`} image={image} />
      {image.caption ? <figcaption className="mt-3 text-(length:--text-sm) text-muted leading-[1.5]">{image.caption}</figcaption> : null}
    </figure>
  );
}

function GalleryRow({ row }: GalleryRowProps) {
  const pair = row.length > 1;
  return (
    <div data-part="gallery-row" className={pair ? "grid grid-cols-2 gap-4 max-[640px]:grid-cols-1" : "grid gap-4"}>
      {row.map((image) => <GalleryItem key={image.src} image={image} pair={pair} />)}
    </div>
  );
}

function Paragraphs({ items }: ParagraphsProps) {
  return <>{items.map((text) => <p key={text} className={`${MISSION_TEXT} max-w-[680px]`}>{text}</p>)}</>;
}

function Points({ items }: PointsProps) {
  return <ul className="mt-5 flex max-w-[680px] list-disc flex-col gap-2 pl-5 text-(length:--text-base) text-muted leading-[1.6]">{items.map((text) => <li key={text}>{text}</li>)}</ul>;
}

function StorySection({ section }: StorySectionProps) {
  return (
    <div data-part="story-section" className="w-full">
      <h2 className="text-(length:--text-2xl) font-semibold">{section.title}</h2>
      <Paragraphs items={section.paragraphs} />
      {section.points ? <Points items={section.points} /> : null}
    </div>
  );
}

function StoryBlockView({ block }: StoryBlockViewProps) {
  return (
    <>
      {block.section ? <StorySection section={block.section} /> : null}
      {block.row ? <GalleryRow row={block.row} /> : null}
    </>
  );
}

function DetailStory({ detail }: DetailBodyProps) {
  const blocks = storyBlocks(detail.sections, galleryRows(detail.gallery));
  return (
    <div className="flex w-full flex-col gap-10">
      {blocks.map((block, index) => <StoryBlockView key={block.section?.title ?? block.row?.[0]?.src ?? index} block={block} />)}
    </div>
  );
}

function DetailFacts({ facts }: DetailFactsProps) {
  if (facts.length === 0) return null;
  return (
    <dl className="m-0 grid w-full grid-cols-3 gap-6 border-y border-y-[var(--border-ui)] py-6 max-[640px]:grid-cols-1">
      {facts.map((fact) => <div key={fact.label}><dt className="text-(length:--text-xs) font-semibold uppercase tracking-[0.08em] text-muted">{fact.label}</dt><dd className="m-0 mt-1 text-(length:--text-base) font-medium">{fact.value}</dd></div>)}
    </dl>
  );
}

function NextText({ next }: NextDetailProps) {
  return (
    <span>
      <span className="block text-(length:--text-xs) font-semibold uppercase tracking-[0.08em] text-muted">{next.label}</span>
      <span className="mt-2 flex items-center gap-2 text-(length:--text-2xl) font-semibold">{next.title}<ArrowUpRight size={22} strokeWidth={1.8} aria-hidden="true" /></span>
    </span>
  );
}

function NextDetail({ next }: NextDetailProps) {
  return (
    <Link className="flex w-full items-center justify-between gap-6 rounded-[22px] bg-gray p-6 max-[640px]:flex-col max-[640px]:items-start" href={next.href}>
      <NextText next={next} />
      {next.cover ? <Picture className="h-[120px] w-[200px] rounded-[14px] object-cover max-[640px]:w-full" image={next.cover} /> : null}
    </Link>
  );
}

function DetailExtras({ detail }: DetailBodyProps) {
  return (
    <>
      {detail.cover ? <DetailMedia cover={detail.cover} /> : null}
      <DetailFacts facts={detail.facts} />
      <DetailStory detail={detail} />
      {detail.next ? <NextDetail next={detail.next} /> : null}
    </>
  );
}

function DetailBody({ detail }: DetailBodyProps) {
  return (
    <section className="pb-20">
      <Container className="flex flex-col items-start gap-10">
        <DetailExtras detail={detail} />
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
