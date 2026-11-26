import { useEffect, useRef, useState, type RefObject } from "react";
import type { VideoPlayback } from "@/shared/types";
import { prefersStill } from "@/shared/utils/prefers-still.util.ts";

function usePlayback(ref: RefObject<HTMLVideoElement | null>, paused: boolean): void {
  useEffect(() => {
    if (paused) ref.current?.pause();
    else void ref.current?.play()?.catch(() => undefined);
  }, [paused, ref]);
}

/** Plays a silent video, unless the visitor prefers stillness or pauses it; a blocked autoplay leaves the poster. */
export function useVideoPlayback(): VideoPlayback {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => setPaused(prefersStill()), []);
  usePlayback(ref, paused);
  return { ref, paused, toggle: () => setPaused(!paused) };
}
