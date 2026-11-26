import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Header } from "@/components/layout.tsx";
import About from "@/routes/[lang]/about.tsx";
import Blog from "@/routes/[lang]/blog/index.tsx";
import Contact from "@/routes/[lang]/contact.tsx";
import Products from "@/routes/[lang]/products/index.tsx";
import Services from "@/routes/[lang]/services/index.tsx";
import Job from "@/routes/[lang]/job";
import Works from "@/routes/[lang]/works";

const pages = [
  { name: "about", element: <About />, heading: /Un studio de design centré sur l'utilisateur/ },
  { name: "blog", element: <Blog />, heading: /Le journal de Luilka/ },
  { name: "contact", element: <Contact />, heading: /Parlons de votre projet/ },
  { name: "job", element: <Job />, heading: /Rejoignez l'équipe/ },
  { name: "products", element: <Products />, heading: /Nos produits/ },
  { name: "services", element: <Services />, heading: /Nos services/ },
  { name: "works", element: <Works />, heading: /Nos réalisations/ },
];

describe("multipage site", () => {
  it.each(pages)("renders the $name page with one main heading", ({ element, heading }) => {
    const { container } = render(element);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1, name: heading })).toBeTruthy();
  });

  it.each(pages)("gives the title of the $name page the display size", ({ element }) => {
    const { container } = render(element);
    expect(container.querySelector("h1")?.className).toContain("text-(length:--text-3xl)");
  });

  it.each(pages)("does not repeat the title of the $name page as a section heading", ({ element }) => {
    const { container } = render(element);
    const title = container.querySelector("h1")?.textContent;
    const repeated = Array.from(container.querySelectorAll("h2")).filter((h2) => h2.textContent === title);
    expect(repeated).toHaveLength(0);
  });

  it.each(pages)("does not repeat the generic section paragraph on the $name page", ({ element }) => {
    render(element);
    expect(screen.queryByText(/nous comprenons les besoins réels avant de dessiner/)).toBeNull();
  });

  it("sends no visitor from a full list to another list", () => {
    render(<Works />);
    expect(screen.queryByRole("link", { name: /Découvrir plus/ })).toBeNull();
    render(<Products />);
    expect(screen.queryByRole("link", { name: /Découvrir plus/ })).toBeNull();
  });

  it("links the reference navigation to real pages", () => {
    render(<Header />);
    const expected: Array<[string, string]> = [
      ["À propos", "/fr/about"],
      ["Services", "/fr/services"],
      ["Produits", "/fr/products"],
      ["Réalisations", "/fr/works"],
      ["Journal", "/fr/blog"],
      ["Carrières", "/fr/job"],
    ];
    for (const [label, href] of expected) {
      expect(screen.getByRole("link", { name: label }).getAttribute("href")).toBe(href);
    }
  });

  it("keeps the contact action on every page through the layout", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Nous contacter/ }).getAttribute("href")).toBe("/fr/contact");
  });
});
