import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import SiteHeader from "@/components/patterns/site-header.tsx";
import About from "@/routes/about.tsx";
import Blog from "@/routes/blog.tsx";
import Contact from "@/routes/contact.tsx";
import Job from "@/routes/job.tsx";
import Products from "@/routes/products.tsx";
import Services from "@/routes/services.tsx";
import Works from "@/routes/works.tsx";

const pages = [
  { name: "about", element: <About />, heading: /Une communauté qui fait grandir le code/ },
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

  it("links the reference navigation to real pages", () => {
    render(<SiteHeader />);
    const expected: Array<[string, string]> = [
      ["About", "/about"],
      ["Services", "/services"],
      ["Products", "/products"],
      ["Works", "/works"],
      ["Blog", "/blog"],
      ["Job", "/job"],
    ];
    for (const [label, href] of expected) {
      expect(screen.getByRole("link", { name: label }).getAttribute("href")).toBe(href);
    }
  });

  it("keeps the contact action on every page through the layout", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /Contact us/ }).getAttribute("href")).toBe("/contact");
  });
});
