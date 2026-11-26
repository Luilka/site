"""Checks the client source style rules that ESLint cannot express.

Rules: no comment except a JSDoc block, one `.map(` call per component, and the file naming
scheme: <name>.<folder>.ts for the `.ts` files of src/shared, plain names for TSX files.
"""

import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

SOURCE_SUFFIXES = {".ts", ".tsx"}
IGNORED_PARTS = {".git", ".venv", "node_modules", "__nexy__", "dist", "tmp"}
QUOTES = ("'", '"', "`")
WORDS = r"[a-z0-9]+(-[a-z0-9]+)*"
PLAIN_NAME = re.compile(rf"^{WORDS}(\.test|\.d)?\.tsx?$")
ROUTE_NAME = re.compile(r"^\[[a-z]+\]\.tsx$")
FOLDER_KINDS = {
    "cards": "card",
    "layout": "layout",
    "patterns": "pattern",
    "sections": "section",
    "ui": "ui",
    "hooks": "hook",
    "utils": "util",
    "i18n": "i18n",
    "types": "type",
}


@dataclass
class Report:
    failures: list[str] = field(default_factory=list)
    files: int = 0


def line_at(text: str, index: int) -> int:
    return text.count("\n", 0, index) + 1


def skip_string(text: str, index: int) -> int:
    quote = text[index]
    index += 1
    while index < len(text) and text[index] != quote:
        index += 2 if text[index] == "\\" else 1
    return index + 1


def skip_to_line_end(text: str, index: int) -> int:
    end = text.find("\n", index)
    return len(text) if end < 0 else end


def comment_failures(text: str, filename: str) -> list[str]:
    failures: list[str] = []
    index = 0
    while index < len(text):
        if text[index] in QUOTES:
            index = skip_string(text, index)
        elif text.startswith("//", index):
            failures.append(f"{filename}:{line_at(text, index)}: comment not allowed")
            index = skip_to_line_end(text, index)
        elif text.startswith("/*", index):
            if not text.startswith("/**", index):
                failures.append(f"{filename}:{line_at(text, index)}: comment not allowed")
            end = text.find("*/", index + 2)
            index = len(text) if end < 0 else end + 2
        else:
            index += 1
    return failures


COMPONENT_START = re.compile(r"\n(?=(?:export )?(?:default )?function )")


def map_failures(text: str, filename: str) -> list[str]:
    if not filename.endswith(".tsx"):
        return []
    worst = max(chunk.count(".map(") for chunk in COMPONENT_START.split(text))
    if worst <= 1:
        return []
    return [f"{filename}: {worst} .map calls in one component, one is allowed"]


def check_text(text: str, filename: str) -> list[str]:
    return comment_failures(text, filename) + map_failures(text, filename)


def folder_kind(relative: Path) -> str | None:
    parts = relative.parts
    if parts[0] != "src" or len(parts) < 3:
        return None
    if parts[1] == "content":
        return "content"
    if parts[1] == "shared" and len(parts) > 3 and relative.suffix == ".ts":
        return FOLDER_KINDS.get(parts[2])
    return None


def name_matches(relative: Path, kind: str | None) -> bool:
    name = relative.name
    if kind is None:
        return bool(PLAIN_NAME.match(name) or ROUTE_NAME.match(name))
    if name == "index.ts" or re.match(rf"^{WORDS}\.d\.ts$", name):
        return True
    return bool(re.match(rf"^{WORDS}\.{kind}\.tsx?$", name))


def name_failures(relative: Path) -> list[str]:
    """Names at the repository root are set by tools, such as vite.config.ts."""
    if len(relative.parts) == 1:
        return []
    kind = folder_kind(relative)
    failures: list[str] = []
    if not name_matches(relative, kind):
        expected = f"<name>.{kind}.ts(x)" if kind else "lowercase words joined by hyphens"
        failures.append(f"{relative}: file name must be {expected}")
    if "hooks" in relative.parts[:-1] and not relative.name.startswith("use-"):
        failures.append(f"{relative}: a file in a hooks folder must start with use-")
    return failures


def source_files(root: Path) -> list[Path]:
    return [
        path
        for path in root.rglob("*")
        if path.is_file()
        and path.suffix in SOURCE_SUFFIXES
        and not any(part in IGNORED_PARTS for part in path.parts)
    ]


def run_checks(root: Path) -> Report:
    report = Report()
    for path in source_files(root):
        text = path.read_text(encoding="utf-8", errors="replace")
        report.failures += check_text(text, str(path.relative_to(root)))
        report.failures += name_failures(path.relative_to(root))
        report.files += 1
    return report


def main() -> int:
    report = run_checks(Path(__file__).resolve().parent.parent)
    print(f"source files checked: {report.files}")
    for failure in report.failures:
        print(f"- {failure}")
    return 1 if report.failures else 0


if __name__ == "__main__":
    sys.exit(main())
