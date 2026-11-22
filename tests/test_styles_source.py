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
    panel = re.search(r"(?ms)^  \.dropdown-panel \{(.*?)^  \}", css)
    assert panel is not None
    assert "h-fit" in panel.group(1)
    assert "w-fit" in panel.group(1)
    assert "max-width" not in panel.group(1)


def test_dropdown_panel_uses_flex() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    panel = re.search(r"(?ms)^  \.dropdown-panel \{(.*?)^  \}", css)
    assert panel is not None
    assert re.search(r"\.dropdown-panel\s*\{\s*@apply [^;]*flex", css) is not None
    assert "grid-template-columns" not in panel.group(1)


def test_dropdown_image_fills_its_container_height() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    media = re.search(r"(?ms)^    \.dropdown-media \{(.*?)^    \}", css)
    assert media is not None
    assert "h-full" in media.group(1)
    assert "w-120" in media.group(1)
    assert "aspect-square" not in media.group(1)
    assert "height: 10rem;" not in media.group(1)
    image = re.search(r"(?ms)^      img \{(.*?)^      \}", media.group(1))
    assert image is not None
    assert "@apply h-full w-full;" in image.group(1)


def test_dropdown_items_stack_in_a_column() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.dropdown-item\s*\{\s*@apply flex flex-col", css) is not None


def test_dropdown_items_have_separators() -> None:
    css = (SRC / "globale.css").read_text(encoding="utf-8")
    assert re.search(r"\.dropdown-item \+ \.dropdown-item\s*\{", css) is not None
    assert "border-top: 1px solid var(--border-ui);" in css
