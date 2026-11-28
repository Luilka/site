import { render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { useDocumentHead } from "@/shared/hooks/use-document-head.hook.ts";
import type { PageMeta } from "@/shared/types";

const META: PageMeta = {
  title: "A user-centric design studio | Luilka",
  tags: [
    { name: "description", content: "English description." },
    { property: "og:locale", content: "en_US" },
  ],
  links: [{ rel: "canonical", href: "https://luilka.example/en/about" }],
  jsonLd: null,
};

function Probe({ meta, language }: { meta: PageMeta; language: "fr" | "en" }) {
  useDocumentHead(meta, language);
  return null;
}

afterEach(() => {
  document.head.innerHTML = "";
  document.title = "";
  document.documentElement.lang = "fr";
});

describe("document head sync", () => {
  it("writes the title, the language, and the tags of the page into the document", () => {
    render(<Probe meta={META} language="en" />);
    expect(document.title).toBe("A user-centric design studio | Luilka");
    expect(document.documentElement.lang).toBe("en");
    expect(document.querySelector("meta[name='description']")?.getAttribute("content")).toBe("English description.");
    expect(document.querySelector("meta[property='og:locale']")?.getAttribute("content")).toBe("en_US");
    expect(document.querySelector("link[rel='canonical']")?.getAttribute("href")).toBe("https://luilka.example/en/about");
  });

  it("replaces the tags the server wrote instead of adding a second copy", () => {
    document.head.innerHTML = '<meta name="description" content="Description du serveur.">';
    render(<Probe meta={META} language="en" />);
    expect(document.querySelectorAll("meta[name='description']")).toHaveLength(1);
    expect(document.querySelector("meta[name='description']")?.getAttribute("content")).toBe("English description.");
  });

  it("follows the page when the meta changes", () => {
    const view = render(<Probe meta={META} language="en" />);
    view.rerender(<Probe meta={{ ...META, title: "Autre titre" }} language="fr" />);
    expect(document.title).toBe("Autre titre");
    expect(document.documentElement.lang).toBe("fr");
  });
});
