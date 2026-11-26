import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconSprite, Header } from "@/components/layout.tsx";
import { ProductCard, ServiceCard, WorkCard } from "@/components/cards.tsx";

function iconClasses(container: HTMLElement, selector: string) {
  return Array.from(container.querySelectorAll(selector)).map((node) => node.getAttribute("class") ?? "");
}

describe("design consistency", () => {
  it("keeps punctuation out of the header", () => {
    const { container } = render(<Header />);
    expect(container.textContent).not.toContain("!");
  });

  it("routes links through the Nexy Link component", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("a")?.getAttribute("data-nexy-link")).toBe("true");
  });

  it("marks every header control with the pointer utility", () => {
    const { container } = render(<Header />);
    const controls = Array.from(container.querySelectorAll("a, button"));
    expect(controls.length).toBeGreaterThan(0);
    for (const control of controls) {
      expect(control.className).toContain("cursor-pointer");
    }
  });

  it("keeps both dropdowns without punctuation in their labels", () => {
    render(<Header />);
    for (const label of ["Services", "Produits"]) {
      const trigger = screen.getByRole("link", { name: label });
      expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    }
  });

  it("gives each service a distinct design icon", () => {
    const { container } = render(
      <>
        <ServiceCard slug="service" title="UX Design" description="a" />
        <ServiceCard slug="service" title="UI design" description="b" />
        <ServiceCard slug="service" title="Software" description="c" />
        <ServiceCard slug="service" title="COM" description="d" />
      </>,
    );
    expect(new Set(iconClasses(container, "a > div:first-child svg")).size).toBe(4);
  });

  it("gives each product a distinct design icon", () => {
    const { container } = render(
      <>
        <ProductCard slug="product" name="Tala" description="a" />
        <ProductCard slug="product" name="Vuga" description="b" />
        <ProductCard slug="product" name="Pro" description="c" />
      </>,
    );
    expect(new Set(iconClasses(container, "a .icon-tile svg")).size).toBe(3);
  });

  it("uses a readable project icon beside the work name", () => {
    const { container } = render(<WorkCard slug="work" name="Yano" />);
    const icon = container.querySelector("a > div:last-child > div:first-child > div:first-child svg");
    expect(icon?.getAttribute("width")).toBe("22");
  });

  it("gives each case study a distinct design icon", () => {
    const { container } = render(
      <>
        <WorkCard slug="work" name="Yano" />
        <WorkCard slug="work" name="Vox Congo" />
        <WorkCard slug="work" name="Mitemo" />
        <WorkCard slug="work" name="Privatis Capital Invest" />
      </>,
    );
    expect(new Set(iconClasses(container, "a > div:last-child > div:first-child > div:first-child svg")).size).toBe(4);
  });

  it("keeps only the supplied fingerprint in the sprite", () => {
    const { container } = render(<IconSprite />);
    expect(container.querySelectorAll("symbol")).toHaveLength(1);
    expect(container.querySelector("symbol#finger")).not.toBeNull();
  });
});
