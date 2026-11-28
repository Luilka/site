import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ConsentBanner, Trackers } from "@/components/patterns.tsx";
import { analyticsPlan } from "@/shared/utils/analytics-plan.util.ts";
import type { AnalyticsSettings } from "@/shared/types";

const SETTINGS: AnalyticsSettings = { vercel: true, speedInsights: true, plausibleDomain: "luilka.example", googleAnalyticsId: "" };
const WITH_GOOGLE: AnalyticsSettings = { ...SETTINGS, googleAnalyticsId: "G-ABC123XYZ9" };

beforeEach(() => {
  localStorage.clear();
  document.head.innerHTML = "";
  document.body.innerHTML = "";
});

afterEach(() => localStorage.clear());

describe("analytics plan", () => {
  it("loads the cookie free tools whatever the visitor said", () => {
    const plan = analyticsPlan(SETTINGS, "unknown");
    expect(plan).toMatchObject({ vercel: true, speedInsights: true, plausibleDomain: "luilka.example", googleId: "", askConsent: false });
  });

  it("neither loads Google Analytics nor asks while the stored answer is still being read", () => {
    expect(analyticsPlan(WITH_GOOGLE, "pending")).toMatchObject({ googleId: "", askConsent: false });
  });

  it("loads nothing for an empty field", () => {
    const plan = analyticsPlan({ vercel: false, speedInsights: false, plausibleDomain: "", googleAnalyticsId: "" }, "granted");
    expect(plan).toEqual({ vercel: false, speedInsights: false, plausibleDomain: "", googleId: "", askConsent: false });
  });

  it("holds Google Analytics back until the visitor accepts, and asks once", () => {
    expect(analyticsPlan(WITH_GOOGLE, "unknown")).toMatchObject({ googleId: "", askConsent: true });
    expect(analyticsPlan(WITH_GOOGLE, "denied")).toMatchObject({ googleId: "", askConsent: false });
    expect(analyticsPlan(WITH_GOOGLE, "granted")).toMatchObject({ googleId: "G-ABC123XYZ9", askConsent: false });
  });

  it("refuses an identifier that is not a Google measurement id", () => {
    const plan = analyticsPlan({ ...SETTINGS, googleAnalyticsId: "G-1');alert(1);//" }, "granted");
    expect(plan.googleId).toBe("");
  });
});

describe("trackers", () => {
  it("loads Plausible for the domain and nothing for Google when no id is set", () => {
    render(<Trackers settings={SETTINGS} />);
    const plausible = document.querySelector("script[data-domain='luilka.example']");
    expect(plausible?.getAttribute("src")).toBe("https://plausible.io/js/script.js");
    expect(document.querySelector("script[src*='googletagmanager']")).toBeNull();
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("does not load Google Analytics before consent, and loads it after the visitor accepts", () => {
    render(<Trackers settings={WITH_GOOGLE} />);
    expect(document.querySelector("script[src*='googletagmanager']")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Accepter" }));
    expect(document.querySelector("script[src*='googletagmanager.com/gtag/js?id=G-ABC123XYZ9']")).not.toBeNull();
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("keeps Google Analytics off after a refusal and remembers the choice", () => {
    const view = render(<Trackers settings={WITH_GOOGLE} />);
    fireEvent.click(screen.getByRole("button", { name: "Refuser" }));
    expect(document.querySelector("script[src*='googletagmanager']")).toBeNull();
    expect(localStorage.getItem("luilka-consent")).toBe("denied");
    view.unmount();
    render(<Trackers settings={WITH_GOOGLE} />);
    expect(screen.queryByRole("complementary")).toBeNull();
  });

  it("loads Google Analytics straight away for a visitor who accepted before", () => {
    localStorage.setItem("luilka-consent", "granted");
    render(<Trackers settings={{ ...SETTINGS, googleAnalyticsId: "G-ZZZ999AAA1" }} />);
    expect(document.querySelector("script[src*='googletagmanager.com/gtag/js?id=G-ZZZ999AAA1']")).not.toBeNull();
    expect(screen.queryByRole("complementary")).toBeNull();
  });
});

describe("consent banner", () => {
  it("names the tool and offers one accept and one refuse action", () => {
    render(<ConsentBanner onAccept={() => undefined} onRefuse={() => undefined} />);
    expect(screen.getByRole("complementary").textContent).toContain("Google Analytics");
    expect(screen.getByRole("button", { name: "Accepter" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Refuser" })).toBeTruthy();
  });
});
