import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import IconSprite from "@/components/patterns/icon-sprite.tsx";
import ProductCard from "@/components/patterns/product-card.tsx";
import ServiceCard from "@/components/patterns/service-card.tsx";
import SiteHeader from "@/components/patterns/site-header.tsx";
import WorkCard from "@/components/patterns/work-card.tsx";

function iconClasses(container: HTMLElement, selector: string) {
  return Array.from(container.querySelectorAll(selector)).map((node) => node.getAttribute("class") ?? "");
}

describe("design consistency", () => {
  it("keeps punctuation out of the header", () => {
    const { container } = render(<SiteHeader />);
    expect(container.textContent).not.toContain("!");
  });

  it("routes links through the Nexy Link component", () => {
    const { container } = render(<SiteHeader />);
    expect(container.querySelector("a")?.getAttribute("data-nexy-link")).toBe("true");
  });

  it("marks every header control with the pointer utility", () => {
    const { container } = render(<SiteHeader />);
    const controls = Array.from(container.querySelectorAll("a, button"));
    expect(controls.length).toBeGreaterThan(0);
    for (const control of controls) {
      expect(control.className).toContain("cursor-pointer");
    }
  });

  it("keeps both dropdowns without punctuation in their labels", () => {
    render(<SiteHeader />);
    for (const label of ["Services", "Products"]) {
      const trigger = screen.getByRole("link", { name: label });
      expect(trigger.getAttribute("aria-haspopup")).toBe("true");
    }
  });

  it("gives each service a distinct design icon", () => {
    const { container } = render(
      <>
        <ServiceCard title="Design" description="a" />
        <ServiceCard title="Software" description="b" />
        <ServiceCard title="Maintenance" description="c" />
        <ServiceCard title="Devops" description="d" />
      </>,
    );
    expect(new Set(iconClasses(container, ".svc .ico svg")).size).toBe(4);
  });

  it("gives each product a distinct design icon", () => {
    const { container } = render(
      <>
        <ProductCard name="Tala" description="a" />
        <ProductCard name="Vuga" description="b" />
        <ProductCard name="Pro" description="c" />
      </>,
    );
    expect(new Set(iconClasses(container, ".prod .mini svg")).size).toBe(3);
  });

  it("gives each case study a distinct design icon", () => {
    const { container } = render(
      <>
        <WorkCard name="Yano" />
        <WorkCard name="Vox Congo" />
        <WorkCard name="AyLen" />
      </>,
    );
    expect(new Set(iconClasses(container, ".work .mini svg")).size).toBe(3);
  });

  it("keeps only the supplied fingerprint in the sprite", () => {
    const { container } = render(<IconSprite />);
    expect(container.querySelectorAll("symbol")).toHaveLength(1);
    expect(container.querySelector("symbol#finger")).not.toBeNull();
  });
});
