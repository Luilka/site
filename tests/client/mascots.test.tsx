import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StepCard } from "@/components/cards.tsx";
import { Mascot } from "@/shared/ui/mascots.tsx";

const INDEXES = [0, 1, 2, 3];

describe("mascots", () => {
  it("draws one decorative svg per step with its own accessory", () => {
    const drawings = Array.from(INDEXES, (index) => render(<Mascot index={index} />).container.innerHTML);
    expect(new Set(drawings).size).toBe(4);
    expect(drawings.every((html) => html.includes('aria-hidden="true"'))).toBe(true);
  });

  it("paints the body with a gradient and gives it two hands and two feet", () => {
    const { container } = render(<Mascot index={0} />);
    expect(container.querySelector("#mascot-body-0")).not.toBeNull();
    expect(container.querySelectorAll('[fill="url(#mascot-warm)"]').length).toBeGreaterThanOrEqual(4);
  });

  it("draws a friendly owl: ear tufts, two big shining eyes, a beak and a belly on a smooth body", () => {
    const { container } = render(<Mascot index={1} />);
    expect(container.querySelectorAll('[data-part="ear"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-part="eye"]')).toHaveLength(2);
    expect(container.querySelectorAll('[data-part="glint"]').length).toBeGreaterThanOrEqual(2);
    expect(container.querySelector('[data-part="beak"]')).not.toBeNull();
    expect(container.querySelector('[data-part="belly"]')).not.toBeNull();
  });

  it("gives each step its own body colour, from deep green to gold, pearl and forest", () => {
    const fills = INDEXES.map((index) => render(<Mascot index={index} />).container.querySelector('[data-part="body"]')?.getAttribute("fill"));
    expect(new Set(fills).size).toBe(4);
    expect(fills[0]).toBe("url(#mascot-body-0)");
  });

  it("marks the luxury with gold or night trim in the colour of the card, a crest and no blush", () => {
    const { container } = render(<Mascot index={0} />);
    expect(container.querySelector("svg")?.getAttribute("class")).toContain("text-gold");
    expect(container.querySelector('[data-part="crest"]')).not.toBeNull();
    expect(container.querySelector(".fill-gold\\/40")).toBeNull();
  });

  it("dresses each mascot with its own outfit: bow tie, beret, glasses and crown", () => {
    const outfits = Array.from(INDEXES, (index) => render(<Mascot index={index} />).container.querySelector("[data-outfit]")?.getAttribute("data-outfit"));
    expect(outfits).toEqual(["bow-tie", "beret", "glasses", "crown"]);
  });

  it("frames the mascot with two decorative corner shapes", () => {
    const { container } = render(<StepCard number="01" title="Cadrage" description="Texte" index={0} />);
    const corners = container.querySelectorAll('[data-part="corner"]');
    expect(corners).toHaveLength(2);
    expect(corners[0]?.getAttribute("aria-hidden")).toBe("true");
  });

  it("replaces the step number by the mascot of the card", () => {
    const { container } = render(<StepCard number="01" title="Cadrage" description="Texte" index={2} />);
    expect(screen.queryByText("01")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
    expect(screen.getByText("Cadrage")).toBeTruthy();
  });
});
