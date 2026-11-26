"""Checks the KPI sheet: sections, identifiers, row shape and sourced targets."""

import re
import sys
from pathlib import Path

SHEET = Path("docs") / "Product" / "kpi.md"
GROUPS = {"BUG": 3, "QUA": 2, "UX": 3, "ACC": 2, "PERF": 3, "SEO": 2, "SITE": 4, "PROD": 3}
SECTIONS = (
    "## 2. Bugs",
    "## 3. Qualité du code",
    "## 4. UX",
    "## 5. Accessibilité",
    "## 6. Performance",
    "## 7. SEO",
    "## 8. Usage du site",
    "## 9. Produit",
)
COLUMNS = 7
AVAILABILITY = {"disponible", "à instrumenter"}
TARGET_RULE = re.compile(r"D-\d{3}|WCAG|web\.dev")
ROW = re.compile(r"^\|\s*([A-Z]+-\d{2})\s*\|")


def table_rows(text: str) -> list[list[str]]:
    rows = [line for line in text.splitlines() if ROW.match(line)]
    return [[cell.strip() for cell in line.strip().strip("|").split("|")] for line in rows]


def row_failures(row: list[str]) -> list[str]:
    identifier = row[0]
    if len(row) != COLUMNS:
        return [f"{identifier}: {len(row)} columns, expected {COLUMNS}"]
    failures = [f"{identifier}: empty cell" for cell in row if not cell]
    target, availability = row[5], row[6]
    if target != "À nommer" and not TARGET_RULE.search(target):
        failures.append(f"{identifier}: target must be 'À nommer' or cite its rule")
    if availability not in AVAILABILITY:
        failures.append(f"{identifier}: availability must be one of {sorted(AVAILABILITY)}")
    return failures


def group_failures(identifiers: list[str]) -> list[str]:
    failures: list[str] = []
    if len(set(identifiers)) != len(identifiers):
        failures.append("duplicate identifier")
    for group, count in GROUPS.items():
        expected = [f"{group}-{number:02d}" for number in range(1, count + 1)]
        missing = [name for name in expected if name not in identifiers]
        failures += [f"missing identifier: {name}" for name in missing]
    known = tuple(f"{group}-" for group in GROUPS)
    failures += [f"unknown group: {name}" for name in identifiers if not name.startswith(known)]
    return failures


def check_text(text: str) -> list[str]:
    failures = [f"missing section: {section}" for section in SECTIONS if section not in text]
    rows = table_rows(text)
    for row in rows:
        failures += row_failures(row)
    return failures + group_failures([row[0] for row in rows])


def run_checks(root: Path) -> list[str]:
    target = root / SHEET
    if not target.is_file():
        return ["KPI sheet missing"]
    return check_text(target.read_text(encoding="utf-8"))


def main() -> int:
    failures = run_checks(Path(__file__).resolve().parent.parent)
    print(f"KPI identifiers expected: {sum(GROUPS.values())}")
    for failure in failures:
        print(f"- {failure}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
