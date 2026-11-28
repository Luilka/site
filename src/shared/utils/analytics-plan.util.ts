import type { AnalyticsPlan, AnalyticsSettings, Consent } from "@/shared/types";

const GOOGLE_ID = /^G-[A-Z0-9]{4,20}$/;

function googleId(settings: AnalyticsSettings): string {
  return GOOGLE_ID.test(settings.googleAnalyticsId) ? settings.googleAnalyticsId : "";
}

/** Decides what to load: the cookie free tools always, Google Analytics only once the visitor accepted. */
export function analyticsPlan(settings: AnalyticsSettings, consent: Consent): AnalyticsPlan {
  const id = googleId(settings);
  const { vercel, speedInsights, plausibleDomain } = settings;
  return { vercel, speedInsights, plausibleDomain, googleId: consent === "granted" ? id : "", askConsent: id !== "" && consent === "unknown" };
}
