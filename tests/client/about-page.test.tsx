import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeamCard, ValueCard } from "@/components/cards.tsx";
import { Breadcrumb } from "@/components/patterns.tsx";
import { AboutHero, MissionSection, TeamSection, ValuesSection } from "@/components/sections.tsx";
import About from "@/routes/[lang]/about.tsx";
import { dictionaries } from "@/shared/i18n";
import { SAMPLE_IMAGE } from "./fixtures.ts";

const IMAGES = { hero: SAMPLE_IMAGE, mission: SAMPLE_IMAGE, detailA: SAMPLE_IMAGE, detailB: SAMPLE_IMAGE };

function setLanguage(language: "fr" | "en"): void {
  (globalThis as Record<string, unknown>).__NEXY_LOCATION__ = { pathname: `/${language}/about`, search: "", hash: "", params: {} };
}

describe("breadcrumb", () => {
  it("leads back to the home page and marks the current page", () => {
    setLanguage("fr");
    render(<Breadcrumb current="À propos" />);
    const nav = screen.getByRole("navigation", { name: "Fil d'Ariane" });
    expect(within(nav).getByRole("link", { name: "Accueil" }).getAttribute("href")).toBe("/fr");
    expect(within(nav).getByText("À propos").getAttribute("aria-current")).toBe("page");
  });

  it("is written in English on an English page", () => {
    setLanguage("en");
    render(<Breadcrumb current="About" />);
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getByRole("link", { name: "Home" }).getAttribute("href")).toBe("/en");
  });
});

describe("about hero", () => {
  it("shows the breadcrumb, the page title, one sentence and a picture loaded at once", () => {
    setLanguage("fr");
    const { container } = render(<AboutHero eyebrow="À propos" title="Titre" description="Phrase" image={SAMPLE_IMAGE} />);
    expect(screen.getByRole("heading", { level: 1, name: "Titre" })).toBeTruthy();
    expect(screen.getByText("Phrase")).toBeTruthy();
    expect(screen.getByRole("navigation", { name: "Fil d'Ariane" })).toBeTruthy();
    const picture = container.querySelector("img");
    expect(picture?.getAttribute("loading")).toBe("eager");
    expect(picture?.getAttribute("fetchpriority")).toBe("high");
    expect(picture?.getAttribute("alt")).toBe("");
  });
});

describe("mission section", () => {
  it("shows the title, each paragraph and three pictures, with the text first in reading order", () => {
    const { container } = render(<MissionSection title="Mission" paragraphs={["Un", "Deux"]} images={IMAGES} />);
    expect(screen.getByRole("heading", { level: 2, name: "Mission" })).toBeTruthy();
    expect(screen.getByText("Un")).toBeTruthy();
    expect(screen.getByText("Deux")).toBeTruthy();
    expect(container.querySelectorAll("img")).toHaveLength(3);
    expect(container.querySelector("section > div")?.firstElementChild?.tagName).toBe("DIV");
  });
});

describe("values section", () => {
  const items = [1, 2, 3, 4, 5].map((n) => ({ title: `Valeur ${n}`, description: `Phrase ${n}` }));

  it("shows a title for each value under the section title", () => {
    render(<ValuesSection title="Nos valeurs" description="Intro" items={items} />);
    expect(screen.getByRole("heading", { level: 2, name: "Nos valeurs" })).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(5);
  });

  it("puts the first value in the middle of the mosaic on a dark striped panel", () => {
    const { container } = render(<ValuesSection title="Nos valeurs" description="Intro" items={items} />);
    const first = screen.getByRole("heading", { level: 3, name: "Valeur 1" }).closest("div[class*='repeating-linear-gradient']");
    expect(first?.className).toContain("min-[1001px]:col-start-2");
    expect(first?.className).toContain("min-[1001px]:row-span-2");
    expect(container.querySelectorAll("div[class*='repeating-linear-gradient']")).toHaveLength(1);
  });

  it("draws an icon for each value and hides it from assistive technology", () => {
    const { container } = render(<ValuesSection title="Nos valeurs" description="Intro" items={items} />);
    expect(container.querySelectorAll("svg[aria-hidden='true']")).toHaveLength(5);
  });

  it("shows nothing when there is no value", () => {
    const { container } = render(<ValuesSection title="Nos valeurs" description="Intro" items={[]} />);
    expect(container.firstElementChild).toBeNull();
  });

  it("keeps a sixth value in the flow instead of failing", () => {
    render(<ValueCard title="Sixième" description="Phrase" index={5} />);
    expect(screen.getByRole("heading", { level: 3, name: "Sixième" })).toBeTruthy();
  });
});

describe("team section", () => {
  it("shows the name as a title and the role of each member", () => {
    render(<TeamSection title="Équipe" description="Intro" members={[{ name: "Espoir LOEMBA", role: "CEO" }]} />);
    expect(screen.getByRole("heading", { level: 2, name: "Équipe" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 3, name: "Espoir LOEMBA" })).toBeTruthy();
    expect(screen.getByText("CEO")).toBeTruthy();
  });

  it("shows nothing when there is no member", () => {
    const { container } = render(<TeamSection title="Équipe" description="Intro" members={[]} />);
    expect(container.firstElementChild).toBeNull();
  });

  it("shows the initials, hidden from assistive technology, when a member has no photo", () => {
    render(<TeamCard name="Espoir LOEMBA" role="CEO" />);
    const initials = screen.getByText("EL");
    expect(initials.getAttribute("aria-hidden")).toBe("true");
  });

  it("shows the photo of a member who has one", () => {
    const { container } = render(<TeamCard name="Espoir LOEMBA" role="CEO" image={SAMPLE_IMAGE} />);
    expect(container.querySelector("img")?.getAttribute("src")).toBe("/images/work/sample.svg");
    expect(screen.queryByText("EL")).toBeNull();
  });
});

describe("about page", () => {
  it.each(["fr", "en"] as const)("holds one main title, then mission, values and team, then contact, in %s", (language) => {
    setLanguage(language);
    const { container } = render(<About />);
    const copy = dictionaries[language];
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    const titles = Array.from(container.querySelectorAll("h2"), (h2) => h2.textContent);
    expect(titles.slice(0, 3)).toEqual([copy.aboutPage.mission, copy.aboutPage.values.title, copy.aboutPage.team.title]);
    expect(titles).toContain(copy.contact.title);
  });

  it("leaves the four process cards to the home page", () => {
    setLanguage("fr");
    render(<About />);
    expect(screen.queryByText("Direction visuelle")).toBeNull();
  });

  it("keeps the published mission text of the studio and none from the mockup", () => {
    setLanguage("fr");
    const { container } = render(<About />);
    expect(container.textContent).toContain(dictionaries.fr.about[0]);
    expect(container.textContent).not.toMatch(/PossaCode|Possacode/);
  });
});

describe("about copy", () => {
  it("has the same number of values and team members in both languages", () => {
    const { fr, en } = dictionaries;
    expect(fr.aboutPage.values.items).toHaveLength(en.aboutPage.values.items.length);
    expect(fr.aboutPage.team.members).toHaveLength(en.aboutPage.team.members.length);
    expect(fr.aboutPage.values.items).toHaveLength(5);
  });

  it("gives every value a title and one sentence", () => {
    for (const language of ["fr", "en"] as const) {
      for (const item of dictionaries[language].aboutPage.values.items) {
        expect(item.title.length).toBeGreaterThan(0);
        expect(item.description.endsWith(".")).toBe(true);
      }
    }
  });
});
