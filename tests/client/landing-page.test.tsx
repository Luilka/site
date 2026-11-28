import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/routes/[lang]/index.tsx";

describe("landing page", () => {
  it("renders one main heading with the reference promise", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByText(/Agence de/).textContent).toContain("reliant produit et");
  });

  it("uses the reference section classes", () => {
    const { container } = render(<Home />);
    for (const name of ["grid-cols-4", "grid-cols-3", "grid-cols-2", "animate-marquee-right"]) {
      expect(container.querySelector(`.${name}`)).not.toBeNull();
    }
  });

  it("shows the four steps from idea to app with their own copy", () => {
    render(<Home />);
    for (const label of ["Cadrage", "Design", "Construction", "Lancement"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(
      screen.getAllByText(
        "Nous clarifions le problème, les personnes concernées et ce que le produit doit accomplir.",
      ),
    ).toHaveLength(1);
  });

  it("shows the four design services", () => {
    render(<Home />);
    for (const label of ["UX Design", "UI design", "Software", "COM"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows the three products", () => {
    render(<Home />);
    for (const label of ["Tala", "Vuga", "Pro"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("shows the four case studies with their subtitles", () => {
    render(<Home />);
    for (const label of ["Yano", "Vox Congo", "Mitemo", "Privatis Capital Invest"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    for (const subtitle of [
      "UX Design: mobile App",
      "UX Design & UI design : Mobile App",
      "Full Projet & all Service",
      "Rebranding, et Design système , charte graphique",
    ]) {
      expect(screen.getAllByText(subtitle).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText("AyLen")).toBeNull();
    expect(screen.getAllByText("Voir le projet")).toHaveLength(4);
  });

  it("limits the home page to four works and three products", () => {
    const { container } = render(<Home />);
    expect(container.querySelectorAll("a[href*='/work/']")).toHaveLength(4);
    expect(container.querySelectorAll("a[href*='/products/']")).toHaveLength(3);
    expect(container.querySelectorAll("a[href*='/work/'] p")).toHaveLength(0);
  });

  it("offers the same contact action twice, in the hero and in the contact block, both to the contact page", () => {
    render(<Home />);
    const links = screen.getAllByRole("link", { name: /Nous contacter/ });
    expect(links).toHaveLength(2);
    for (const link of links) expect(link.getAttribute("href")?.endsWith("/contact")).toBe(true);
    expect(screen.queryByText(/devis/i)).toBeNull();
  });

  it("writes the hero title in ink, without coloured words", () => {
    const { container } = render(<Home />);
    expect(container.querySelector("h1 span")).toBeNull();
  });

  it("keeps the contact section", () => {
    render(<Home />);
    expect(screen.getByText(/Donnons forme/)).toBeTruthy();
  });

  it("exposes the reference section anchors", () => {
    const { container } = render(<Home />);
    for (const id of ["about", "services", "products", "works", "contact"]) {
      expect(container.querySelector(`#${id}`)).not.toBeNull();
    }
  });
});
