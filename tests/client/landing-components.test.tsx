import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Footer, Header } from "@/components/layout.tsx";
import { ProcessBand } from "@/components/patterns.tsx";
import { ProcessSection } from "@/components/sections.tsx";
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
    const { container } = render(<ProcessBand />);
    expect(container.querySelectorAll("svg.lucide-rocket")).toHaveLength(2);
    expect(container.textContent).toBe("");
  });

  it("scrolls to the right, and a reversed band scrolls to the left", () => {
    const forward = render(<ProcessBand />).container;
    expect(forward.querySelector(".animate-marquee-right")).not.toBeNull();
    expect(forward.querySelector(".animate-marquee")).toBeNull();
    const reversed = render(<ProcessBand reverse />).container;
    expect(reversed.querySelector(".animate-marquee")).not.toBeNull();
  });

  it("loops the band as a marquee that reduced motion turns off", () => {
    const { container } = render(<ProcessBand />);
    const track = container.querySelector(".animate-marquee-right");
    expect(track?.className).toContain("motion-reduce:animate-none");
    expect(track?.className).toContain("hover:[animation-play-state:paused]");
  });

  it("repeats the stages once for a seamless loop and shows them once without motion", () => {
    const { container } = render(<ProcessBand />);
    const track = container.querySelector(".animate-marquee-right");
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

  it("colours the icon band very dark with light icons, keeps the tilted band grey, and scrolls its lines", () => {
    const { container } = render(<ProcessBand />);
    expect(container.querySelector(".animate-marquee-right")?.parentElement?.className).toContain("bg-night");
    const tilted = container.querySelector('[class*="rotate-2"]')?.className ?? "";
    expect(tilted.split(" ")).toContain("bg-gray");
    expect(tilted).not.toContain("bg-night");
    expect(tilted).toContain("animate-stripes");
    expect(tilted).toContain("motion-reduce:animate-none");
    const reversed = render(<ProcessBand reverse />).container.querySelector('[class*="rotate-2"]')?.className ?? "";
    expect(reversed).toContain("[animation-direction:reverse]");
  });

  it("takes the four steps from deep forest through gold and sand to the forest accent of the delivery", () => {
    const { container } = render(<ProcessSection />);
    const cards = Array.from(container.querySelectorAll("section > div > div"), (card) => card.className);
    expect(cards).toHaveLength(4);
    expect(new Set(cards).size).toBe(4);
    expect(cards[0]).toContain("bg-night");
    expect(cards[1]).toContain("bg-gold text-night");
    expect(cards[2]).toContain("bg-gray");
    expect(cards[3]).toContain("bg-accent text-paper");
  });

  it("renders a stage with its title", () => {
    render(<StepCard number="01" title="Cadrage" description="Texte" />);
    expect(screen.getByText("Cadrage")).toBeTruthy();
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
