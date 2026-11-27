import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StepCard } from "@/components/cards.tsx";
import { Mascot } from "@/shared/ui/mascots.tsx";

const INDEXES = [0, 1, 2, 3];

describe("mascots", () => {
  it("draws one decorative svg per step with its own accessory", () => {
    const drawings = INDEXES.map((index) => render(<Mascot index={index} />).container.innerHTML);
    expect(new Set(drawings).size).toBe(4);
    expect(drawings.every((html) => html.includes('aria-hidden="true"'))).toBe(true);
  });

  it("replaces the step number by the mascot of the card", () => {
    const { container } = render(<StepCard number="01" title="Cadrage" description="Texte" index={2} />);
    expect(screen.queryByText("01")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
    expect(screen.getByText("Cadrage")).toBeTruthy();
  });
});
