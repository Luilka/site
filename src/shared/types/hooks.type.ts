import type { FocusEvent, KeyboardEvent, RefObject } from "react";

export type MobileMenuState = {
  open: boolean;
  close: () => void;
  toggle: () => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
  onKeyDown: (event: KeyboardEvent<HTMLElement>) => void;
  trigger: RefObject<HTMLButtonElement | null>;
  panel: RefObject<HTMLDivElement | null>;
};

export type OpenMenu = {
  current: string | null;
  open: (menu: string) => void;
  close: () => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
};
