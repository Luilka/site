import { useState } from "react";
import type { OpenMenu } from "@/shared/types";

import { useDismiss } from "./use-dismiss.hook.ts";

/** Tracks which navigation menu is open, if any. */
export function useOpenMenu(): OpenMenu {
  const [current, setCurrent] = useState<string | null>(null);
  const close = () => setCurrent(null);
  const { onBlur } = useDismiss(close);
  return { current, open: setCurrent, close, onBlur };
}
