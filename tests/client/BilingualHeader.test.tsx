import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import Header from "@/components/layout/header";
import About from "@/routes/[lang]/about.tsx";

function renderApp(pathname = "/fr/about") {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = {
    pathname,
    search: "",
    hash: "",
    params: {},
  };
  return render(
    <>
      <Header />
      <About />
    </>,
  );
}

afterEach(() => {
  delete (globalThis as Record<string, unknown>).__NEXY_LOCATION__;
});

describe("bilingual header", () => {
  it("reads French from the URL and links to the same page in English", () => {
    renderApp();
    expect(screen.getByRole("heading", { level: 1, name: /Un studio de design centré sur l'utilisateur/ })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Passer en anglais" }).getAttribute("href")).toBe("/en/about");
  });

  it("opens a dropdown on hover and closes it on leave", () => {
    renderApp();
    const trigger = screen.getByRole("link", { name: /Services/ });
    const wrapper = trigger.parentElement;
    expect(trigger.getAttribute("aria-expanded")).toBe("false");
    fireEvent.mouseEnter(wrapper!);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(wrapper?.querySelector(".mega-panel")?.className).toContain("is-open");
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
