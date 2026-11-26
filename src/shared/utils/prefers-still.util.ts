import type { SaveDataConnection } from "@/shared/types";

/** True when the visitor asked for less motion or turned on data saving, so nothing should start moving by itself. */
export function prefersStill(): boolean {
  const reduced = globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true;
  const connection = (navigator as { connection?: SaveDataConnection }).connection;
  return reduced || connection?.saveData === true;
}
