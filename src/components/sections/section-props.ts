import type { SectionAction } from "@/shared/i18n";

export type SectionProps = {
  id?: string;
  title: string;
  description: string;
  action?: SectionAction;
};
