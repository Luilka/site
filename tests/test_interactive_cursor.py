import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / "src" / "globale.css").read_text(encoding="utf-8")


def applied_selectors(utility: str) -> set[str]:
    match = re.search(rf"(?ms)^([^{{}}]+)\{{\s*@apply {utility};\s*\}}", CSS)
    assert match is not None, utility
    return {part.strip() for part in match.group(1).split(",")}


def test_interactive_controls_show_a_pointer_cursor() -> None:
    selectors = applied_selectors("cursor-pointer")
    for selector in (
        "a",
        "button",
        "summary",
        "label",
        '[role="button"]',
        '[role="link"]',
        '[role="tab"]',
        '[role="checkbox"]',
        '[role="radio"]',
        '[role="switch"]',
    ):
        assert selector in selectors, selector
    for selector in ("input", "select", "textarea"):
        assert selector not in selectors, selector


def test_text_fields_keep_a_text_cursor() -> None:
    assert applied_selectors("cursor-text") == {"input", "textarea"}
