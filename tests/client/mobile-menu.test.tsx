import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";

function renderAt(pathname: string) {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
  return render(<Header />);
}

function menuButton() {
  return screen.getByRole("button", { name: "Menu" });
}

function sheet() {
  return screen.getByRole("dialog", { name: "Menu" });
}

function mobileNavigation(name = "Navigation mobile") {
  return screen.getByRole("navigation", { name });
}

describe("mobile menu", () => {
  it("starts closed, hidden and inert, and names the sheet it controls", () => {
    renderAt("/fr");
    const button = document.querySelector("button[aria-controls]") as HTMLElement;
    expect(button.getAttribute("aria-expanded")).toBe("false");
    const panel = document.getElementById(button.getAttribute("aria-controls") ?? "");
    expect(panel?.getAttribute("aria-hidden")).toBe("true");
    expect(panel?.hasAttribute("inert")).toBe(true);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("opens a modal sheet with every page link in the language of the page", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    expect(menuButton().getAttribute("aria-expanded")).toBe("true");
    expect(sheet().getAttribute("aria-modal")).toBe("true");
    const links = within(mobileNavigation());
    expect(links.getByRole("link", { name: "Réalisations" }).getAttribute("href")).toBe("/fr/works");
    expect(links.getByRole("link", { name: "Carrières" }).getAttribute("href")).toBe("/fr/job");
    expect(links.getAllByRole("link")).toHaveLength(6);
  });

  it("slides in from the right side of the screen", () => {
    renderAt("/fr");
    const panel = document.querySelector("[role='dialog']")?.lastElementChild;
    expect(panel?.className).toContain("right-0");
    expect(panel?.className).toContain("translate-x-full");
    fireEvent.click(menuButton());
    expect(panel?.className).toContain("translate-x-0");
    expect(panel?.className).not.toContain("translate-x-full");
  });

  it("covers the page with a blurred overlay drawn as a grid of very small squares", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    const overlay = sheet().firstElementChild;
    expect(overlay?.className).toContain("backdrop-blur");
    expect(overlay?.className).toContain("linear-gradient(to_right");
    expect(overlay?.className).toContain("linear-gradient(to_bottom");
    expect(overlay?.className).toContain("bg-size-[12px_12px]");
    expect(overlay?.getAttribute("aria-hidden")).toBe("true");
  });

  it("closes when the overlay is pressed", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    fireEvent.click(sheet().firstElementChild as Element);
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
  });

  it("closes with its own close button and gives the focus back to the menu button", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    const close = within(sheet()).getByRole("button", { name: "Fermer" });
    fireEvent.click(close);
    expect(menuButton().getAttribute("aria-expanded")).toBe("false");
  });

  it("ends with a clear contact button, since the header keeps only its icon on small screens", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    const contact = within(sheet()).getByRole("link", { name: "Nous contacter" });
    expect(contact.getAttribute("href")).toBe("/fr/contact");
  });

  it("moves the focus into the sheet once it is shown", async () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    await waitFor(() => expect(document.activeElement).toBe(sheet().lastElementChild));
  });

  it("keeps the page from scrolling behind the open sheet", () => {
    renderAt("/fr");
    fireEvent.click(menuButton());
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(menuButton());
    expect(document.body.style.overflow).toBe("");
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
    expect(within(mobileNavigation("Mobile navigation")).getByRole("link", { name: "Works" }).getAttribute("href")).toBe("/en/works");
    expect(within(sheet()).getByRole("button", { name: "Close" })).toBeTruthy();
  });

  it("keeps the contact action reachable by name when its text is hidden on small screens", () => {
    renderAt("/fr");
    const contact = within(screen.getByRole("banner")).getByRole("link", { name: /Nous contacter/ });
    expect(contact.querySelector("span")?.className).toContain("max-[440px]:sr-only");
  });
});
