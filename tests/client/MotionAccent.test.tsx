import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HeroAccent from "@/components/patterns/hero-accent.tsx";

import { setReducedMotion } from "./setup";

describe("HeroAccent", () => {
  it("renders a decorative accent when motion is reduced", () => {
    setReducedMotion(true);
    const { container } = render(<HeroAccent />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });

  it("leaves the accent unstyled when motion is reduced", () => {
    setReducedMotion(true);
    const { container } = render(<HeroAccent />);
    expect(container.firstElementChild?.getAttribute("style")).toBeNull();
  });

  it("renders the accent when motion is allowed", () => {
    setReducedMotion(false);
    render(<HeroAccent />);
    expect(screen.getByTestId("motion-accent")).toBeTruthy();
  });
});
