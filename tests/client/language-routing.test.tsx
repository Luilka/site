import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Header } from "@/components/layout.tsx";
import { languageFromPathname, localizedHref, pageFromPathname } from "@/shared/i18n";
import About from "@/routes/[lang]/about.tsx";
import Home from "@/routes/[lang]/index.tsx";
import RootHome from "@/routes/index.tsx";

function setPathname(pathname: string): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname,
    search: "",
    hash: "",
    params: {},
  };
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
    expect(screen.getByRole("heading", { level: 1, name: /A user-centric design studio/ })).toBeTruthy();
  });

  it("renders the four short service labels from an English URL", () => {
    setPathname("/en");
    render(<Home />);
    for (const label of ["UX Design", "UI design", "Software", "COM"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(
      screen.getByRole("heading", { level: 2, name: "Design the experience, write the product" }),
    ).toBeTruthy();
  });

  it("says the studio builds digital products in English", () => {
    setPathname("/en");
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).toContain(
      "We design, write and build digital products. Every service can also be booked on its own.",
    );
    for (const claim of [
      "We do not write code",
      "We do not develop the software",
      "We write no code",
    ]) {
      expect(text).not.toContain(claim);
    }
  });

  it("shows the work subtitles in English", () => {
    setPathname("/en");
    const { container } = render(<Home />);
    for (const subtitle of [
      "UX Design: Mobile App",
      "UX Design & UI Design: Mobile App",
      "Full Project & All Services",
      "Rebranding, Design System and Brand Guidelines",
    ]) {
      expect(screen.getAllByText(subtitle)).toHaveLength(1);
    }
    expect(container.querySelectorAll(".work .who p")).toHaveLength(0);
  });

  it("points the language switch at the same page in the other language", () => {
    setPathname("/fr/about");
    render(<Header />);
    expect(screen.getByRole("link", { name: "Passer en anglais" }).getAttribute("href")).toBe("/en/about");
  });

  it("keeps external links outside the language prefix", () => {
    expect(localizedHref("https://github.com/Luilka/site", "en")).toBe("https://github.com/Luilka/site");
  });

  it("renders the French home at the root without a redirect", () => {
    setPathname("/");
    render(<RootHome />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toContain("Agence de");
    expect(heading.textContent).toContain("reliant produit et");
  });
});
