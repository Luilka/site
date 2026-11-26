from collections.abc import Iterator
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

FORBIDDEN = {
    "\u2014": "em dash",
    "\u2013": "en dash",
    "\u2192": "right arrow",
    "\u2190": "left arrow",
    "\u21d2": "implies arrow",
    "\u2026": "ellipsis character",
    "\u201c": "left curly quote",
    "\u201d": "right curly quote",
    "\u2018": "left curly apostrophe",
    "\u2019": "right curly apostrophe",
    "\u2022": "bullet",
    "\u00b7": "middle dot",
    "\u2248": "almost equal",
    "\u00d7": "times sign",
    "\u2713": "check mark",
    "\u2714": "heavy check mark",
    "\u2717": "ballot x",
    "\u26a0": "warning sign",
    "\u2605": "black star",
    "\u2500": "box horizontal",
    "\u2502": "box vertical",
    "\u251c": "box tee",
    "\u2514": "box corner",
    "\u00a0": "no-break space",
    "\u200b": "zero-width space",
    "\u200c": "zero-width non-joiner",
    "\u200d": "zero-width joiner",
    "\ufeff": "byte order mark",
}

SUFFIXES = {".py", ".ts", ".tsx", ".css", ".json", ".md", ".yml", ".yaml", ".svg"}
SKIPPED = {
    ".agents",
    ".claude",
    ".git",
    ".venv",
    "node_modules",
    "tmp",
    "__nexy__",
    ".pytest_cache",
}


def scanned_files() -> Iterator[Path]:
    for path in ROOT.rglob("*"):
        if not path.is_file() or path.suffix not in SUFFIXES:
            continue
        if any(part in SKIPPED for part in path.relative_to(ROOT).parts):
            continue
        yield path


def test_source_files_have_no_characters_a_person_does_not_type() -> None:
    offenders = []
    for path in scanned_files():
        text = path.read_text(encoding="utf-8")
        for character, name in FORBIDDEN.items():
            if character in text:
                offenders.append(f"{path.relative_to(ROOT)} contains {name}")
    assert offenders == []
