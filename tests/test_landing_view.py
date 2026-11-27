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


DOCUMENT = ROOT / "src" / "routes" / "layout.tsx"


def test_root_layout_declares_the_french_document() -> None:
    document = DOCUMENT.read_text(encoding="utf-8")
    assert "useUrlLanguage" in document
    assert "lang={language}" in document
    assert "<title>Luilka | Design agency</title>" in document
    assert "family=Inter:wght@400;500;600;700&display=swap" in document


def test_root_layout_renders_the_reference_chrome() -> None:
    body = DOCUMENT.read_text(encoding="utf-8")
    assert all(name in body for name in ("Header", "Footer", "<main>"))
    assert "IconSprite" not in body


def test_design_tokens_match_the_reference() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    assert all(
        token in css
        for token in (
            "--text: #0a0a0a",
            "--paper: #ffffff",
            "--night: #132a22",
            "--accent: #1c3f34",
            "--gold: #c9a24b",
            "--gray: #ebebe8",
            "--bg-soft: #f5f5f2",
        )
    )


OLD_LAVENDER = ("#cfd1db", "#f6f6fa", "#b4b6bf", "#1a1a1f")
OLD_ACCENTS = ("#2a4cb5", "#2a2ae6", "#9b5de5", "--blue:", "--accent-blue", "--accent-purple")
OLD_THEMES = ("--graphite", "#0c5a41", "#262626", "#e8e8e8", "#f6f0e4", "#e9dfc8", "#efe8d8")


def test_theme_is_forest_gold_and_white_with_no_blue_or_violet() -> None:
    css = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")
    for old in (*OLD_LAVENDER, *OLD_ACCENTS, *OLD_THEMES):
        assert old not in css


def test_no_source_or_illustration_keeps_the_old_blue_and_violet() -> None:
    old = (*OLD_ACCENTS[:3], "accent-blue", "accent-purple", "text-blue", "var(--blue)")
    sources = ROOT.joinpath("src").rglob("*.ts*")
    pictures = ROOT.joinpath("public", "images").rglob("*.svg")
    offenders = [
        str(file)
        for file in (*sources, *pictures)
        if any(token in file.read_text(encoding="utf-8") for token in old)
    ]
    assert offenders == []


def test_reference_layout_utilities_are_used() -> None:
    layout = (ROOT / "src" / "components" / "layout.tsx").read_text(encoding="utf-8")
    home = (ROOT / "src" / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
    assert "isolate" in layout
    assert "grid-cols-[1fr_540px]" in home
    buttons = (ROOT / "src" / "shared" / "ui" / "buttons.tsx").read_text(encoding="utf-8")
    assert "pill-shape" in buttons


def test_steps_and_about_sections_have_a_small_shared_gap() -> None:
    sections = (ROOT / "src" / "components" / "sections.tsx").read_text(encoding="utf-8")
    steps_bottom = re.search(r'className="pt-\[70px\] pb-\[(\d+)px\]"', sections)
    about_top = re.search(r'className="pt-\[(\d+)px\] pb-\[90px\]"', sections)
    assert steps_bottom is not None
    assert about_top is not None
    assert int(steps_bottom.group(1)) + int(about_top.group(1)) <= 40


def test_header_typography_follows_readable_sizes() -> None:
    header = (ROOT / "src" / "components" / "layout.tsx").read_text(encoding="utf-8")
    buttons = (ROOT / "src" / "shared" / "ui" / "buttons.tsx").read_text(encoding="utf-8")
    assert "text-(length:--text-lg)" in header
    assert "size-6" in header
    assert "text-(length:--text-base) font-medium ml-0" in header
    assert "text-(length:--text-sm) font-medium" in header
    assert "text-(length:--text-sm) font-medium" in buttons


def test_header_groups_logo_and_navigation_together() -> None:
    header = (ROOT / "src" / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "justify-between" in header
    assert "gap-8" in header
    assert "ml-0" in header
    assert "gap-[36px] ml-auto" in header


def test_header_is_sticky_and_uses_utility_classes() -> None:
    header = (ROOT / "src" / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "sticky top-0" in header
    assert "z-13" in header
    assert "max-w-7xl" in header
    assert "absolute inset-0 -z-1 bg-white/80 backdrop-blur" in header
