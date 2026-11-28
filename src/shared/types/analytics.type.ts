export type AnalyticsSettings = {
  vercel: boolean;
  speedInsights: boolean;
  plausibleDomain: string;
  googleAnalyticsId: string;
};

export type Consent = "pending" | "unknown" | "granted" | "denied";

export type AnalyticsPlan = {
  vercel: boolean;
  speedInsights: boolean;
  plausibleDomain: string;
  googleId: string;
  askConsent: boolean;
};

export type ConsentCopy = {
  label: string;
  text: string;
  accept: string;
  refuse: string;
};

export type ConsentState = {
  consent: Consent;
  accept: () => void;
  refuse: () => void;
};
