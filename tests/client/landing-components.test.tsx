import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer, Header } from "@/components/layout.tsx";
import { ProcessBand } from "@/components/patterns.tsx";
import { ProductCard, ServiceCard, StepCard, WorkCard } from "@/components/cards.tsx";

afterEach(() => {
  vi.useRealTimers();
});

describe("landing components", () => {
  it("renders every reference navigation label", () => {
    render(<Header />);
    const navigation = within(screen.getByRole("navigation", { name: "Navigation principale" }));
    expect(navigation.getByRole("link", { name: "Carrières" })).toBeTruthy();
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

  it("renders the copyright line with the current year", () => {
    vi.useFakeTimers({ toFake: ["Date"], now: new Date("2031-06-15") });
    render(<Footer />);
    expect(screen.getByText("Copyright 2031 Luilka. Tous droits réservés.")).toBeTruthy();
  });
});
