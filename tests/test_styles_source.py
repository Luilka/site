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


def test_dropdown_panel_fits_its_content() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.dropdown-panel\s*\{\s*@apply [^;]*h-fit", css) is not None
    assert re.search(r"\.dropdown-panel\s*\{\s*@apply [^;]*w-fit", css) is not None
    assert "max-width: 34rem;" in css
    assert re.search(r"(?m)^\s+width: 34rem;\s*$", css) is None


def test_dropdown_image_column_is_a_smaller_square() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert "grid-template-columns: 10rem 1fr;" in css
    assert re.search(r"\.dropdown-media\s*\{\s*@apply [^;]*aspect-square", css) is not None
    assert re.search(r"\.dropdown-media\s*\{\s*@apply [^;]*h-full", css) is not None
    assert "height: 10rem;" in css


def test_dropdown_items_use_a_row_layout() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.dropdown-item\s*\{\s*@apply flex", css) is not None


def test_dropdown_items_have_separators() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.dropdown-item \+ \.dropdown-item\s*\{", css) is not None
    assert "border-top: 1px solid var(--border-ui);" in css
