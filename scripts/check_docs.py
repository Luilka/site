"""Checks the documentation rules: typography, links, fences, index, ADR model, ids, notes."""

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

DOC_ROOTS = ("docs", "reports", "memoires")
ROOT_FILES = ("README.md", "AGENTS.md", "CLAUDE.md")
SKIPPED_PREFIXES = ("http://", "https://", "mailto:", "#", "data:", "file:")
MARKERS = ("TO" + "DO", "FI" + "XME", "T" + "BD", "X" + "X" + "X")
FORBIDDEN_CHARACTERS = {
    chr(0x2014): "em dash U+2014",
    chr(0x2013): "en dash U+2013",
}
FORBIDDEN_RANGES = (
    (0x3400, 0x9FFF, "CJK"),
    (0x3040, 0x30FF, "CJK"),
    (0xAC00, 0xD7AF, "CJK"),
    (0x1F300, 0x1FAFF, "emoji"),
    (0x2600, 0x27BF, "pictograph"),
)
ADR_SECTIONS = (
    "Titre",
    "Statut",
    "Contexte",
    "Options",
    "Décision",
    "Conséquences",
    "Propriétaire",
    "Date",
)
NOTE_NAME = re.compile(r"^\d{4}-\d{2}-\d{2}-[a-z0-9-]+\.md$")
NOTE_EXEMPT = {"README.md", "modele-de-note.md"}
ID_PREFIXES = (("D-", 3), ("Q-", 3))


@dataclass
class Report:
    failures: list[str] = field(default_factory=list)
    files: int = 0
    links: int = 0


def forbidden_typography(text: str) -> list[str]:
    labels = [label for char, label in FORBIDDEN_CHARACTERS.items() if char in text]
    for start, end, label in FORBIDDEN_RANGES:
        if any(start <= ord(char) <= end for char in text):
            labels.append(label)
    labels += [f"marker {m}" for m in MARKERS if re.search(rf"\b{m}\b", text, re.IGNORECASE)]
    return labels


def relative_link_targets(text: str) -> list[str]:
    targets: list[str] = []
    fence = False
    for line in text.splitlines():
        if line.strip().startswith("```"):
            fence = not fence
            continue
        if fence:
            continue
        for match in re.finditer(r"\]\(([^)]+)\)", re.sub(r"`[^`]*`", "", line)):
            target = match.group(1).strip().split("#", 1)[0]
            if target and not target.startswith(SKIPPED_PREFIXES):
                targets.append(target)
    return targets


def fence_open(text: str) -> bool:
    return sum(1 for line in text.splitlines() if line.strip().startswith("```")) % 2 == 1


def markdown_files(root: Path) -> list[Path]:
    paths = [root / name for name in ROOT_FILES if (root / name).is_file()]
    for folder in DOC_ROOTS:
        paths += sorted((root / folder).rglob("*.md")) if (root / folder).is_dir() else []
    return paths


def check_file(path: Path, root: Path) -> tuple[list[str], int]:
    text = path.read_text(encoding="utf-8")
    name = str(path.relative_to(root))
    failures = [f"{name}: forbidden typography: {label}" for label in forbidden_typography(text)]
    targets = relative_link_targets(text)
    failures += [
        f"{name}: missing link target: {t}" for t in targets if not (path.parent / t).exists()
    ]
    if fence_open(text):
        failures.append(f"{name}: code fence not closed")
    return failures, len(targets)


def check_index(root: Path) -> list[str]:
    docs = root / "docs"
    index = (
        (docs / "README.md").read_text(encoding="utf-8") if (docs / "README.md").is_file() else ""
    )
    listed = [p for p in sorted(docs.rglob("*")) if p.is_file() and p.name != "README.md"]
    return [
        f"docs/README.md: does not list {p.relative_to(docs)}"
        for p in listed
        if p.name not in index
    ]


def check_adr(root: Path) -> list[str]:
    failures: list[str] = []
    for path in sorted((root / "docs").rglob("adr-*.md")):
        headings = set(re.findall(r"(?m)^## (.+)$", path.read_text(encoding="utf-8")))
        missing = [name for name in ADR_SECTIONS if name not in headings]
        if missing:
            failures.append(f"{path.relative_to(root)}: ADR sections missing: {missing}")
    return failures


def check_notes(root: Path) -> list[str]:
    folder = root / "memoires"
    notes = [p for p in sorted(folder.glob("*.md")) if p.name not in NOTE_EXEMPT]
    return [
        f"memoires/{p.name}: name must be AAAA-MM-JJ-subject.md"
        for p in notes
        if not NOTE_NAME.match(p.name)
    ]


def check_ids(text: str) -> list[str]:
    failures: list[str] = []
    for prefix, width in ID_PREFIXES:
        found = sorted({int(v) for v in re.findall(rf"\b{prefix}(\d{{{width}}})\b", text)})
        gaps = [n for n in range(1, found[-1] + 1) if n not in found] if found else []
        if gaps:
            failures.append(f"series {prefix}: missing numbers {gaps}")
    return failures


def run_checks(root: Path) -> Report:
    report = Report()
    contents: list[str] = []
    for path in markdown_files(root):
        failures, links = check_file(path, root)
        report.failures += failures
        report.links += links
        report.files += 1
        contents.append(path.read_text(encoding="utf-8"))
    report.failures += check_index(root) + check_adr(root) + check_notes(root)
    report.failures += check_ids("\n".join(contents))
    return report


def main() -> int:
    report = run_checks(Path(__file__).resolve().parent.parent)
    print(f"markdown files checked: {report.files}")
    print(f"relative links checked: {report.links}")
    for failure in report.failures:
        print(f"- {failure}")
    return 1 if report.failures else 0


if __name__ == "__main__":
    sys.exit(main())
