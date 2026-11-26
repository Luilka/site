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
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    panel = re.search(r"(?ms)^  \.mega-panel \{(.*?)^  \}", css)
    assert panel is not None
    assert "position: fixed" not in panel.group(1)
    assert "@apply fixed left-0 right-0" in panel.group(1)
    assert "top: 4.4375rem;" in panel.group(1)


def test_header_surface_sits_behind_the_navigation() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    surface = re.search(r"(?ms)^\.header-surface \{(.*?)^\}", css)
    assert surface is not None
    assert "bg-white/80" in surface.group(1)
    assert "backdrop-blur" in surface.group(1)
    assert "z-index: -1;" in surface.group(1)


def test_mega_panel_matches_the_header_surface() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    panel = re.search(r"(?ms)^  \.mega-panel \{(.*?)^  \}", css)
    assert panel is not None
    assert "bg-white/80" in panel.group(1)
    assert "backdrop-blur" in panel.group(1)
    assert "background: var(--paper);" not in panel.group(1)


def test_service_grid_fits_four_cards() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    grid = re.search(r"(?ms)^\.svc-grid \{(.*?)^\}", css)
    assert grid is not None
    assert "grid grid-cols-4" in grid.group(1)


def test_mega_cards_use_a_responsive_grid() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    grid = re.search(r"(?ms)^    \.mega-grid \{(.*?)^    \}", css)
    assert grid is not None
    assert "repeat(auto-fit" in grid.group(1)
    assert "minmax(13rem,_1fr)" in grid.group(1)


def test_mega_image_fills_its_container_height() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    media = re.search(r"(?ms)^    \.mega-media \{(.*?)^    \}", css)
    assert media is not None
    assert "h-[12rem]" in media.group(1)
    image = re.search(r"(?ms)^      img \{(.*?)^      \}", media.group(1))
    assert image is not None
    assert "@apply h-full w-full;" in image.group(1)


def test_mega_aside_links_have_separators() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.mega-aside a \+ a\s*\{", css) is not None
    assert "border-top: 1px solid var(--border-ui);" in css
