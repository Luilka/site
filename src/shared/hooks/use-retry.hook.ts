import { useState } from "react";

/** Counts retries so a failed subtree is rebuilt from scratch. */
export function useRetry() {
  const [attempt, setAttempt] = useState(0);
  const retry = (reset: () => void) => {
    reset();
    setAttempt((value) => value + 1);
  };
  return { attempt, retry };
}
