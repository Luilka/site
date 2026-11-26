import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroReel } from "@/components/patterns.tsx";
import { dictionaries } from "@/shared/i18n";
import { prefersStill } from "@/shared/utils/prefers-still.util.ts";
import Home from "@/routes/[lang]/index.tsx";

function visibleSlides(container: HTMLElement): number[] {
  return Array.from(container.querySelectorAll("img"), (img, index) => (img.className.includes("opacity-100") ? index : -1)).filter((index) => index >= 0);
}

function mockStill(reduce: boolean, saveData = false): void {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce") }));
  Object.defineProperty(navigator, "connection", { value: { saveData }, configurable: true });
}

beforeEach(() => {
  vi.useFakeTimers();
  mockStill(false);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("hero reel", () => {
  it("stacks the cover of every realisation, decorative, with the first one loaded at once", () => {
    const { container } = render(<HeroReel />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(dictionaries.fr.works.length);
    expect(images[0].getAttribute("loading")).toBe("eager");
    expect(images[1].getAttribute("loading")).toBe("lazy");
    expect(container.querySelector("[aria-hidden='true']")?.contains(images[0])).toBe(true);
  });

  it("shows one cover at a time and moves on to the next one", () => {
    const { container } = render(<HeroReel />);
    expect(visibleSlides(container)).toEqual([0]);
    act(() => { vi.advanceTimersByTime(4000); });
    expect(visibleSlides(container)).toEqual([1]);
  });

  it("fades between covers and stops fading under reduced motion", () => {
    const { container } = render(<HeroReel />);
    const className = container.querySelector("img")?.className ?? "";
    expect(className).toContain("transition-opacity");
    expect(className).toContain("motion-reduce:transition-none");
  });

  it("can be paused by a named button and resumed", () => {
    const { container } = render(<HeroReel />);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.reelPause }));
    act(() => { vi.advanceTimersByTime(9000); });
    expect(visibleSlides(container)).toEqual([0]);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.reelPlay }));
    act(() => { vi.advanceTimersByTime(4000); });
    expect(visibleSlides(container)).toEqual([1]);
  });

  it("starts still when the visitor asked for less motion", () => {
    mockStill(true);
    const { container } = render(<HeroReel />);
    act(() => { vi.advanceTimersByTime(9000); });
    expect(visibleSlides(container)).toEqual([0]);
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPlay })).toBeTruthy();
  });

  it("starts still when the visitor saves data", () => {
    mockStill(false, true);
    render(<HeroReel />);
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPlay })).toBeTruthy();
  });

  it("gives the pause button a touch target of at least 44 pixels", () => {
    render(<HeroReel />);
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPause }).className).toContain("size-11");
  });
});

describe("prefers still", () => {
  it("is false when the browser exposes neither preference", () => {
    vi.stubGlobal("matchMedia", undefined);
    Object.defineProperty(navigator, "connection", { value: undefined, configurable: true });
    expect(prefersStill()).toBe(false);
  });
});

describe("home hero", () => {
  it("shows the reel of realisations instead of the striped panel", () => {
    const { container } = render(<Home />);
    const hero = container.querySelector("section");
    expect(hero?.querySelectorAll("img").length).toBeGreaterThan(0);
    expect(hero?.querySelector("div[class*='repeating-linear-gradient']")).toBeNull();
  });
});

describe("reel copy", () => {
  it("is written in both languages", () => {
    for (const language of ["fr", "en"] as const) {
      expect(dictionaries[language].reelPause.length).toBeGreaterThan(0);
      expect(dictionaries[language].reelPlay.length).toBeGreaterThan(0);
    }
  });
});
