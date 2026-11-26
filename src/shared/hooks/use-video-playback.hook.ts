import { useEffect, useRef, useState, type RefObject } from "react";
import type { VideoPlayback } from "@/shared/types";
import { prefersStill } from "@/shared/utils/prefers-still.util.ts";

function useOnScreen(ref: RefObject<HTMLVideoElement | null>): boolean {
  const [visible, setVisible] = useState(typeof IntersectionObserver === "undefined");
  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") return;
    const watcher = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.5 });
    watcher.observe(ref.current);
    return () => watcher.disconnect();
  }, [ref]);
  return visible;
}

function usePlayback(ref: RefObject<HTMLVideoElement | null>, playing: boolean, sound: boolean, refuse: () => void): void {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.muted = !sound;
    if (playing) void video.play()?.catch(refuse);
    else video.pause();
  }, [ref, playing, sound, refuse]);
}

/** Plays the video only while it is on screen and not paused; its sound is off until the visitor turns it on. */
export function useVideoPlayback(): VideoPlayback {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [sound, setSound] = useState(false);
  const visible = useOnScreen(ref);
  useEffect(() => setPaused(prefersStill()), []);
  usePlayback(ref, visible && !paused, sound, () => setSound(false));
  return { ref, paused, sound, toggle: () => setPaused(!paused), toggleSound: () => setSound(!sound) };
}
