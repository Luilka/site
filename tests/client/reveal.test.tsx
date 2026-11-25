import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Reveal from "@/components/patterns/reveal.tsx";

import { setReducedMotion } from "./setup";

describe("Reveal", () => {
  it("renders its children when motion is reduced", () => {
    setReducedMotion(true);
    render(<Reveal>Notre methode</Reveal>);
    expect(screen.getByText("Notre methode")).toBeTruthy();
  });

  it("renders its children when motion is allowed", () => {
    setReducedMotion(false);
    render(<Reveal>Notre methode</Reveal>);
    expect(screen.getByText("Notre methode")).toBeTruthy();
  });

  it("leaves the content unstyled when motion is reduced", () => {
    setReducedMotion(true);
    render(<Reveal>Notre methode</Reveal>);
    expect(screen.getByText("Notre methode").parentElement?.getAttribute("style")).toBeNull();
  });
});
