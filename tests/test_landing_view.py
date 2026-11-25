import re
from pathlib import Path

from fastapi.testclient import TestClient
from nexy.app import app

ROOT = Path(__file__).resolve().parents[1]


def css_rule(css: str, selector: str) -> str:
    match = re.search(rf"(?ms)^{re.escape(selector)}\s*\{{(.*?)^}}", css)
    assert match is not None, f"Missing CSS rule: {selector}"
    return match.group(1)


def test_home_route_is_registered() -> None:
    assert TestClient(app).get("/").status_code == 200


def test_root_layout_declares_the_french_document() -> None:
    layout = (ROOT / "src" / "routes" / "layout.tsx").read_text(encoding="utf-8")
    assert "lang={language}" in layout
    assert "useUrlLanguage" in layout
    head = (ROOT / "src" / "components" / "layout" / "document-head.tsx").read_text(
        encoding="utf-8"
    )
    fonts = (ROOT / "src" / "components" / "layout" / "font-links.tsx").read_text(encoding="utf-8")
    assert "<title>Luilka | Design agency</title>" in head
    assert "family=Inter:wght@400;500;600;700&display=swap" in fonts


def test_root_layout_renders_the_reference_chrome() -> None:
    body = (ROOT / "src" / "components" / "layout" / "document-body.tsx").read_text(
        encoding="utf-8"
    )
    assert all(name in body for name in ("IconSprite", "Header", "Footer", "<main>"))


def test_design_tokens_match_the_reference() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    assert all(
        token in css
        for token in (
            "#2a4cb5",
            "#2a2ae6",
            "#9b5de5",
            "#cfd1db",
            "#f6f6fa",
        )
    )


def test_reference_class_names_are_defined() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    assert all(
        name in css
        for name in (
            ".nav",
            ".prod",
            ".hero-grid",
            ".steps-grid",
            ".prod-grid",
            ".work-grid",
            ".btn-outline",
        )
    )


def test_steps_and_about_sections_have_a_small_shared_gap() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    steps = css_rule(css, ".steps")
    about = css_rule(css, ".about")
    steps_padding = re.search(r"padding:\s*\d+px\s+0\s+(\d+)px", steps)
    about_padding = re.search(r"padding:\s*(\d+)px\s+0\s+\d+px", about)
    assert steps_padding is not None
    assert about_padding is not None
    steps_bottom = int(steps_padding.group(1))
    about_top = int(about_padding.group(1))
    assert steps_bottom + about_top <= 40


def test_header_typography_follows_readable_sizes() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    assert "font-size: var(--text-lg)" in css_rule(css, ".logo")
    assert "size-6" in css_rule(css, ".logo svg")
    assert "font-size: var(--text-base)" in css_rule(css, ".nav-links")
    assert "font-size: var(--text-sm)" in css_rule(css, ".lang")
    assert "font-size: var(--text-sm)" in css_rule(css, ".btn-outline")


def test_header_groups_logo_and_navigation_together() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    header = (ROOT / "src" / "components" / "layout" / "header.tsx").read_text(encoding="utf-8")
    assert "justify-between" in header
    assert "gap-8" in header
    assert "margin-left: 0" in css_rule(css, ".nav-links")
    assert "margin-left: auto" in css_rule(css, ".nav-right")


def test_header_is_sticky_and_uses_utility_classes() -> None:
    header = (ROOT / "src" / "components" / "layout" / "header.tsx").read_text(encoding="utf-8")
    assert "sticky top-0" in header
    assert "z-13" in header
    assert "max-w-7xl" in header
    assert 'className="header-surface bg-white/80 backdrop-blur"' in header
