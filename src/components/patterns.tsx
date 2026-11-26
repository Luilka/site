import { ArrowUpRight, ChevronRight, CalendarDays } from "lucide-react";
import { buttonClasses } from "@/shared/ui/buttons.tsx";
import { Link, ErrorBoundary } from "@/shared/ui/links.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import { useContent } from "@/shared/i18n";
import type { HTMLAttributes } from "react";
import { useRetry } from "@/shared/hooks/use-retry.hook.ts";
import Errors from "@/routes/errors.tsx";
import { motion } from "motion/react";
import { Badge } from "@/shared/ui/badges.tsx";
import { PROCESS_STAGES } from "@/shared/utils/process-stages.util.ts";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";
import type { ActionLinkProps, ContactPanelProps, FeedbackBoundaryProps, PageFrameProps, PageHeroProps, PageHeroTextProps, ProcessBandProps, ProcessStageProps, QuoteLinkProps, RevealProps, StateCopyProps } from "@/shared/types";

export function ActionLink({ action, className }: ActionLinkProps) {
  return (
    <Link className={buttonClasses("outline", className)} href={action.href}>
      {action.label}
      <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
    </Link>
  );
}

function ContactCard() {
  const { contact } = useContent();
  return (
    <div className="bg-gray rounded-[22px] py-[70px] px-[60px] min-h-[300px]">
      <h2 className="text-(length:--text-2xl) font-semibold mb-[22px]">{contact.title}</h2>
      <p className="text-(length:--text-base) text-muted max-w-[440px] mb-[26px] leading-[1.7]">{contact.description}</p>
      <QuoteLink variant="dark" />
    </div>
  );
}

export function ContactPanel({ id = "contact" }: ContactPanelProps) {
  return (
    <section className="bg-soft py-[90px] px-0 mt-[20px]" id={id}>
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

const ENTRANCE = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

export function HeroAccent() {
  return (
    <motion.div
      data-testid="motion-accent"
      aria-hidden="true"
      className="absolute inset-6 rounded-full border border-white/20"
      {...ENTRANCE}
    />
  );
}

export function NotFoundPanel() {
  const copy = useContent().states.notfound;
  return (
    <StatePanel>
      <span className="mb-4 block text-[length:clamp(4rem,_12vw,_7rem)] font-bold leading-[1] text-blue" aria-hidden="true">{copy.code}</span>
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

function PageHeroText({ eyebrow, title, description }: PageHeroTextProps) {
  return (
    <>
      <Badge>{eyebrow}</Badge>
      <h1 className="max-w-[46rem] text-balance">{title}</h1>
      <p className="max-w-[42rem] text-(length:--text-base) text-muted">{description}</p>
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

function ProcessStage({ label, last }: ProcessStageProps) {
  return (
    <>
      <span className="inline-block">{label}</span>
      {last ? null : <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />}
    </>
  );
}

function ProcessStages() {
  const lastIndex = PROCESS_STAGES.length - 1;
  return (
    <div className="relative z-2 flex justify-between gap-3 bg-gray-300 px-20 py-7 font-medium">
      {PROCESS_STAGES.map((stage, index) => <ProcessStage key={stage} label={stage} last={index === lastIndex} />)}
    </div>
  );
}

export function ProcessBand({ reverse = false }: ProcessBandProps) {
  return (
    <div className="relative" aria-hidden="true">
      <div className={`absolute inset-0 -left-0.5 -right-0.5 bg-gray-200 ${reverse ? "rotate-2" : "-rotate-2"}`}></div>
      <ProcessStages />
    </div>
  );
}

export function QuoteLink({ variant = "primary", className }: QuoteLinkProps) {
  const { quote } = useContent();
  return (
    <a className={buttonClasses(variant, className)} href={CONTACT_MAILTO}>
      {quote}
      <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
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
