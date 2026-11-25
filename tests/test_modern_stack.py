import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
PAGES = ("about", "blog", "contact", "job", "products", "services", "works")


def page_route(name: str) -> Path:
    nested = SRC / "routes" / "[lang]" / name / "index.tsx"
    return nested if nested.is_file() else SRC / "routes" / "[lang]" / f"{name}.tsx"


def test_newsletter_uses_the_react_19_action_state() -> None:
    source = (SRC / "shared" / "hooks" / "use-newsletter.hook.ts").read_text(encoding="utf-8")
    assert "useActionState" in source
    form = (SRC / "components" / "layout" / "newsletter-form.layout.tsx").read_text(
        encoding="utf-8"
    )
    assert "action={" in form


def test_every_inner_page_uses_the_shared_page_hero() -> None:
    for name in PAGES:
        source = page_route(name).read_text(encoding="utf-8")
        assert "PageHero" in source or "PageFrame" in source, name


def test_contact_panel_is_shared_by_landing_and_contact_page() -> None:
    landing = (SRC / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
    contact = (SRC / "routes" / "[lang]" / "contact.tsx").read_text(encoding="utf-8")
    home = SRC / "components" / "sections" / "(home)"
    sections = "".join(path.read_text(encoding="utf-8") for path in home.glob("home-*.tsx"))
    assert "HomeProof" in landing
    assert "ContactPanel" in sections
    assert "ContactPanel" in contact


def test_styles_use_current_css_features() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert "@layer components" in css
    assert "&:hover" in css
    assert "color-mix(" in css
    assert "text-wrap: balance" in css


def test_lucide_is_pinned() -> None:
    package = json.loads((ROOT / "package.json").read_text(encoding="utf-8"))
    assert package["dependencies"]["lucide-react"] == "1.77.0"


def test_step_card_uses_the_reference_padding() -> None:
    source = (SRC / "components" / "cards" / "step-text.card.tsx").read_text(encoding="utf-8")
    assert 'className="t p-8"' in source


def test_ui_icons_come_from_lucide() -> None:
    sources = list((SRC / "components").rglob("*.tsx")) + list((SRC / "routes").rglob("*.tsx"))
    assert any('from "lucide-react"' in source.read_text(encoding="utf-8") for source in sources)


def test_layout_does_not_redirect_unprefixed_urls() -> None:
    layout = (SRC / "routes" / "layout.tsx").read_text(encoding="utf-8")
    assert "useLanguageRedirect" not in layout


def test_header_uses_reusable_dropdown_items() -> None:
    entry = (SRC / "components" / "layout" / "navigation" / "nav-entry.layout.tsx").read_text(
        encoding="utf-8"
    )
    assert "NavDropdown" in entry


def test_content_has_french_and_english_dictionaries() -> None:
    content = (SRC / "shared" / "i18n" / "dictionaries.i18n.ts").read_text(encoding="utf-8")
    assert '"fr"' in content
    assert '"en"' in content


def test_ci_runs_on_the_three_branches() -> None:
    workflow = (ROOT / ".github" / "workflows" / "ci.yml").read_text(encoding="utf-8")
    assert all(name in workflow for name in ("develop", "staging", "main"))
