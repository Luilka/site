import { useEffect, useState } from "react";

/** False on the server and on the first client render, true afterwards, so a value that depends on the real address is written once the page is mounted. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
