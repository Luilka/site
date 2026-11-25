import { useState } from "react";

import { useDismiss } from "./use-dismiss.ts";

export type OpenMenu = {
  current: string | null;
  open: (menu: string) => void;
  close: () => void;
  onBlur: ReturnType<typeof useDismiss>["onBlur"];
};

/** Tracks which navigation menu is open, if any. */
export function useOpenMenu(): OpenMenu {
  const [current, setCurrent] = useState<string | null>(null);
  const close = () => setCurrent(null);
  const { onBlur } = useDismiss(close);
  return { current, open: setCurrent, close, onBlur };
}
