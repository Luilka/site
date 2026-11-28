import { useEffect, useRef, useState, type RefObject } from "react";
import type { MobileMenuState } from "@/shared/types";

import { useDismiss } from "./use-dismiss.hook.ts";

function useSheetEffects(open: boolean, panel: RefObject<HTMLDivElement | null>): void {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const timer = setTimeout(() => open && panel.current?.focus(), 50);
    return () => { clearTimeout(timer); document.body.style.overflow = ""; };
  }, [open, panel]);
}

/** Tracks the mobile sheet: it locks the page scroll and takes the focus while open, and closes when focus leaves it or on Escape. */
export function useMobileMenu(): MobileMenuState {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);
  const { onBlur } = useDismiss(close);
  const { onKeyDown } = useDismiss(() => { close(); trigger.current?.focus(); });
  useSheetEffects(open, panel);
  return { open, close, toggle: () => setOpen(!open), onBlur, onKeyDown, trigger, panel };
}
