import { useEffect, useState } from "react";
import type { ReelState } from "@/shared/types";
import { prefersStill } from "@/shared/utils/prefers-still.util.ts";

const SLIDE_DELAY = 4000;

function useTicker(count: number, paused: boolean, next: () => void): void {
  useEffect(() => {
    if (paused || count < 2) return;
    const timer = setInterval(next, SLIDE_DELAY);
    return () => clearInterval(timer);
  }, [count, paused, next]);
}

/** Steps through `count` slides on a timer, unless the visitor prefers stillness or pauses it. */
export function useReel(count: number): ReelState {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => setPaused(prefersStill()), []);
  useTicker(count, paused, () => setIndex((current) => (current + 1) % count));
  return { index, paused, toggle: () => setPaused(!paused) };
}
