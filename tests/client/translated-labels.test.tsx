import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Footer, Header } from "@/components/layout.tsx";
import About from "@/routes/[lang]/about.tsx";
import { dictionaries, navigation } from "@/shared/i18n";
import { pageKey } from "@/shared/utils/page-key.util.ts";

function renderAt(pathname: string) {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname, search: "", hash: "", params: {} };
  return render(
    <>
      <Header />
      <About />
      <Footer />
    </>,
  );
}

function mainNavigation(name: string) {
  return within(screen.getByRole("navigation", { name }));
}

describe("labels follow the language of the page", () => {
  it("names the navigation in French on a French page", () => {
    renderAt("/fr/about");
    const names = ["À propos", "Services", "Produits", "Réalisations", "Blog", "Carrières"];
    for (const name of names) {
      expect(mainNavigation("Navigation principale").getAllByRole("link", { name }).length).toBeGreaterThan(0);
    }
  });

  it("keeps the English navigation labels of the shared source on an English page", () => {
    renderAt("/en/about");
    for (const item of navigation) {
      expect(mainNavigation("Main navigation").getAllByRole("link", { name: item.label }).length).toBeGreaterThan(0);
    }
  });

  it("keeps the word Blog unchanged in both languages", () => {
    renderAt("/fr/about");
    for (const link of mainNavigation("Navigation principale").getAllByRole("link", { name: "Blog" })) {
      expect(link.getAttribute("href")).toBe("/fr/blog");
    }
    expect(dictionaries.fr.pages.blog.eyebrow).toBe("Blog");
    expect(dictionaries.en.pages.blog.eyebrow).toBe("Blog");
  });

  it("names the blog Blog in the footer and in the products menu, in both languages", () => {
    for (const language of ["fr", "en"] as const) {
      const copy = dictionaries[language];
      expect(copy.footer.more.some((link) => link.href === "/blog" && link.label === "Blog")).toBe(true);
      expect(copy.dropdowns.products.links.some((link) => link.href === "/blog" && link.label === "Blog")).toBe(true);
    }
  });

  it("translates the contact action of the header", () => {
    renderAt("/fr/about");
    const header = within(screen.getByRole("banner"));
    expect(header.getByRole("link", { name: /Nous contacter/ }).getAttribute("href")).toBe("/fr/contact");
    expect(header.queryByText("Contact us")).toBeNull();
  });

  it("translates the page badge", () => {
    renderAt("/fr/about");
    expect(screen.getByText("À propos", { selector: "span" })).toBeTruthy();
  });

  it("translates the footer column and the newsletter invitation", () => {
    renderAt("/fr/about");
    expect(screen.getByText("Plus")).toBeTruthy();
    expect(screen.getByText("Abonnez-vous à notre lettre d'information")).toBeTruthy();
    expect(screen.queryByText("More")).toBeNull();
    expect(screen.queryByText(/Stay updated/)).toBeNull();
  });

  it("names the logo link in the language of the page", () => {
    renderAt("/en/about");
    expect(within(screen.getByRole("banner")).getByRole("link", { name: "Luilka, home" })).toBeTruthy();
  });

  it("writes the newsletter placeholder in the language of the page", () => {
    renderAt("/en/about");
    expect(screen.getByPlaceholderText("pixi@domain.com")).toBeTruthy();
  });

  it("uses the same English words for the badge and the shared navigation source", () => {
    for (const item of navigation) {
      expect(dictionaries.en.pages[pageKey(item.href)].eyebrow).toBe(item.label);
    }
  });
});
