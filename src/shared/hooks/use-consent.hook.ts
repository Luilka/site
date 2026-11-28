import { useEffect, useState } from "react";
import type { Consent, ConsentState } from "@/shared/types";

const KEY = "luilka-consent";

function stored(): Consent {
  try {
    const value = localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : "unknown";
  } catch {
    return "unknown";
  }
}

function save(consent: Consent): void {
  try {
    localStorage.setItem(KEY, consent);
  } catch {
    return;
  }
}

/** The visitor's answer about Google Analytics, kept in the browser. It is "pending" until the stored answer has been read after mount, so nothing flashes and the server and the first client render agree. */
export function useConsent(): ConsentState {
  const [consent, setConsent] = useState<Consent>("pending");
  useEffect(() => setConsent(stored()), []);
  const answer = (value: Consent) => () => { save(value); setConsent(value); };
  return { consent, accept: answer("granted"), refuse: answer("denied") };
}
