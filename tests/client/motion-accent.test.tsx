import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeroAccent } from "@/components/patterns.tsx";
import { setReducedMotion } from "./setup";

describe("HeroAccent", () => {
  it("renders a decorative accent when motion is reduced", () => {
    setReducedMotion(true);
    const { container } = render(<HeroAccent />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });

  it("renders the accent when motion is allowed", () => {
    setReducedMotion(false);
    render(<HeroAccent />);
    expect(screen.getByTestId("motion-accent")).toBeTruthy();
  });
});
