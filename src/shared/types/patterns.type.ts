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

export type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProcessStageProps = {
  label: string;
  last: boolean;
};

export type ProcessBandProps = {
  reverse?: boolean;
};

export type QuoteLinkProps = {
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
