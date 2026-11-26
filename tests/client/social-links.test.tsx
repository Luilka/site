import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "@/components/layout.tsx";

vi.mock("@/content/social.json", () => ({
  default: {
    linkedin: "https://www.linkedin.com/company/exemple",
    tiktok: "",
    youtube: "https://www.youtube.com/@exemple",
  },
}));

function renderAt(pathname: string) {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
  return render(<Footer />);
}

describe("social links of the footer", () => {
  it("shows a link for each network that has an address, in a fixed order", () => {
    renderAt("/fr");
    const labels = ["Luilka sur LinkedIn", "Luilka sur YouTube"];
    for (const label of labels) {
      expect(screen.getByRole("link", { name: label })).toBeTruthy();
    }
    expect(screen.queryByRole("link", { name: /TikTok/ })).toBeNull();
  });

  it("opens the profile in a new tab without giving it the opener", () => {
    renderAt("/fr");
    const link = screen.getByRole("link", { name: "Luilka sur LinkedIn" });
    expect(link.getAttribute("href")).toBe("https://www.linkedin.com/company/exemple");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("draws the brand icon inline and hides it from assistive technology", () => {
    renderAt("/fr");
    const icon = screen.getByRole("link", { name: "Luilka sur YouTube" }).querySelector("svg");
    expect(icon?.getAttribute("aria-hidden")).toBe("true");
    expect(icon?.querySelector("path")?.getAttribute("d")?.startsWith("M23.498 6.186")).toBe(true);
  });

  it("names the links in English on an English page", () => {
    renderAt("/en");
    expect(screen.getByRole("link", { name: "Luilka on LinkedIn" })).toBeTruthy();
  });

  it("draws every footer link as a round button with a thin border, like the mockup", () => {
    renderAt("/fr");
    const mail = screen.getByRole("link", { name: "J'ai besoin d'un devis" });
    for (const link of [mail, screen.getByRole("link", { name: "Luilka sur LinkedIn" })]) {
      expect(link.className).toContain("rounded-full");
      expect(link.className).toContain("border-[var(--border-ui)]");
    }
  });

  it("keeps the email link first and gives every link a target of 44 pixels", () => {
    renderAt("/fr");
    const group = screen.getByRole("link", { name: "J'ai besoin d'un devis" }).parentElement;
    expect(within(group as HTMLElement).getAllByRole("link")).toHaveLength(3);
    expect(screen.getByRole("link", { name: "Luilka sur LinkedIn" }).className).toContain("size-11");
  });
});
