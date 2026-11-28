import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";

function renderHeader() {
  return render(<Header />);
}

function expanded(name: RegExp) {
  return screen.getByRole("link", { name }).getAttribute("aria-expanded");
}

describe("site header dropdown navigation", () => {
  it("keeps one panel open when the pointer moves between triggers", () => {
    renderHeader();
    const nav = screen.getByRole("navigation", { name: /Navigation principale/ });
    fireEvent.mouseEnter(screen.getByRole("link", { name: /Services/ }).parentElement!);
    expect(expanded(/Services/)).toBe("true");
    fireEvent.mouseEnter(screen.getByRole("link", { name: /Produits/ }).parentElement!);
    expect(expanded(/Services/)).toBe("false");
    expect(expanded(/Produits/)).toBe("true");
    fireEvent.mouseLeave(nav);
    expect(expanded(/Produits/)).toBe("false");
  });

  it("uses an animated panel that closes on Escape", () => {
    renderHeader();
    const trigger = screen.getByRole("link", { name: /Services/ });
    fireEvent.focus(trigger);
    const panel = trigger.parentElement?.querySelector("[id]");
    expect(panel?.className).toContain("opacity-100");
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(expanded(/Services/)).toBe("false");
  });

  it("keeps the blurred surface out of the panel's backdrop root", () => {
    const { container } = renderHeader();
    const header = container.querySelector("header");
    const surface = header?.querySelector("div[aria-hidden='true']");
    expect(header?.className).toContain("sticky top-0");
    expect(header?.className).not.toContain("backdrop-blur");
    expect(surface?.className).toContain("bg-white/60");
    expect(surface?.className).toContain("backdrop-blur");
  });

  it("keeps every page transition name out of the ancestors of the dropdown panels, so their blur can see the page", () => {
    const { container } = renderHeader();
    const named = (node: Element | null) => node?.className.toString().includes("view-transition-name") || (node as HTMLElement | null)?.style.viewTransitionName;
    const panels = container.querySelectorAll("header [id]");
    expect(panels.length).toBeGreaterThan(0);
    for (const panel of panels) {
      for (let node = panel.parentElement; node; node = node.parentElement) expect(named(node)).toBeFalsy();
    }
  });

  it("still keeps the brand, the links and the actions in place during a page transition", () => {
    const { container } = renderHeader();
    const names = Array.from(container.querySelectorAll("header a, header [class*='view-transition-name']"), (node) => (node as HTMLElement).style.viewTransitionName || node.className.toString().match(/view-transition-name:([\w-]+)/)?.[1]);
    expect(names.filter(Boolean).length).toBeGreaterThanOrEqual(5);
    expect(new Set(names.filter(Boolean)).size).toBe(names.filter(Boolean).length);
  });

  it("gives the dropdown panel a backdrop blur", () => {
    renderHeader();
    const panel = screen.getByRole("link", { name: /Services/ }).parentElement?.querySelector("[id]");
    expect(panel?.className).toContain("backdrop-blur-md");
  });

  it("draws a white grid on a clear blurred header surface", () => {
    const { container } = renderHeader();
    const surface = container.querySelector("header div[aria-hidden='true']");
    expect(surface?.className).toContain("bg-grid");
    expect(surface?.className).toContain("[--grid-line:#fff]");
    expect(surface?.className).toContain("bg-white/60");
    expect(surface?.className).toContain("backdrop-blur-md");
    expect(surface?.className).not.toContain("bg-white/80");
    expect(surface?.className).not.toContain("color-mix");
  });
});
