import { useRef, useState } from "react";
import type { MobileMenuState } from "@/shared/types";

import { useDismiss } from "./use-dismiss.hook.ts";

/** Tracks the mobile menu: it closes when focus leaves it, and on Escape the focus returns to its button. */
export function useMobileMenu(): MobileMenuState {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  const escape = () => { close(); trigger.current?.focus(); };
  const { onBlur } = useDismiss(close);
  const { onKeyDown } = useDismiss(escape);
  return { open, close, toggle: () => setOpen(!open), onBlur, onKeyDown, trigger };
}
