import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ProductDetail from "@/routes/[lang]/products/[slug].tsx";
import ServiceDetail from "@/routes/[lang]/services/[slug].tsx";
import WorkDetail from "@/routes/[lang]/work/[slug].tsx";
import { storyBlocks } from "@/shared/utils/story-blocks.util.ts";

function at(pathname: string): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
}

afterEach(() => at("/fr"));

describe("story blocks", () => {
  it("pairs each section with the row of pictures that follows it, then keeps the extra rows", () => {
    const sections = [{ title: "A", paragraphs: ["a"] }, { title: "B", paragraphs: ["b"] }];
    const rows = [[{ src: "1", width: 1, height: 1 }], [{ src: "2", width: 1, height: 1 }], [{ src: "3", width: 1, height: 1 }]];
    const blocks = storyBlocks(sections, rows);
    expect(Array.from(blocks, (block) => [block.section?.title ?? null, block.row?.[0]?.src ?? null])).toEqual([["A", "1"], ["B", "2"], [null, "3"]]);
  });

  it("keeps a section that has no picture left", () => {
    const blocks = storyBlocks([{ title: "A", paragraphs: [] }, { title: "B", paragraphs: [] }], [[{ src: "1", width: 1, height: 1 }]]);
    expect(blocks).toHaveLength(2);
    expect(blocks[1]?.row).toBeUndefined();
  });
});

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

  it("summarises the product in facts: type, medium and who designed it", () => {
    const { container } = render(<ProductDetail lang="fr" slug="pro" />);
    const facts = container.querySelector("dl");
    expect(facts?.textContent).toContain("Réseau social professionnel");
    expect(facts?.textContent).toContain("Application mobile");
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

  it("puts a section before the pictures it comes with", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const heading = screen.getByRole("heading", { level: 2, name: "Le produit" });
    const firstRow = container.querySelector("[data-part='gallery-row']") as Element;
    expect(heading.compareDocumentPosition(firstRow) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
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
    expect(container.querySelector("dl")).toBeNull();
    expect(container.querySelectorAll("[data-part='story-section']")).toHaveLength(0);
  });
});
