import type { ReactNode } from "react";

export type ErrorsProps = {
  reset?: () => void;
};

export type DocumentProps = {
  language: string;
  children: ReactNode;
};

export type RootLayoutProps = {
  children: ReactNode;
};

export type HomeProps = {
  lang?: string;
};
