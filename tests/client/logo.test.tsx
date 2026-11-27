import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";
import About from "@/routes/[lang]/about.tsx";
import { Logo } from "@/shared/ui/logos.tsx";

describe("logo", () => {
  it("draws the supplied solid fingerprint inline", () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector("svg");
    const path = container.querySelector("svg > path");
    expect(svg?.getAttribute("viewBox")).toBe("0 0 24 24");
    expect(svg?.getAttribute("fill")).toBe("currentColor");
    expect(svg?.getAttribute("aria-hidden")).toBe("true");
    expect(path?.getAttribute("d")?.startsWith("M12 3.75a6.715 6.715 0 0 0-3.722 1.118")).toBe(true);
    expect(path?.getAttribute("fill-rule")).toBe("evenodd");
    expect(path?.getAttribute("stroke")).toBeNull();
  });

  it("takes its size from the class it receives", () => {
    const { container } = render(<Logo className="size-6" />);
    expect(container.querySelector("svg")?.getAttribute("class")).toBe("size-6");
  });

  it("is drawn in the header without any sprite reference", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("use")).toBeNull();
    expect(screen.getByRole("link", { name: "Luilka, accueil" }).querySelector("svg > path")).not.toBeNull();
  });

  it("is drawn as the visual of the about section without any sprite reference", () => {
    const { container } = render(<About />);
    expect(container.querySelector("use")).toBeNull();
    expect(container.querySelector("svg.size-\\[140px\\] > path")).not.toBeNull();
  });
});
