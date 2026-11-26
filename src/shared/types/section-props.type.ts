import type { SectionAction } from "./dictionaries.type.ts";

export type SectionProps = {
  id?: string;
  title: string;
  description: string;
  action?: SectionAction;
};
