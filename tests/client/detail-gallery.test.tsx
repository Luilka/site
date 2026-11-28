import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProductDetail from "@/routes/[lang]/products/[slug].tsx";
import ServiceDetail from "@/routes/[lang]/services/[slug].tsx";
import WorkDetail from "@/routes/[lang]/work/[slug].tsx";
import { galleryRows } from "@/shared/utils/gallery-rows.util.ts";

const image = (name: string) => ({ src: `/${name}.webp`, width: 1200, height: 800 });

describe("gallery rows", () => {
  it("alternates one wide picture and a pair, like the project pages of design studios", () => {
    const rows = galleryRows([image("a"), image("b"), image("c"), image("d")]);
    expect(Array.from(rows, (row) => row.length)).toEqual([1, 2, 1]);
  });

  it("keeps the order of the pictures and handles a short or empty list", () => {
    const names = ["a", "b", "c", "d", "e", "f"];
    const rows = galleryRows(Array.from(names, image));
    expect(Array.from(rows.flat(), (item) => item.src)).toEqual(Array.from(names, (name) => `/${name}.webp`));
    expect(galleryRows([image("a")])).toHaveLength(1);
    expect(galleryRows([])).toEqual([]);
  });
});

describe("project page", () => {
  it("shows the cover, four more pictures of the project and the cover of the next one", () => {
    const { container } = render(<WorkDetail lang="fr" slug="yano" />);
    expect(container.querySelectorAll("img")).toHaveLength(6);
    expect(container.querySelector("img")?.getAttribute("loading")).toBe("eager");
    expect(container.querySelectorAll("[data-part='gallery-row'] img[loading='lazy']")).toHaveLength(4);
  });

  it("lays the gallery out as a wide picture, a pair, then a wide picture", () => {
    const { container } = render(<WorkDetail lang="fr" slug="yano" />);
    const rows = container.querySelectorAll("[data-part='gallery-row']");
    expect(Array.from(rows, (row) => row.children.length)).toEqual([1, 2, 1]);
    expect(rows[1]?.className).toContain("grid-cols-2");
  });

  it("gives every product a gallery of its own pictures", () => {
    const { container } = render(<ProductDetail lang="fr" slug="tala" />);
    const sources = Array.from(container.querySelectorAll("[data-part='gallery-row'] img"), (item) => item.getAttribute("src"));
    expect(sources).toHaveLength(4);
    expect(sources.every((source) => source?.includes("/images/gallery/tala-"))).toBe(true);
  });

  it("offers the next project and wraps to the first one after the last", () => {
    render(<WorkDetail lang="fr" slug="privatis-capital-invest" />);
    const link = screen.getByRole("link", { name: /Projet suivant/ });
    expect(link.getAttribute("href")).toBe("/fr/work/yano");
    expect(link.textContent).toContain("Yano");
  });

  it("names the next item in the language and the kind of the page", () => {
    (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname: "/en/products/tala", search: "", hash: "", params: {} };
    const product = render(<ProductDetail lang="en" slug="tala" />);
    expect(screen.getByRole("link", { name: /Next product/ }).getAttribute("href")).toBe("/en/products/vuga");
    product.unmount();
    (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname: "/fr/services/ux-design", search: "", hash: "", params: {} };
    render(<ServiceDetail lang="fr" slug="ux-design" />);
    expect(screen.getByRole("link", { name: /Service suivant/ })).toBeTruthy();
  });

  it("shows no gallery on a page that has no pictures", () => {
    const { container } = render(<ServiceDetail lang="fr" slug="ux-design" />);
    expect(container.querySelectorAll("[data-part='gallery-row']")).toHaveLength(0);
  });
});
