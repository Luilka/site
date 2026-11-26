import type { FocusEvent } from "react";

export type OpenMenu = {
  current: string | null;
  open: (menu: string) => void;
  close: () => void;
  onBlur: (event: FocusEvent<HTMLElement>) => void;
};
