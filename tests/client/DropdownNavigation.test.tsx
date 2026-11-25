import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteHeader from "@/components/patterns/site-header.tsx";

function renderHeader() {
  return render(<SiteHeader />);
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
    fireEvent.mouseEnter(screen.getByRole("link", { name: /Products/ }).parentElement!);
    expect(expanded(/Services/)).toBe("false");
    expect(expanded(/Products/)).toBe("true");
    fireEvent.mouseLeave(nav);
    expect(expanded(/Products/)).toBe("false");
  });

  it("uses an animated panel that closes on Escape", () => {
    renderHeader();
    const trigger = screen.getByRole("link", { name: /Services/ });
    fireEvent.focus(trigger);
    const panel = trigger.parentElement?.querySelector(".mega-panel");
    expect(panel?.className).toContain("is-open");
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(expanded(/Services/)).toBe("false");
  });

  it("keeps the blurred surface out of the panel's backdrop root", () => {
    const { container } = renderHeader();
    const header = container.querySelector("header");
    const surface = header?.querySelector(".header-surface");
    expect(header?.className).toContain("sticky top-0");
    expect(header?.className).not.toContain("backdrop-blur");
    expect(surface?.className).toContain("bg-white/80");
    expect(surface?.className).toContain("backdrop-blur");
  });
});
