import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProcessBand } from "@/components/patterns.tsx";
import { WorkCard } from "@/components/cards.tsx";
import Home from "@/routes/[lang]/index.tsx";
import { SAMPLE_IMAGE } from "./fixtures.ts";

describe("design-first home content", () => {
  it("tells the story of a studio that designs, writes and builds", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    for (const term of ["Devops", "PossaCode", "300 développeurs", "Ingénierie d'échelle"]) {
      expect(text).not.toContain(term);
    }
    for (const label of ["UX Design", "UI design", "Software", "COM"]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("does not claim the studio refuses development work", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    for (const claim of [
      "Nous ne développons pas le code",
      "Nous ne développons pas le logiciel",
      "Aucun code",
    ]) {
      expect(text).not.toContain(claim);
    }
  });

  it("gives each process step its own description", () => {
    render(<Home />);
    for (const description of [
      "Nous clarifions le problème, les personnes concernées et ce que le produit doit accomplir.",
      "Nous concevons les parcours, le langage visuel et les écrans, puis nous les testons avec de vraies personnes.",
      "Nous construisons l'application : interface, états et parcours jusqu'à la mise en ligne.",
      "Nous écrivons la page produit, le ton et les messages utiles au quotidien pour que le produit trouve ses utilisateurs.",
    ]) {
      expect(screen.getAllByText(description)).toHaveLength(1);
    }
  });

  it("gives each product its own description", () => {
    render(<Home />);
    for (const description of [
      "Un espace pour suivre vos décisions de design et garder les équipes sur la même ligne.",
      "La voix de vos utilisateurs, centralisée et facile à consulter.",
      "Le pilotage de vos projets de design, de la première idée à la livraison.",
    ]) {
      expect(screen.getAllByText(description)).toHaveLength(1);
    }
  });

  it("states the design-to-app, user-centric strategy", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).toContain("design to app");
    expect(text).toContain("centré sur l'utilisateur");
  });

  it("keeps the home about text to two short paragraphs", () => {
    const { container } = render(<Home />);
    const paragraphs = [...container.querySelectorAll("#about p")];
    expect(paragraphs).toHaveLength(2);
    expect(paragraphs.join(" ").split(/\s+/).length).toBeLessThan(80);
  });

  it("says that Luilka designs other products too, digital or physical", () => {
    const { container } = render(<Home />);
    const text = container.textContent ?? "";
    expect(text).toContain("d'autres produits, numériques ou physiques");
  });

  it("gives each section of the home page its own description", () => {
    render(<Home />);
    for (const description of [
      "Nous concevons, écrivons et construisons des produits numériques. Chaque service peut aussi être commandé seul.",
      "Trois outils nés du studio pour garder vos décisions de design, vos utilisateurs et vos projets au même endroit.",
      "Chaque projet commence par une question claire et se termine par une interface que les gens savent utiliser.",
    ]) {
      expect(screen.getAllByText(description)).toHaveLength(1);
    }
  });

  it("names the service section around experience and product writing", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Concevoir l'expérience, écrire le produit" }),
    ).toBeTruthy();
  });

  it("describes each service in a few words", () => {
    const { container } = render(<Home />);
    for (const description of [
      "Nous observons vos utilisateurs, cadrons le problème et concevons des parcours testés avant l'interface. Livrable : parcours et prototype.",
      "Nous concevons des écrans clairs, avec leurs états et des composants accessibles. Les mots sont intégrés dès la première maquette.",
      "Nous construisons l'application : interface, états et parcours jusqu'à la mise en ligne. Ce service peut aussi être commandé seul.",
      "Nous écrivons la page produit qui donne envie d'acheter, le ton et les messages utiles au quotidien. Ce service peut aussi être commandé seul.",
    ]) {
      expect(screen.getAllByText(description)).toHaveLength(1);
    }
    const texts = Array.from(container.querySelectorAll("a[href*='/services/'] p")).map((node) => node.textContent ?? "");
    expect(texts).toHaveLength(4);
    for (const text of texts) {
      expect(text.length).toBeLessThan(170);
    }
  });

  it("shows only a name and one short subtitle on each work card", () => {
    const { container } = render(<Home />);
    for (const subtitle of [
      "UX Design: mobile App",
      "UX Design & UI design : Mobile App",
      "Full Projet & all Service",
      "Rebranding, et Design système , charte graphique",
    ]) {
      expect(screen.getAllByText(subtitle)).toHaveLength(1);
    }
    expect(container.querySelectorAll("a[href*='/work/'] p")).toHaveLength(0);
  });

  it("names the stages of the Luilka process with keywords, in order, instead of icons", () => {
    const { container } = render(<ProcessBand />);
    const stages = Array.from(container.querySelectorAll("[data-part='stage']"), (stage) => stage.textContent);
    expect(stages.slice(0, 6)).toEqual(["[01] Observer", "[02] Cadrer", "[03] Concevoir", "[04] Construire", "[05] Tester", "[06] Lancer"]);
  });

  it("writes each stage number small, light and in a vivid yellow", () => {
    const { container } = render(<ProcessBand />);
    const number = container.querySelector("[data-part='stage-number']");
    expect(number?.textContent).toBe("[01]");
    expect(number?.className).toContain("text-(length:--text-xs)");
    expect(number?.className).toContain("font-light");
    expect(number?.className).toContain("text-yellow");
  });

  it("hides the decorative process band from assistive technology", () => {
    const { container } = render(<ProcessBand />);
    expect(container.firstElementChild?.getAttribute("aria-hidden")).toBe("true");
  });

  it("uses a heading for the name of a case study", () => {
    render(<WorkCard slug="work" name="Yano" image={SAMPLE_IMAGE} />);
    expect(screen.getByRole("heading", { level: 3, name: "Yano" })).toBeTruthy();
  });
});
