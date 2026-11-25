import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import IconSprite from "@/components/layout/icon-sprite.tsx";
import ProcessBand from "@/components/patterns/process-band.tsx";
import ProductCard from "@/components/cards/product-card.tsx";
import ServiceCard from "@/components/cards/service-card.tsx";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import StepCard from "@/components/cards/step-card";
import WorkCard from "@/components/cards/work-card.tsx";

describe("landing components", () => {
  it("defines the reference icons", () => {
    const { container } = render(<IconSprite />);
    expect(container.querySelector("symbol#finger")).not.toBeNull();
  });

  it("uses the supplied fingerprint as the logo", () => {
    const { container } = render(<IconSprite />);
    const path = container.querySelector("symbol#finger path");
    expect(path?.getAttribute("d")).toBe(
      "M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
    );
    expect(path?.getAttribute("stroke-width")).toBe("1.5");
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
