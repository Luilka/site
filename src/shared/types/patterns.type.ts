import type { MetaLink, PageMeta } from "./meta.type.ts";
import type { VideoPlayback } from "./hooks.type.ts";
import type { PageKey, SectionAction } from "./dictionaries.type.ts";
import type { ReactNode } from "react";
import type { ButtonVariant } from "./ui.type.ts";

export type ActionLinkProps = {
  action: SectionAction;
  className?: string;
};

export type ContactPanelProps = {
  id?: string;
};

export type FeedbackBoundaryProps = {
  children: ReactNode;
};

export type PageFrameProps = {
  page: PageKey;
  children: ReactNode;
};

export type PageHeroTextProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export type BreadcrumbProps = {
  current: string;
};

export type PageTitleProps = {
  children: ReactNode;
  className?: string;
};

export type PageLeadProps = {
  children: ReactNode;
};

export type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProcessStageListProps = {
  className: string;
  reverse?: boolean;
};

export type StageLabelProps = {
  label: string;
  number: string;
};

export type ProcessStageProps = {
  label: string;
  number: string;
  last: boolean;
  reverse?: boolean;
};

export type ReelVideoProps = {
  player: VideoPlayback;
};

export type ReelSoundProps = {
  sound: boolean;
  onToggle: () => void;
};

export type ReelToggleProps = {
  paused: boolean;
  onToggle: () => void;
};

export type ProcessBandProps = {
  reverse?: boolean;
};

export type ContactButtonProps = {
  variant?: ButtonVariant;
  className?: string;
};

export type RevealProps = {
  children: ReactNode;
  className?: string;
};

export type StateCopyProps = {
  title: string;
  description: string;
};

export type MetaTagsProps = {
  meta: PageMeta;
};

export type MetaLinksProps = {
  links: readonly MetaLink[];
};

export type StructuredDataProps = {
  json: string | null;
};
