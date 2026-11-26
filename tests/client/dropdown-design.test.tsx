import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";

function openServices(pathname = "/fr") {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname,
    search: "",
    hash: "",
    params: {},
  };
  render(<Header />);
  const trigger = screen.getByRole("link", { name: /Services/ });
  fireEvent.mouseEnter(trigger.parentElement!);
  return {
    trigger,
    panel: trigger.parentElement?.querySelector("[id]") as HTMLElement,
  };
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).__NEXY_LOCATION__;
});

describe("header mega menu design", () => {
  it("shows a labelled panel with one image card per service", () => {
    const { panel } = openServices();
    expect(panel.querySelector("h2")?.previousElementSibling?.textContent).toBeTruthy();
    expect(panel.querySelector("h2")?.textContent).toBeTruthy();
    const cards = panel.querySelectorAll("a[href]:has(h3)");
    expect(cards).toHaveLength(4);
    for (const card of cards) {
      expect(card.querySelector("img")?.getAttribute("src")).toBeTruthy();
      expect(card.querySelector("p")?.textContent?.trim()).toBeTruthy();
      expect(card.querySelector("span:last-of-type")?.textContent?.trim()).toBeTruthy();
    }
  });

  it("names the four short services in French", () => {
    const { panel } = openServices();
    const titles = Array.from(panel.querySelectorAll("a h3"), (node) => node.textContent);
    expect(titles).toEqual(["UX Design", "UI design", "Software", "COM"]);
  });

  it("names the four short services in English", () => {
    const { panel } = openServices("/en");
    const titles = Array.from(panel.querySelectorAll("a h3"), (node) => node.textContent);
    expect(titles).toEqual(["UX Design", "UI design", "Software", "COM"]);
  });

  it("gives each card its own image", () => {
    const { panel } = openServices();
    const sources = new Set(
      Array.from(panel.querySelectorAll("a img"), (image) => image.getAttribute("src") ?? ""),
    );
    expect(sources.size).toBe(4);
  });

  it("does not claim the studio refuses development work in the menu", () => {
    const { panel } = openServices();
    const text = panel.textContent ?? "";
    expect(text).not.toContain("Aucun code");
  });

  it("does not claim the studio refuses development work in the English menu", () => {
    const { panel } = openServices("/en");
    const text = panel.textContent ?? "";
    for (const claim of ["We write no code", "We do not develop the software"]) {
      expect(text).not.toContain(claim);
    }
  });

  it("offers a column of navigation links", () => {
    const { panel } = openServices();
    const links = panel.querySelectorAll("aside a");
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const link of links) {
      expect(link.getAttribute("href")).toBeTruthy();
    }
  });

  it("uses a bold chevron on the trigger", () => {
    const { trigger } = openServices();
    const chevron = trigger.querySelector("svg") as SVGElement;
    expect(Number(chevron.getAttribute("width"))).toBeGreaterThanOrEqual(14);
    expect(Number(chevron.getAttribute("stroke-width"))).toBeGreaterThanOrEqual(2);
  });
});
