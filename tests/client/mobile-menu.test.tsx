import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";

function renderAt(pathname: string) {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
  return render(<Header />);
}

function menuButton() {
  return screen.getByRole("button", { name: "Menu" });
}

function mobileNavigation(name = "Navigation mobile") {
  return screen.getByRole("navigation", { name });
}

describe("mobile menu", () => {
  it("starts closed and names the panel it controls", () => {
    renderAt("/fr");
    const button = menuButton();
    expect(button.getAttribute("aria-expanded")).toBe("false");
    const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(panel?.hasAttribute("hidden")).toBe(true);
  });

  it("opens with every page link in the language of the page", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    expect(menuButton().getAttribute("aria-expanded")).toBe("true");
    const links = within(mobileNavigation());
    expect(links.getByRole("link", { name: "Réalisations" }).getAttribute("href")).toBe("/fr/works");
    expect(links.getByRole("link", { name: "Carrières" }).getAttribute("href")).toBe("/fr/job");
    expect(links.getAllByRole("link")).toHaveLength(7);
  });

  it("ends with a clear contact button, since the header keeps only its icon on small screens", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    const contact = within(mobileNavigation()).getByRole("link", { name: "Nous contacter" });
    expect(contact.getAttribute("href")).toBe("/fr/contact");
  });

  it("closes when the button is pressed again", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    fireEvent.click(menuButton());
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
  });

  it("closes when a link is chosen", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    fireEvent.click(within(mobileNavigation()).getByRole("link", { name: "Blog" }));
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
  });

  it("closes on Escape and gives the focus back to the button", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    fireEvent.keyDown(within(mobileNavigation()).getByRole("link", { name: "Services" }), { key: "Escape" });
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(menuButton());
  });

  it("closes when the focus leaves the menu", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    fireEvent.blur(menuButton(), { relatedTarget: document.body });
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
  });

  it("keeps the English labels on an English page", () => {
    renderAt("/en");
    fireEvent.click(menuButton());
    const links = within(mobileNavigation("Mobile navigation"));
    expect(links.getByRole("link", { name: "Works" }).getAttribute("href")).toBe("/en/works");
  });

  it("keeps the contact action reachable by name when its text is hidden on small screens", () => {
    renderAt("/fr");
    const contact = within(screen.getByRole("banner")).getByRole("link", { name: /Nous contacter/ });
    expect(contact.querySelector("span")?.className).toContain("max-[440px]:sr-only");
  });
});
