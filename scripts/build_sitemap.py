"""Writes public/sitemap.xml and public/robots.txt from src/content/site.json and details.json."""

import json
from pathlib import Path

LANGUAGES = ("fr", "en")
PAGES = ("about", "services", "products", "works", "blog", "contact", "job")


def addresses(details: dict[str, list[str]]) -> list[str]:
    detail_paths = [f"/{kind}/{slug}" for kind, slugs in details.items() for slug in slugs]
    return ["", *(f"/{page}" for page in PAGES), *detail_paths]


def entry(base: str, path: str, language: str) -> str:
    links = "".join(
        f'<xhtml:link rel="alternate" hreflang="{other}" href="{base}/{other}{path}"/>'
        for other in LANGUAGES
    )
    return f"<url><loc>{base}/{language}{path}</loc>{links}</url>"


def build(root: Path) -> str:
    site = json.loads((root / "src" / "content" / "site.json").read_text(encoding="utf-8"))
    details = json.loads((root / "src" / "content" / "details.json").read_text(encoding="utf-8"))
    base = site["url"].rstrip("/")
    urls = [entry(base, path, language) for path in addresses(details) for language in LANGUAGES]
    header = '<?xml version="1.0" encoding="UTF-8"?>\n'
    open_tag = (
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" '
        'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n'
    )
    return header + open_tag + "\n".join(urls) + "\n</urlset>\n"


def robots(root: Path) -> str:
    site = json.loads((root / "src" / "content" / "site.json").read_text(encoding="utf-8"))
    rule = "Allow: /" if site["indexable"] else "Disallow: /"
    return f"User-agent: *\n{rule}\n\nSitemap: {site['url'].rstrip('/')}/sitemap.xml\n"


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    (root / "public" / "sitemap.xml").write_text(build(root), encoding="utf-8")
    (root / "public" / "robots.txt").write_text(robots(root), encoding="utf-8")


if __name__ == "__main__":
    main()
