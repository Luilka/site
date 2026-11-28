import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer } from "@/components/layout.tsx";
import socialData from "@/content/social.json";

describe("social content of the studio", () => {
  it("has a LinkedIn address on the company page", () => {
    expect(socialData.linkedin.startsWith("https://www.linkedin.com/company/")).toBe(true);
  });

  it("links that LinkedIn page from the footer", () => {
    (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname: "/fr", search: "", hash: "", params: {} };
    render(<Footer />);
    const link = screen.getByRole("link", { name: "Luilka sur LinkedIn" });
    expect(link.getAttribute("href")).toBe(socialData.linkedin);
  });
});
