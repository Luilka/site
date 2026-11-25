import importlib.util
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]
ADR = "\n".join(
    f"## {name}\n\ntext\n"
    for name in (
        "Titre",
        "Statut",
        "Contexte",
        "Options",
        "Décision",
        "Conséquences",
        "Propriétaire",
        "Date",
    )
)


def load_script() -> ModuleType:
    spec = importlib.util.spec_from_file_location("check_docs", ROOT / "scripts" / "check_docs.py")
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


docs = load_script()


def write(root: Path, name: str, text: str) -> None:
    path = root / name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def test_dashes_and_markers_are_refused() -> None:
    labels = docs.forbidden_typography(f"a {chr(0x2014)} b {chr(0x2013)} c " + "TO" + "DO")
    assert labels == ["em dash U+2014", "en dash U+2013", "marker " + "TO" + "DO"]


def test_markers_inside_other_words_are_accepted() -> None:
    assert docs.forbidden_typography("JTBD, Todou, " + "Hi" + "XXXs") == []


def test_emoji_and_cjk_are_refused() -> None:
    assert docs.forbidden_typography("\U0001f600") == ["emoji"]
    assert docs.forbidden_typography("中") == ["CJK"]


def test_plain_french_text_is_accepted() -> None:
    assert docs.forbidden_typography("Un studio de design, centré sur l'utilisateur.") == []


def test_links_inside_code_are_ignored() -> None:
    text = "[a](a.md) `[b](b.md)`\n```\n[c](c.md)\n```\n[d](https://x.test)"
    assert docs.relative_link_targets(text) == ["a.md"]


def test_unclosed_fence_is_detected() -> None:
    assert docs.fence_open("```mermaid\nflowchart LR\n")
    assert not docs.fence_open("```\ncode\n```\n")


def test_missing_link_target_is_reported(tmp_path: Path) -> None:
    write(tmp_path, "README.md", "[gone](docs/gone.md)")
    assert docs.run_checks(tmp_path).failures == ["README.md: missing link target: docs/gone.md"]


def test_file_missing_from_the_index_is_reported(tmp_path: Path) -> None:
    write(tmp_path, "docs/README.md", "index")
    write(tmp_path, "docs/UX/principles.md", "text")
    assert docs.check_index(tmp_path) == ["docs/README.md: does not list UX/principles.md"]


def test_adr_without_all_sections_is_reported(tmp_path: Path) -> None:
    write(tmp_path, "docs/Technique/adr-001-a.md", "## Titre\n")
    assert "ADR sections missing" in docs.check_adr(tmp_path)[0]
    write(tmp_path, "docs/Technique/adr-001-a.md", ADR)
    assert docs.check_adr(tmp_path) == []


def test_note_names_follow_the_date_pattern(tmp_path: Path) -> None:
    write(tmp_path, "memoires/2026-11-26-subject.md", "x")
    write(tmp_path, "memoires/bad.md", "x")
    assert docs.check_notes(tmp_path) == ["memoires/bad.md: name must be AAAA-MM-JJ-subject.md"]


def test_gaps_in_decision_numbers_are_reported() -> None:
    assert docs.check_ids("D-001 D-003") == ["series D-: missing numbers [2]"]
    assert docs.check_ids("D-001 D-002 Q-001") == []


def test_the_project_documentation_follows_the_rules() -> None:
    assert docs.run_checks(ROOT).failures == []
