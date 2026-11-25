import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Blog from "@/routes/[lang]/blog/index.tsx";
import BlogDetail from "@/routes/[lang]/blog/[slug].tsx";
import Home from "@/routes/[lang]/index.tsx";
import ProductDetail from "@/routes/[lang]/products/[slug].tsx";
import ServiceDetail from "@/routes/[lang]/services/[slug].tsx";
import WorkDetail from "@/routes/[lang]/work/[slug].tsx";

function setLanguage(language: "fr" | "en"): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname: `/${language}`,
    search: "",
    hash: "",
    params: {},
  };
}

const unknownDetails = [
  { name: "blog", element: <BlogDetail lang="fr" slug="inconnu" /> },
  { name: "work", element: <WorkDetail lang="fr" slug="inconnu" /> },
  { name: "products", element: <ProductDetail lang="fr" slug="inconnu" /> },
  { name: "services", element: <ServiceDetail lang="fr" slug="inconnu" /> },
];

describe("dynamic detail pages", () => {
  it("renders a French work detail", () => {
    setLanguage("fr");
    render(<WorkDetail lang="fr" slug="yano" />);
    expect(screen.getByRole("heading", { level: 1, name: "Yano" })).toBeTruthy();
    expect(screen.getByText("UX Design: mobile App")).toBeTruthy();
  });

  it("renders an English service detail", () => {
    setLanguage("en");
    render(<ServiceDetail lang="en" slug="software" />);
    expect(screen.getByRole("heading", { level: 1, name: "Software" })).toBeTruthy();
    expect(screen.getAllByText(/We build the app/).length).toBeGreaterThan(0);
  });

  it.each(unknownDetails)("shows the 404 for an unknown $name slug", ({ element }) => {
    setLanguage("fr");
    render(element);
    expect(screen.getByRole("heading", { level: 1, name: "Cette page n'existe pas" })).toBeTruthy();
  });

  it("renders the 404 instead of the home for an unknown language", () => {
    render(<Home lang="about" />);
    expect(screen.getByRole("heading", { level: 1, name: "Cette page n'existe pas" })).toBeTruthy();
  });

  it("links the home cards to their detail pages", () => {
    const { container } = render(<Home />);
    for (const href of ["/fr/work/yano", "/fr/products/tala", "/fr/services/ux-design"]) {
      expect(container.querySelector(`a[href="${href}"]`)).not.toBeNull();
    }
  });

  it("links the blog cards to their detail pages", () => {
    setLanguage("fr");
    const { container } = render(<Blog />);
    expect(container.querySelector('a[href="/fr/blog/livrer-par-etapes"]')).not.toBeNull();
  });
});
