import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteHeader from "@/components/patterns/site-header.tsx";
import { LanguageProvider } from "@/contexts/LanguageContext.tsx";
import About from "@/routes/about.tsx";

function renderApp() {
  return render(
    <LanguageProvider>
      <SiteHeader />
      <About />
    </LanguageProvider>,
  );
}

describe("bilingual header", () => {
  it("starts in French and switches the page copy to English", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: /Une communauté qui fait grandir le code/ })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /FR/ }));
    expect(screen.getByRole("button", { name: /EN/ })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1, name: /A community that grows code/ })).toBeTruthy();
  });

  it("opens a dropdown on hover and closes it on leave", () => {
    renderApp();
    const trigger = screen.getByRole("link", { name: /Services/ });
    const wrapper = trigger.parentElement;
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.mouseEnter(wrapper!);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(wrapper?.querySelector(".dropdown-panel")?.className).toContain("is-open");
    fireEvent.mouseLeave(wrapper!);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });

  it("keeps the dropdown reachable by keyboard", () => {
    renderApp();
    const trigger = screen.getByRole("link", { name: /Products/ });
    fireEvent.focus(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    fireEvent.keyDown(trigger, { key: "Escape" });
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
  });
});
