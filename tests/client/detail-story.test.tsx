import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ProductDetail from "@/routes/[lang]/products/[slug].tsx";
import ServiceDetail from "@/routes/[lang]/services/[slug].tsx";
import WorkDetail from "@/routes/[lang]/work/[slug].tsx";

function at(pathname: string): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
}

afterEach(() => at("/fr"));

describe("product page content", () => {
  it("explains the product, what the interface shows and the design choices", () => {
    render(<ProductDetail lang="fr" slug="tala" />);
    for (const title of ["Le produit", "Ce que montre l'interface", "Nos choix de conception"]) {
      expect(screen.getByRole("heading", { level: 2, name: title })).toBeTruthy();
    }
    expect(screen.getByText(/Tala est une plateforme de streaming vidéo/)).toBeTruthy();
  });

  it("lists what the interface shows as bullet points", () => {
    render(<ProductDetail lang="fr" slug="vuga" />);
    const section = screen.getByRole("heading", { level: 2, name: "Ce que montre l'interface" }).parentElement as HTMLElement;
    expect(within(section).getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
  });

  it("summarises the product in fact pills laid on the cover, like the cards of the home page", () => {
    const { container } = render(<ProductDetail lang="fr" slug="pro" />);
    const facts = Array.from(container.querySelectorAll("[data-part='fact']"), (item) => item.textContent);
    expect(facts.join(" ")).toContain("Réseau social professionnel");
    expect(facts.join(" ")).toContain("Application mobile");
    expect(container.querySelector("[data-part='fact']")?.closest("[class*='backdrop-blur']")).not.toBeNull();
  });

  it("captions every picture of the gallery with what it shows", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const captions = Array.from(container.querySelectorAll("[data-part='gallery-row'] figcaption"), (item) => item.textContent);
    expect(captions).toHaveLength(4);
    expect(captions[0]).toContain("affiche à la une");
  });

  it("reads the text in the language of the page", () => {
    at("/en/products/tala");
    render(<ProductDetail lang="en" slug="tala" />);
    expect(screen.getByRole("heading", { level: 2, name: "The product" })).toBeTruthy();
    expect(screen.getByText(/Tala is a video streaming platform/)).toBeTruthy();
  });

  it("shows the text cards before the gallery", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Le produit" });
    const firstRow = container.querySelector("[data-part='gallery-row']") as Element;
    expect(heading.compareDocumentPosition(firstRow) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("writes the sections as numbered cards in the colours of the home page steps", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const cards = Array.from(container.querySelectorAll("[data-part='story-section']"));
    expect(cards).toHaveLength(3);
    expect(cards[0]?.className).toContain("bg-night");
    expect(cards[1]?.className).toContain("bg-gold");
    expect(cards[2]?.className).toContain("bg-gray");
    expect(Array.from(cards, (card) => card.querySelector("[data-part='story-number']")?.textContent)).toEqual(["01", "02", "03"]);
    expect(cards[0]?.querySelector("[data-part='story-number']")?.className).toContain("bg-grid");
  });

  it("separates the parts of the page with the process band, as the home page does", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    expect(container.querySelectorAll("[aria-hidden='true'] .lucide-motorbike").length).toBeGreaterThan(0);
    expect(container.querySelectorAll(".animate-marquee-right, .animate-marquee").length).toBeGreaterThanOrEqual(2);
  });

  it("puts the next item on a dark card like the contact card", () => {
    render(<ProductDetail lang="fr" slug="tala" />);
    expect(screen.getByRole("link", { name: /Produit suivant/ }).className).toContain("bg-night");
  });

  it("lays each caption on a glass panel over its picture", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const caption = container.querySelector("[data-part='gallery-row'] figcaption");
    expect(caption?.className).toContain("backdrop-blur");
    expect(caption?.className).toContain("absolute");
  });
});

describe("project page content", () => {
  it("states the mission and what the services cover, using only what the site already says", () => {
    render(<WorkDetail lang="fr" slug="vox-congo" />);
    expect(screen.getByRole("heading", { level: 2, name: "La mission" })).toBeTruthy();
    expect(screen.getByText(/Vox Congo est une application mobile/)).toBeTruthy();
    expect(screen.getAllByText(/Nous concevons des écrans clairs/).length).toBeGreaterThan(0);
  });

  it("lists the deliverables of a rebranding", () => {
    render(<WorkDetail lang="fr" slug="privatis-capital-invest" />);
    expect(screen.getByText(/La charte graphique/)).toBeTruthy();
    expect(screen.getByText(/Le système de design/)).toBeTruthy();
  });

  it("invents no client, year or result", () => {
    const { container } = render(<WorkDetail lang="fr" slug="mitemo" />);
    expect(container.textContent).not.toMatch(/\b(19|20)\d{2}\b|%|clients? satisfaits?|augmentation/i);
  });
});

describe("pages without a text of their own", () => {
  it("show no section and no facts", () => {
    at("/fr/services/ux-design");
    const { container } = render(<ServiceDetail lang="fr" slug="ux-design" />);
    expect(container.querySelectorAll("[data-part='fact']")).toHaveLength(0);
    expect(container.querySelectorAll("[data-part='story-section']")).toHaveLength(0);
  });
});
