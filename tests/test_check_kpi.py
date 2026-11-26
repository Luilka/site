import importlib.util
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_script() -> ModuleType:
    spec = importlib.util.spec_from_file_location("check_kpi", ROOT / "scripts" / "check_kpi.py")
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


kpi = load_script()


def cells(identifier: str, target: str = "À nommer", availability: str = "disponible") -> list[str]:
    return [identifier, "Nom", "Formule", "Source", "Owner", target, availability]


def row(identifier: str) -> str:
    return "| " + " | ".join(cells(identifier)) + " |"


def test_the_project_sheet_follows_the_rules() -> None:
    assert kpi.run_checks(ROOT) == []


def test_a_missing_sheet_is_reported(tmp_path: Path) -> None:
    assert kpi.run_checks(tmp_path) == ["KPI sheet missing"]


def test_a_target_without_a_rule_is_refused() -> None:
    assert kpi.row_failures(cells("BUG-01", "95 %")) == [
        "BUG-01: target must be 'À nommer' or cite its rule"
    ]


def test_a_target_that_cites_its_rule_is_accepted() -> None:
    assert kpi.row_failures(cells("QUA-02", "0, règle D-005")) == []


def test_an_unknown_availability_is_refused() -> None:
    assert "availability" in kpi.row_failures(cells("BUG-01", availability="bientôt"))[0]


def test_a_row_with_the_wrong_number_of_columns_is_refused() -> None:
    assert kpi.row_failures(["BUG-01", "Nom"]) == ["BUG-01: 2 columns, expected 7"]


def test_missing_and_duplicate_identifiers_are_reported() -> None:
    failures = kpi.group_failures(["BUG-01", "BUG-01", "BUG-03"])
    assert "duplicate identifier" in failures
    assert "missing identifier: BUG-02" in failures
    assert "missing identifier: SITE-04" in failures


def test_a_missing_section_is_reported() -> None:
    assert "missing section: ## 2. Bugs" in kpi.check_text(row("BUG-01"))
