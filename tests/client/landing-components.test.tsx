import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer, Header } from "@/components/layout.tsx";
import { ProcessBand } from "@/components/patterns.tsx";
import { ProductCard, ServiceCard, StepCard, WorkCard } from "@/components/cards.tsx";
import { SAMPLE_IMAGE } from "./fixtures.ts";

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
    expect(screen.getAllByText("Production")).toHaveLength(2);
  });

  it("loops the band as a marquee that reduced motion turns off", () => {
    const { container } = render(<ProcessBand />);
    const track = container.querySelector(".animate-marquee");
    expect(track?.className).toContain("motion-reduce:animate-none");
    expect(track?.className).toContain("hover:[animation-play-state:paused]");
  });

  it("repeats the stages once for a seamless loop and shows them once without motion", () => {
    const { container } = render(<ProcessBand />);
    const track = container.querySelector(".animate-marquee");
    expect(track?.children).toHaveLength(2);
    expect(track?.children[0].className).not.toContain("motion-reduce:hidden");
    expect(track?.children[1].className).toContain("motion-reduce:hidden");
  });

  it("keeps the band inside the viewport", () => {
    const { container } = render(<ProcessBand />);
    expect(container.firstElementChild?.className).toContain("overflow-x-clip");
  });

  it("gives the tilted band a pattern of oblique lines", () => {
    const { container } = render(<ProcessBand reverse />);
    const tilted = container.querySelector('[class*="rotate-2"]');
    expect(tilted?.className).toContain("repeating-linear-gradient(45deg");
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
    render(<ProductCard slug="product" name="Tala" description="Texte" image={SAMPLE_IMAGE} />);
    expect(screen.getByText("Tala")).toBeTruthy();
  });

  it("renders a case study", () => {
    render(<WorkCard slug="work" name="Yano" image={SAMPLE_IMAGE} />);
    expect(screen.getByText("Yano")).toBeTruthy();
  });

  it("renders the copyright line with the current year", () => {
    vi.useFakeTimers({ toFake: ["Date"], now: new Date("2031-06-15") });
    render(<Footer />);
    expect(screen.getByText("Copyright 2031 Luilka. Tous droits réservés.")).toBeTruthy();
  });
});
