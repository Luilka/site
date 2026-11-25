from pathlib import Path
from typing import Any

import yaml

ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github" / "workflows" / "ci.yml"


def commands() -> str:
    data: Any = yaml.safe_load(WORKFLOW.read_text(encoding="utf-8"))
    steps = data["jobs"]["quality"]["steps"]
    return "\n".join(step.get("run", "") for step in steps)


def test_ci_checks_python_lint() -> None:
    assert "ruff check" in commands()


def test_ci_checks_python_format() -> None:
    assert "ruff format --check" in commands()


def test_ci_checks_types() -> None:
    assert "mypy" in commands()


def test_ci_checks_client_types() -> None:
    assert "tsc --noEmit" in commands()


def test_ci_lints_the_client() -> None:
    assert "npm run lint" in commands()


def test_ci_checks_the_client_code_style() -> None:
    assert "npm run check:style" in commands()


def test_ci_checks_the_documentation() -> None:
    assert "npm run check:docs" in commands()


def test_ci_checks_the_kpi_sheet() -> None:
    assert "npm run check:kpi" in commands()


def test_ci_runs_python_tests() -> None:
    assert "pytest" in commands()


def test_ci_runs_client_tests() -> None:
    assert "npm test" in commands()


def test_ci_builds_project() -> None:
    assert "nx build" in commands()


def test_ci_uses_the_pinned_python_version() -> None:
    data: Any = yaml.safe_load(WORKFLOW.read_text(encoding="utf-8"))
    steps = data["jobs"]["quality"]["steps"]
    setup = next(step for step in steps if "astral-sh/setup-uv" in str(step.get("uses", "")))
    assert setup["with"]["python-version"] == "3.13.15"


def test_ci_uses_the_pinned_node_version() -> None:
    data: Any = yaml.safe_load(WORKFLOW.read_text(encoding="utf-8"))
    steps = data["jobs"]["quality"]["steps"]
    setup = next(step for step in steps if "actions/setup-node" in str(step.get("uses", "")))
    assert setup["with"]["node-version-file"] == ".node-version"
