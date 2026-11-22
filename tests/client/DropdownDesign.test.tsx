import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteHeader from "@/components/patterns/site-header.tsx";
import { LanguageProvider } from "@/contexts/LanguageContext.tsx";

function openServices() {
  render(
    <LanguageProvider>
      <SiteHeader />
    </LanguageProvider>,
  );
  const trigger = screen.getByRole("link", { name: /Services/ });
  fireEvent.mouseEnter(trigger.parentElement!);
  return {
    trigger,
    panel: trigger.parentElement?.querySelector(".dropdown-panel") as HTMLElement,
  };
}

describe("header dropdown design", () => {
  it("shows an image column and described items in the other column", () => {
    const { panel } = openServices();
    expect(panel.querySelector(".dropdown-media img")).not.toBeNull();
    const items = panel.querySelectorAll(".dropdown-item");
    expect(items).toHaveLength(4);
    for (const item of items) {
      expect(item.querySelector(".dropdown-description")?.textContent?.trim()).toBeTruthy();
    }
  });

  it("changes the image when the pointer moves over each item", () => {
    const { panel } = openServices();
    const image = panel.querySelector(".dropdown-media img") as HTMLImageElement;
    const items = panel.querySelectorAll(".dropdown-item");
    const sources = new Set<string>();
    for (const item of items) {
      fireEvent.mouseEnter(item);
      sources.add(image.getAttribute("src") ?? "");
    }
    expect(sources.size).toBe(items.length);
  });

  it("uses a bold chevron on the trigger", () => {
    const { trigger } = openServices();
    const chevron = trigger.querySelector("svg") as SVGElement;
    expect(Number(chevron.getAttribute("width"))).toBeGreaterThanOrEqual(14);
    expect(Number(chevron.getAttribute("stroke-width"))).toBeGreaterThanOrEqual(2);
  });
});
