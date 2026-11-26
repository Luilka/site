import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductCard, WorkCard } from "@/components/cards.tsx";
import ProductDetail from "@/routes/[lang]/products/[slug].tsx";
import ServiceDetail from "@/routes/[lang]/services/[slug].tsx";
import WorkDetail from "@/routes/[lang]/work/[slug].tsx";
import { coverName } from "@/shared/utils/cover-name.util.ts";
import { SAMPLE_IMAGE } from "./fixtures.ts";

describe("cover images", () => {
  it("shows the cover of a case on its card, sized and loaded late", () => {
    const { container } = render(<WorkCard slug="yano" name="Yano" kind="UX Design" image={SAMPLE_IMAGE} />);
    const cover = container.querySelector("img");
    expect(cover?.getAttribute("src")).toBe("/images/work/sample.svg");
    expect(cover?.getAttribute("width")).toBe("1200");
    expect(cover?.getAttribute("height")).toBe("750");
    expect(cover?.getAttribute("loading")).toBe("lazy");
    expect(cover?.getAttribute("alt")).toBe("");
  });

  it.each([
    ["work", <WorkCard key="w" slug="yano" name="Yano" kind="UX Design" image={SAMPLE_IMAGE} />],
    ["product", <ProductCard key="p" slug="tala" name="Tala" description="Texte" image={SAMPLE_IMAGE} />],
  ])("fills the whole %s card with the cover and lays the text over it", (_name, card) => {
    const { container } = render(card);
    const link = container.querySelector("a");
    expect(link?.className).toContain("relative");
    expect(link?.className).toContain("overflow-hidden");
    const cover = link?.querySelector("img")?.className ?? "";
    for (const name of ["absolute", "inset-0", "size-full", "object-cover"]) expect(cover).toContain(name);
    const info = link?.lastElementChild?.className ?? "";
    expect(info).toContain("absolute");
    expect(info).toContain("backdrop-blur");
  });

  it("shows the cover of a product on its card", () => {
    const { container } = render(<ProductCard slug="tala" name="Tala" description="Texte" image={SAMPLE_IMAGE} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/images/work/sample.svg");
  });

  it("names the cover of a work or a product the same way on the card and on the page", () => {
    expect(coverName("work", "yano")).toBe("cover-work-yano");
    expect(coverName("products", "tala")).toBe("cover-products-tala");
  });

  it("shows the cover of a case at the top of its page, loaded at once", () => {
    const { container } = render(<WorkDetail lang="fr" slug="yano" />);
    const cover = container.querySelector("img");
    expect(cover?.getAttribute("src")).toBe("/images/work/yano.svg");
    expect(cover?.getAttribute("loading")).toBe("eager");
    expect(cover?.getAttribute("fetchpriority")).toBe("high");
  });

  it("shows the cover of a product at the top of its page", () => {
    const { container } = render(<ProductDetail lang="fr" slug="vuga" />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/images/products/vuga.svg");
  });

  it("does not repeat the description of a case or a service in a second card", () => {
    render(<WorkDetail lang="fr" slug="yano" />);
    expect(screen.getAllByText("UX Design: mobile App")).toHaveLength(1);
    render(<ServiceDetail lang="fr" slug="software" />);
    expect(screen.getAllByText(/Nous construisons l'application/)).toHaveLength(1);
  });

  it("leads back to the list of the kind", () => {
    render(<WorkDetail lang="fr" slug="yano" />);
    expect(screen.getByRole("link", { name: /Nos réalisations/ }).getAttribute("href")).toBe("/fr/works");
  });
});
