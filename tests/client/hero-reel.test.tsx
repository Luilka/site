import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroReel } from "@/components/patterns.tsx";
import { dictionaries } from "@/shared/i18n";
import { prefersStill } from "@/shared/utils/prefers-still.util.ts";
import Home from "@/routes/[lang]/index.tsx";

function mockStill(reduce: boolean, saveData = false): void {
  vi.stubGlobal("matchMedia", (query: string) => ({ matches: reduce && query.includes("reduce") }));
  Object.defineProperty(navigator, "connection", { value: { saveData }, configurable: true });
}

let play: ReturnType<typeof vi.spyOn>;
let pause: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  mockStill(false);
  play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
  pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("hero reel", () => {
  it("plays a looping video, silent until the visitor asks for sound, from a still poster, decorative and inline on phones", () => {
    const { container } = render(<HeroReel />);
    const video = container.querySelector("video") as HTMLVideoElement;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.getAttribute("playsinline")).not.toBeNull();
    expect(video.getAttribute("poster")).toBe("/video/hero-reel-poster.webp");
    expect(video.getAttribute("aria-hidden")).toBe("true");
    expect(video.querySelector("source")?.getAttribute("src")).toBe("/video/hero-reel.mp4");
    expect(video.querySelector("source")?.getAttribute("type")).toBe("video/mp4");
  });

  it("lets the video fill the whole card, on a neutral black that does not borrow the site colour", () => {
    const { container } = render(<HeroReel />);
    const frame = container.firstElementChild as HTMLElement;
    expect(frame.className).toContain("bg-black");
    expect(frame.className).not.toContain("bg-night");
    expect(container.querySelector("video")?.className).toContain("inset-0");
  });

  it("fills the frame and loads only its metadata until it plays", () => {
    const { container } = render(<HeroReel />);
    const video = container.querySelector("video");
    expect(video?.className).toContain("absolute inset-0 size-full object-cover");
    expect(video?.getAttribute("preload")).toBe("metadata");
  });

  it("starts playing, and can be paused by a named button and resumed", () => {
    render(<HeroReel />);
    expect(play).toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.reelPause }));
    expect(pause).toHaveBeenCalled();
    play.mockClear();
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.reelPlay }));
    expect(play).toHaveBeenCalled();
  });

  it("stays on the poster when the visitor asked for less motion", () => {
    mockStill(true);
    render(<HeroReel />);
    act(() => undefined);
    expect(pause).toHaveBeenCalled();
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPlay })).toBeTruthy();
  });

  it("stays on the poster when the visitor saves data", () => {
    mockStill(false, true);
    render(<HeroReel />);
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPlay })).toBeTruthy();
  });

  it("gives the pause button a touch target of at least 44 pixels", () => {
    render(<HeroReel />);
    expect(screen.getByRole("button", { name: dictionaries.fr.reelPause }).className).toContain("size-11");
  });

  it("survives a browser that refuses to autoplay", () => {
    play.mockRejectedValue(new Error("blocked"));
    expect(() => render(<HeroReel />)).not.toThrow();
  });
});

type Watcher = (entries: { isIntersecting: boolean }[]) => void;

function mockViewport(): { show: (visible: boolean) => void } {
  let watcher: Watcher = () => undefined;
  class FakeObserver {
    constructor(callback: Watcher) { watcher = callback; }
    observe(): void {}
    disconnect(): void {}
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver);
  return { show: (visible) => act(() => watcher([{ isIntersecting: visible }])) };
}

describe("hero reel sound", () => {
  it("offers a named sound button of 44 pixels that starts off", () => {
    render(<HeroReel />);
    const button = screen.getByRole("button", { name: dictionaries.fr.soundOn });
    expect(button.className).toContain("size-11");
    expect(document.querySelector("video")?.muted).toBe(true);
  });

  it("turns the sound on and off with the button", () => {
    render(<HeroReel />);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.soundOn }));
    expect(document.querySelector("video")?.muted).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.soundOff }));
    expect(document.querySelector("video")?.muted).toBe(true);
  });

  it("falls back to silence when the browser refuses the sound", async () => {
    play.mockImplementation(function (this: HTMLMediaElement) { return this.muted ? Promise.resolve() : Promise.reject(new Error("blocked")); });
    render(<HeroReel />);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.soundOn }));
    expect(await screen.findByRole("button", { name: dictionaries.fr.soundOn }, { timeout: 4000 })).toBeTruthy();
    expect(document.querySelector("video")?.muted).toBe(true);
  });

  it("is written in both languages", () => {
    for (const language of ["fr", "en"] as const) {
      expect(dictionaries[language].soundOn.length).toBeGreaterThan(0);
      expect(dictionaries[language].soundOff.length).toBeGreaterThan(0);
    }
  });
});

describe("hero reel viewport", () => {
  it("waits to be on screen before it plays", () => {
    const viewport = mockViewport();
    render(<HeroReel />);
    expect(play).not.toHaveBeenCalled();
    viewport.show(true);
    expect(play).toHaveBeenCalled();
  });

  it("stops, sound included, as soon as it leaves the screen, and plays again on return", () => {
    const viewport = mockViewport();
    render(<HeroReel />);
    viewport.show(true);
    fireEvent.click(screen.getByRole("button", { name: dictionaries.fr.soundOn }));
    pause.mockClear();
    viewport.show(false);
    expect(pause).toHaveBeenCalled();
    play.mockClear();
    viewport.show(true);
    expect(play).toHaveBeenCalled();
    expect(document.querySelector("video")?.muted).toBe(false);
  });

  it("stays still when it is on screen but the visitor asked for less motion", () => {
    mockStill(true);
    const viewport = mockViewport();
    render(<HeroReel />);
    play.mockClear();
    viewport.show(true);
    expect(play).not.toHaveBeenCalled();
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
  it("shows the motion video instead of the striped panel", () => {
    const { container } = render(<Home />);
    const hero = container.querySelector("section");
    expect(hero?.querySelector("video")).not.toBeNull();
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
