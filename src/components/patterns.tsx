import { ArrowUpRight, ChevronRight, CalendarDays } from "lucide-react";
import type { SectionAction } from "@/shared/i18n";
import { buttonClasses, type ButtonVariant } from "@/shared/ui/buttons.tsx";
import { AppLink, ErrorBoundary } from "@/shared/ui/links.tsx";
import { Container } from "@/shared/ui/containers.tsx";
import { useContent, type PageKey } from "@/shared/i18n";
import type { ReactNode, HTMLAttributes } from "react";
import { useRetry } from "@/shared/hooks/use-retry.hook.ts";
import Errors from "@/routes/errors.tsx";
import { MotionBox } from "@/shared/ui/motion-boxes.tsx";
import { Badge } from "@/shared/ui/badges.tsx";
import { PROCESS_STAGES } from "@/shared/utils/process-stages.util.ts";
import { CONTACT_MAILTO } from "@/shared/utils/contact-mailto.util.ts";

type ActionLinkProps = {
  action: SectionAction;
  className?: string;
};

export function ActionLink({ action, className }: ActionLinkProps) {
  return (
    <AppLink className={buttonClasses("outline", className)} href={action.href}>
      {action.label}
      <ArrowUpRight size={10} strokeWidth={1.8} aria-hidden="true" />
    </AppLink>
  );
}

function ContactCard() {
  const { contact } = useContent();
  return (
    <div className="cta">
      <h2>{contact.title}</h2>
      <p>{contact.description}</p>
      <QuoteLink variant="dark" className="btn-cta" />
    </div>
  );
}

type ContactPanelProps = {
  id?: string;
};

export function ContactPanel({ id = "contact" }: ContactPanelProps) {
  return (
    <section className="cta-wrap" id={id}>
      <Container>
        <ContactCard />
      </Container>
    </section>
  );
}

type FeedbackBoundaryProps = {
  children: ReactNode;
};

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
    <MotionBox
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
      <span className="state-code" aria-hidden="true">{copy.code}</span>
      <StateCopy title={copy.title} description={copy.description} />
      <AppLink className="btn btn-dark state-action" href="/">{copy.action}</AppLink>
    </StatePanel>
  );
}

type PageFrameProps = {
  page: PageKey;
  children: ReactNode;
};

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

type PageHeroTextProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function PageHeroText({ eyebrow, title, description }: PageHeroTextProps) {
  return (
    <>
      <Badge>{eyebrow}</Badge>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero(props: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container><PageHeroText {...props} /></Container>
    </section>
  );
}

type ProcessStageProps = {
  label: string;
  last: boolean;
};

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

type ProcessBandProps = {
  reverse?: boolean;
};

export function ProcessBand({ reverse = false }: ProcessBandProps) {
  return (
    <div className="relative" aria-hidden="true">
      <div className={`absolute inset-0 -left-0.5 -right-0.5 bg-gray-200 ${reverse ? "rotate-2" : "-rotate-2"}`}></div>
      <ProcessStages />
    </div>
  );
}

type QuoteLinkProps = {
  variant?: ButtonVariant;
  className?: string;
};

export function QuoteLink({ variant = "primary", className }: QuoteLinkProps) {
  const { quote } = useContent();
  return (
    <a className={buttonClasses(variant, className)} href={CONTACT_MAILTO}>
      {quote}
      <CalendarDays size={16} strokeWidth={1.8} aria-hidden="true" />
    </a>
  );
}

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  return (
    <MotionBox className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </MotionBox>
  );
}

type StateCopyProps = {
  title: string;
  description: string;
};

export function StateCopy({ title, description }: StateCopyProps) {
  return (
    <>
      <h1>{title}</h1>
      <p className="state-text">{description}</p>
    </>
  );
}

export function StatePanel({ children, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <section className="state-panel" {...props}>
      <Container>{children}</Container>
    </section>
  );
}
