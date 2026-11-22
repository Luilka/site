from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ROOT / "src" / "routes"
PREFIXED_ROUTES = ROUTES / "[lang]"
PAGE_NAMES = ("about", "blog", "contact", "job", "products", "services", "works")


def test_every_page_has_a_prefixed_route() -> None:
    assert (PREFIXED_ROUTES / "index.tsx").is_file()
    for name in PAGE_NAMES:
        assert (PREFIXED_ROUTES / f"{name}.tsx").is_file(), name


def test_prefixed_routes_hold_the_real_pages() -> None:
    for name in PAGE_NAMES:
        source = (PREFIXED_ROUTES / f"{name}.tsx").read_text(encoding="utf-8")
        assert "PageHero" in source, name
        assert "export { default }" not in source, name


def test_no_page_is_duplicated_outside_the_prefixed_routes() -> None:
    for name in PAGE_NAMES:
        assert not (ROUTES / f"{name}.tsx").exists(), name


def test_the_language_hook_redirects_unprefixed_urls() -> None:
    source = (ROOT / "src" / "i18n" / "language.ts").read_text(encoding="utf-8")
    assert "legacyRedirectTarget" in source
    assert "window.location.replace" in source
