import { ArrowUpRight, ChevronRight, Motorbike, Pause, Play, Volume2, VolumeX, CalendarDays, Code, FlaskConical, Lightbulb, LayoutDashboard, PenTool, Rocket, type LucideIcon } from "lucide-react";
import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { Link, ErrorBoundary } from "@/shared/ui/links.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import { useContent } from "@/shared/i18n";
import type { HTMLAttributes } from "react";
import { useRetry } from "@/shared/hooks/use-retry.hook.ts";
import Errors from "@/routes/errors.tsx";
import { motion } from "motion/react";
import { useVideoPlayback } from "@/shared/hooks/use-video-playback.hook.ts";
import { Badge } from "@/shared/ui/badges.tsx";
import { cn } from "@/shared/utils/cn.util.ts";
import { PROCESS_STAGES } from "@/shared/utils/process-stages.util.ts";
import type { ActionLinkProps, BreadcrumbProps, ContactPanelProps, FeedbackBoundaryProps, PageFrameProps, PageHeroProps, PageHeroTextProps, PageLeadProps, PageTitleProps, ProcessBandProps, ReelSoundProps, ReelToggleProps, ReelVideoProps, ProcessStageListProps, ProcessStageProps, ContactButtonProps, RevealProps, StateCopyProps } from "@/shared/types";

export function ActionLink({ action, className }: ActionLinkProps) {
  return (
    <Link className={buttonClasses("outline", className)} href={action.href}>
      {action.label}
      <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}

const MOSAIC: readonly string[] = [
  "bg-gold", "bg-transparent", "bg-accent", "bg-gray", "bg-transparent", "bg-gold/60",
  "bg-accent", "bg-paper", "bg-transparent", "bg-gold", "bg-accent", "bg-gray",
  "bg-transparent", "bg-gold/60", "bg-paper", "bg-accent", "bg-gold", "bg-transparent",
];

function ContactMosaic() {
  return (
    <div data-part="mosaic" className="absolute inset-y-0 right-0 grid w-[46%] grid-cols-6 content-center gap-3 p-6 max-[900px]:hidden" aria-hidden="true">
      {MOSAIC.map((colour, index) => <span key={index} className={`aspect-square rounded-[14px] ${colour}`} />)}
    </div>
  );
}

function ContactText() {
  const { contact } = useContent();
  return (
    <div className="relative">
      <h2 className="text-(length:--text-2xl) font-semibold mb-[22px]">{contact.title}</h2>
      <p className="text-(length:--text-base) text-paper/70 max-w-[440px] mb-[26px] leading-[1.7]">{contact.description}</p>
      <ContactButton variant="light" />
    </div>
  );
}

function ContactCard() {
  return (
    <div className="relative overflow-hidden bg-night text-paper rounded-[22px] py-[70px] px-[60px] min-h-[300px]">
      <ContactMosaic />
      <ContactText />
    </div>
  );
}

export function ContactPanel({ id = "contact" }: ContactPanelProps) {
  return (
    <section className="bg-paper bg-dots py-[90px] px-0 mt-[20px]" id={id}>
      <Container>
        <ContactCard />
      </Container>
    </section>
  );
}

export function FeedbackBoundary({ children }: FeedbackBoundaryProps) {
  const { attempt, retry } = useRetry();
  return (
    <ErrorBoundary key={attempt} fallback={(_error, reset) => <Errors reset={() => retry(reset)} />}>
      {children}
    </ErrorBoundary>
  );
}

const REEL_FRAME = "relative h-[440px] overflow-hidden rounded-[28px] bg-black";
const REEL_BUTTON = "row-center justify-center size-11 rounded-full bg-paper/80 text-text backdrop-blur-md cursor-pointer";

function ReelToggle({ paused, onToggle }: ReelToggleProps) {
  const { reelPause, reelPlay } = useContent();
  const Icon = paused ? Play : Pause;
  return <button type="button" className={REEL_BUTTON} aria-label={paused ? reelPlay : reelPause} onClick={onToggle}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></button>;
}

function ReelSound({ sound, onToggle }: ReelSoundProps) {
  const { soundOn, soundOff } = useContent();
  const Icon = sound ? Volume2 : VolumeX;
  return <button type="button" className={REEL_BUTTON} aria-label={sound ? soundOff : soundOn} onClick={onToggle}><Icon size={20} strokeWidth={1.8} aria-hidden="true" /></button>;
}

function ReelControls({ player }: ReelVideoProps) {
  return (
    <div className="absolute bottom-3 right-3 flex gap-2">
      <ReelSound sound={player.sound} onToggle={player.toggleSound} />
      <ReelToggle paused={player.paused} onToggle={player.toggle} />
    </div>
  );
}

const REEL_VIDEO = "absolute inset-0 size-full object-cover";

function ReelVideo({ player }: ReelVideoProps) {
  return (
    <video ref={player.ref} className={REEL_VIDEO} poster="/video/hero-reel-poster.webp" muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
      <source src="/video/hero-reel.mp4" type="video/mp4" />
    </video>
  );
}

/** A decorative motion video for the home hero: it plays only on screen, silent until the visitor asks for sound, and stays on its poster when they ask for less motion. */
export function HeroReel() {
  const player = useVideoPlayback();
  return (
    <div className={REEL_FRAME}>
      <ReelVideo player={player} />
      <ReelControls player={player} />
    </div>
  );
}

export function NotFoundPanel() {
  const copy = useContent().states.notfound;
  return (
    <StatePanel>
      <span className="mb-4 block text-[length:clamp(4rem,_12vw,_7rem)] font-bold leading-[1] text-accent" aria-hidden="true">{copy.code}</span>
      <StateCopy title={copy.title} description={copy.description} />
      <Link className={buttonClasses("dark")} href="/">{copy.action}</Link>
    </StatePanel>
  );
}

export function PageFrame({ page, children }: PageFrameProps) {
  const intro = useContent().pages[page];
  return (
    <>
      <PageHero {...intro} />
      {children}
      <ContactPanel />
    </>
  );
}

const CRUMBS = "flex flex-wrap items-center gap-2 text-(length:--text-base) text-muted";

function BreadcrumbHome() {
  const { breadcrumb } = useContent();
  return <li><Link className="hover:text-text hover:underline" href="/">{breadcrumb.home}</Link></li>;
}

function BreadcrumbCurrent({ current }: BreadcrumbProps) {
  return (
    <li className="flex items-center gap-2">
      <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
      <span className="font-semibold text-text" aria-current="page">{current}</span>
    </li>
  );
}

function BreadcrumbList({ current }: BreadcrumbProps) {
  return (
    <ol className={CRUMBS}>
      <BreadcrumbHome />
      <BreadcrumbCurrent current={current} />
    </ol>
  );
}

export function Breadcrumb({ current }: BreadcrumbProps) {
  const { breadcrumb } = useContent();
  return <nav aria-label={breadcrumb.label}><BreadcrumbList current={current} /></nav>;
}

export function PageTitle({ className, children }: PageTitleProps) {
  return <h1 className={cn("max-w-[46rem] text-balance text-(length:--text-3xl) leading-[1.15] font-semibold tracking-[-0.02em] max-[1000px]:text-(length:--text-2xl)", className)}>{children}</h1>;
}

export function PageLead({ children }: PageLeadProps) {
  return <p className="mt-[22px] max-w-[42rem] text-(length:--text-base) text-muted leading-[1.55]">{children}</p>;
}

function PageHeroText({ eyebrow, title, description }: PageHeroTextProps) {
  return (
    <>
      <Badge>{eyebrow}</Badge>
      <PageTitle>{title}</PageTitle>
      <PageLead>{description}</PageLead>
    </>
  );
}

export function PageHero(props: PageHeroProps) {
  return (
    <section className="pt-[clamp(3rem,7vw,5rem)] pb-[clamp(2rem,5vw,3.5rem)]">
      <Container><PageHeroText {...props} /></Container>
    </section>
  );
}

const TRACK = "flex w-max hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none";
const LIST = "flex min-w-[max(100vw,1280px)] shrink-0 items-center justify-around gap-12 px-6 motion-reduce:w-full motion-reduce:min-w-0 motion-reduce:shrink motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-2";
const LIST_COPY = `${LIST} motion-reduce:hidden`;
const CHEVRON = "opacity-50 motion-reduce:max-[1000px]:hidden";
const CHEVRON_LAST = `${CHEVRON} motion-reduce:hidden`;
const TILT = "absolute inset-0 -left-0.5 -right-0.5 bg-gray animate-stripes motion-reduce:animate-none bg-[repeating-linear-gradient(45deg,transparent_0_8px,color-mix(in_srgb,var(--text)_18%,transparent)_8px_10px)] bg-size-[14.1421px_14.1421px]";

const STAGE_ICONS: Record<string, LucideIcon> = {
  Concept: Lightbulb,
  "UX Design": PenTool,
  "UI Design": LayoutDashboard,
  Code: Code,
  Test: FlaskConical,
  Production: Rocket,
};

function ProcessStage({ label, last, reverse }: ProcessStageProps) {
  const Icon = STAGE_ICONS[label];
  return (
    <>
      <Icon size={30} strokeWidth={1.6} aria-hidden="true" />
      <Motorbike size={26} strokeWidth={1.5} aria-hidden="true" className={`${last ? CHEVRON_LAST : CHEVRON} ${reverse ? "-scale-x-100" : ""}`} />
    </>
  );
}

function ProcessStageList({ className, reverse }: ProcessStageListProps) {
  const lastIndex = PROCESS_STAGES.length - 1;
  return (
    <div className={className}>
      {PROCESS_STAGES.map((stage, index) => <ProcessStage key={stage} label={stage} last={index === lastIndex} reverse={reverse} />)}
    </div>
  );
}

function ProcessStages({ reverse }: ProcessBandProps) {
  return (
    <div className="relative z-2 overflow-x-clip bg-night text-gold py-7 font-medium">
      <div className={`${TRACK} ${reverse ? "animate-marquee" : "animate-marquee-right"}`}>
        <ProcessStageList className={LIST} reverse={reverse} />
        <ProcessStageList className={LIST_COPY} reverse={reverse} />
      </div>
    </div>
  );
}

export function ProcessBand({ reverse = false }: ProcessBandProps) {
  return (
    <div className="relative overflow-x-clip" aria-hidden="true">
      <div className={`${TILT} ${reverse ? "rotate-2" : "-rotate-2 [animation-direction:reverse]"}`}></div>
      <ProcessStages reverse={reverse} />
    </div>
  );
}

export function ContactButton({ variant = "accent", className }: ContactButtonProps) {
  const { contactAction } = useContent();
  return (
    <Link className={buttonClasses(variant, className)} href="/contact">
      {contactAction}
      <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}

export function Reveal({ children, className }: RevealProps) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </motion.div>
  );
}

export function StateCopy({ title, description }: StateCopyProps) {
  return (
    <>
      <h1 className="m-0 max-w-[34rem] text-(length:--text-3xl) leading-[1.15]">{title}</h1>
      <p className="mx-auto mt-4 mb-8 max-w-[32rem] text-muted leading-[1.6]">{description}</p>
    </>
  );
}

export function StatePanel({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className="flex flex-col items-center justify-center min-h-[26rem] text-center py-[clamp(3rem,8vw,6rem)] px-[1.5rem]" {...props}>
      <Container>{children}</Container>
    </section>
  );
}
