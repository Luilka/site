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
    expect(surface?.className).toContain("bg-white/80");
    expect(surface?.className).toContain("backdrop-blur");
  });

  it("draws a tone on tone pattern from the border colour on the header surface", () => {
    const { container } = renderHeader();
    const surface = container.querySelector("header div[aria-hidden='true']");
    expect(surface?.className).toContain("var(--border-ui)");
    expect(surface?.className).toContain("bg-size-[12px_12px]");
  });
});
