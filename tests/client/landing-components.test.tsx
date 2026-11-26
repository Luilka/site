import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconSprite, Footer, Header } from "@/components/layout.tsx";
import { ProcessBand } from "@/components/patterns.tsx";
import { ProductCard, ServiceCard, StepCard, WorkCard } from "@/components/cards.tsx";

describe("landing components", () => {
  it("defines the reference icons", () => {
    const { container } = render(<IconSprite />);
    expect(container.querySelector("symbol#finger")).not.toBeNull();
  });

  it("uses the supplied solid fingerprint as the logo", () => {
    const { container } = render(<IconSprite />);
    const path = container.querySelector("symbol#finger path");
    expect(path?.getAttribute("d")?.startsWith("M12 3.75a6.715 6.715 0 0 0-3.722 1.118")).toBe(true);
    expect(path?.getAttribute("fill")).toBe("currentColor");
    expect(path?.getAttribute("fill-rule")).toBe("evenodd");
    expect(path?.getAttribute("stroke")).toBeNull();
  });

  it("renders every reference navigation label", () => {
    render(<Header />);
    expect(screen.getByText("Job")).toBeTruthy();
  });

  it("renders the process band", () => {
    render(<ProcessBand />);
    expect(screen.getByText("Production")).toBeTruthy();
  });

  it("renders a numbered stage", () => {
    render(<StepCard number="01" title="Cadrage" description="Texte" />);
    expect(screen.getByText("01")).toBeTruthy();
  });

  it("renders a service", () => {
    render(<ServiceCard slug="service" title="Design" description="Texte" />);
    expect(screen.getByText("Design")).toBeTruthy();
  });

  it("renders a product", () => {
    render(<ProductCard slug="product" name="Tala" description="Texte" />);
    expect(screen.getByText("Tala")).toBeTruthy();
  });

  it("renders a case study", () => {
    render(<WorkCard slug="work" name="Yano" />);
    expect(screen.getByText("Yano")).toBeTruthy();
  });

  it("renders the copyright line", () => {
    render(<Footer />);
    expect(screen.getByText(/Tous droits réservés à Luilka/)).toBeTruthy();
  });
});
