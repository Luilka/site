import importlib.util
import json
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_script() -> ModuleType:
    path = ROOT / "scripts" / "build_sitemap.py"
    spec = importlib.util.spec_from_file_location("build_sitemap", path)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


build_sitemap = load_script()
SITE = json.loads((ROOT / "src" / "content" / "site.json").read_text(encoding="utf-8"))
DETAILS = json.loads((ROOT / "src" / "content" / "details.json").read_text(encoding="utf-8"))


def test_the_sitemap_file_is_the_one_the_script_writes() -> None:
    written = (ROOT / "public" / "sitemap.xml").read_text(encoding="utf-8")
    assert written == build_sitemap.build(ROOT)


def test_the_sitemap_lists_every_page_in_both_languages() -> None:
    xml = build_sitemap.build(ROOT)
    base = SITE["url"].rstrip("/")
    for language in ("fr", "en"):
        assert f"<loc>{base}/{language}</loc>" in xml
        for page in ("about", "services", "products", "works", "blog", "contact", "job"):
            assert f"<loc>{base}/{language}/{page}</loc>" in xml


def test_the_sitemap_lists_every_case_product_service_and_post() -> None:
    xml = build_sitemap.build(ROOT)
    base = SITE["url"].rstrip("/")
    for kind, slugs in DETAILS.items():
        for slug in slugs:
            assert f"<loc>{base}/fr/{kind}/{slug}</loc>" in xml
            assert f"<loc>{base}/en/{kind}/{slug}</loc>" in xml


def test_each_address_points_to_its_other_language() -> None:
    xml = build_sitemap.build(ROOT)
    base = SITE["url"].rstrip("/")
    assert f'hreflang="en" href="{base}/en/about"' in xml
    assert f'hreflang="fr" href="{base}/fr/about"' in xml


def test_robots_txt_follows_the_indexable_setting_and_names_the_sitemap() -> None:
    robots = (ROOT / "public" / "robots.txt").read_text(encoding="utf-8")
    base = SITE["url"].rstrip("/")
    assert ("Allow: /" in robots) == bool(SITE["indexable"])
    assert ("Disallow: /\n" in robots) == (not SITE["indexable"])
    assert f"Sitemap: {base}/sitemap.xml" in robots
