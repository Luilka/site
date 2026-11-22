import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import SiteHeader from "@/components/patterns/site-header.tsx";
import { languageFromPathname, legacyRedirectTarget, localizedHref, pageFromPathname, useLanguageRedirect } from "@/i18n";
import About from "@/routes/[lang]/about.tsx";

function setPathname(pathname: string): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname,
    search: "",
    hash: "",
    params: {},
  };
}

function RedirectProbe() {
  useLanguageRedirect();
  return null;
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).__NEXY_LOCATION__;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("language in the URL", () => {
  it("reads the language from the first path segment", () => {
    expect(languageFromPathname("/en/about")).toBe("en");
    expect(languageFromPathname("/fr/about")).toBe("fr");
    expect(languageFromPathname("/about")).toBe("fr");
  });

  it("keeps the page path when switching language", () => {
    expect(pageFromPathname("/en/about")).toBe("/about");
    expect(localizedHref("/about", "fr")).toBe("/fr/about");
    expect(localizedHref("/about", "en")).toBe("/en/about");
  });

  it("renders English copy from an English URL", () => {
    setPathname("/en/about");
    render(<About />);
    expect(screen.getByRole("heading", { level: 1, name: /A community that grows code/ })).toBeTruthy();
  });

  it("points the language switch at the same page in the other language", () => {
    setPathname("/fr/about");
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "Passer en anglais" }).getAttribute("href")).toBe("/en/about");
  });

  it("keeps external links outside the language prefix", () => {
    expect(localizedHref("https://github.com/Luilka/site", "en")).toBe("https://github.com/Luilka/site");
  });

  it("builds redirect targets from the client language", () => {
    expect(legacyRedirectTarget("/", "fr")).toBe("/fr");
    expect(legacyRedirectTarget("/about", "fr")).toBe("/fr/about");
    expect(legacyRedirectTarget("/", "en")).toBe("/en");
    expect(legacyRedirectTarget("/about", "en")).toBe("/en/about");
    expect(legacyRedirectTarget("/fr/about", "en")).toBeNull();
    expect(legacyRedirectTarget("/en/about", "fr")).toBeNull();
  });

  it("redirects unprefixed URLs to the client language", () => {
    const replace = vi.fn();
    vi.stubGlobal("location", { replace });
    vi.stubGlobal("navigator", { language: "en-US", languages: ["en-US", "en"] });
    setPathname("/about");
    render(<RedirectProbe />);
    expect(replace).toHaveBeenCalledWith("/en/about");
  });
});
