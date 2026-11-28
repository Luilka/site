from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ROOT / "src" / "routes"
PREFIXED_ROUTES = ROUTES / "[lang]"
PAGE_NAMES = ("about", "blog", "contact", "job", "products", "services", "works")


def page_route(name: str) -> Path:
    nested = PREFIXED_ROUTES / name / "index.tsx"
    return nested if nested.is_file() else PREFIXED_ROUTES / f"{name}.tsx"


def test_every_page_has_a_prefixed_route() -> None:
    assert (PREFIXED_ROUTES / "index.tsx").is_file()
    for name in PAGE_NAMES:
        assert page_route(name).is_file(), name


HEROES = ("PageHero", "PageFrame", "AboutHero")


def test_prefixed_routes_hold_the_real_pages() -> None:
    for name in PAGE_NAMES:
        source = page_route(name).read_text(encoding="utf-8")
        assert any(hero in source for hero in HEROES), name
        assert "export { default }" not in source, name


def test_no_page_is_duplicated_outside_the_prefixed_routes() -> None:
    for name in PAGE_NAMES:
        assert not (ROUTES / f"{name}.tsx").exists(), name


def test_the_language_hook_does_not_redirect_unprefixed_urls() -> None:
    source = (ROOT / "src" / "shared" / "i18n" / "use-language.i18n.ts").read_text(encoding="utf-8")
    assert "legacyRedirectTarget" not in source
    assert "window.location.replace" not in source


def test_root_route_renders_the_french_home() -> None:
    source = (ROOT / "src" / "routes" / "index.tsx").read_text(encoding="utf-8")
    assert "export { default }" in source
    assert '"./[lang]/index.tsx"' in source
