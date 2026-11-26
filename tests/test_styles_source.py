import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"


def top_level_selectors(css: str) -> list[str]:
    selectors: list[str] = []
    buffer = ""
    depth = 0
    for character in css:
        if character == "{":
            if depth == 0:
                selectors.append(" ".join(buffer.split()))
            depth += 1
            buffer = ""
        elif character == "}":
            depth -= 1
            buffer = ""
        elif depth == 0:
            buffer += character
    return [selector for selector in selectors if selector and not selector.startswith("@")]


def test_stylesheet_uses_tailwind_apply() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert "@apply" in css


def test_there_is_one_stylesheet() -> None:
    stylesheets = sorted(path.relative_to(ROOT).as_posix() for path in SRC.rglob("*.css"))
    assert stylesheets == ["src/globale.css"]


def test_stylesheet_has_no_duplicate_rules() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    selectors = top_level_selectors(css)
    assert len(selectors) == len(set(selectors))


def test_mega_panel_spans_the_viewport() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "fixed left-0 right-0" in header
    assert "top-[4.4375rem]" in header


def test_header_surface_sits_behind_the_navigation() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "-z-1 bg-white/80 backdrop-blur" in header


def test_mega_panel_matches_the_header_surface() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    panel = re.search(r'MEGA_PANEL = "(.*?)"', header)
    assert panel is not None
    assert "bg-white/80" in panel.group(1)
    assert "backdrop-blur" in panel.group(1)


def test_service_grid_fits_four_cards() -> None:
    sections = (SRC / "components" / "sections.tsx").read_text(encoding="utf-8")
    assert "grid grid-cols-4 not-first:mt-[80px]" in sections


def test_mega_cards_use_a_responsive_grid() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "grid-cols-[repeat(auto-fit,_minmax(13rem,_1fr))]" in header


def test_mega_image_fills_its_container_height() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "h-[12rem]" in header
    assert '<Image className="h-full w-full object-cover"' in header


def test_mega_aside_links_have_separators() -> None:
    header = (SRC / "components" / "layout.tsx").read_text(encoding="utf-8")
    assert "[a+&]:border-t" in header


def test_marquee_animation_is_defined_once_in_the_theme() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert "--animate-marquee:" in css
    assert css.count("@keyframes marquee") == 1
