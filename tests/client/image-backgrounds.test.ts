import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = "public/images";
const GREEN = "#1c3f34";
const YELLOW = "#c9a24b";

function drawings(): { name: string; svg: string }[] {
  return readdirSync(ROOT).flatMap((folder) => readdirSync(join(ROOT, folder)).map((file) => ({ name: `${folder}/${file}`, svg: readFileSync(join(ROOT, folder, file), "utf8") })));
}

function backgroundColours(svg: string): string[] {
  return [...svg.match(/<linearGradient id="bg".*?<\/linearGradient>/s)![0].matchAll(/stop-color="(#[0-9a-f]{6})"/g)].map((match) => match[1]);
}

describe("image backgrounds", () => {
  it("paints every drawing on one flat green or yellow", () => {
    for (const { name, svg } of drawings()) {
      const colours = backgroundColours(svg);
      expect(new Set(colours).size, name).toBe(1);
      expect([GREEN, YELLOW], name).toContain(colours[0]);
    }
  });

  it("lays a grain of noise over the background of every drawing", () => {
    for (const { name, svg } of drawings()) {
      expect(svg, name).toContain("<feTurbulence");
      expect(svg, name).toMatch(/<rect [^>]*filter="url\(#noise\)"/);
    }
  });

  it("keeps the yellow drawings readable by giving up the yellow accents", () => {
    for (const { name, svg } of drawings().filter(({ svg: s }) => backgroundColours(s)[0] === YELLOW)) {
      expect(svg.replace(/<linearGradient id="bg".*?<\/linearGradient>/s, ""), name).not.toContain(`"${YELLOW}"`);
    }
  });
});
