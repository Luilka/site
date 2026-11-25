import importlib.util
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_script() -> ModuleType:
    spec = importlib.util.spec_from_file_location(
        "check_code_style", ROOT / "scripts" / "check_code_style.py"
    )
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


style = load_script()


def test_line_comment_is_refused() -> None:
    assert style.check_text("const a = 1; // note\n", "a.ts") == ["a.ts:1: comment not allowed"]


def test_block_comment_is_refused() -> None:
    assert style.check_text("/* note */\nconst a = 1;\n", "a.ts") == ["a.ts:1: comment not allowed"]


def test_jsdoc_block_is_allowed() -> None:
    assert style.check_text("/** Adds one. */\nexport const a = 1;\n", "a.ts") == []


def test_comment_markers_inside_strings_are_ignored() -> None:
    assert style.check_text('const url = "https://x.test"; const b = `//`;\n', "a.ts") == []


def test_second_map_call_is_refused_in_tsx() -> None:
    text = "a.map(f); b.map(g);"
    assert style.check_text(text, "a.tsx") == ["a.tsx: 2 .map calls, one is allowed per TSX file"]


def test_several_map_calls_are_allowed_in_ts() -> None:
    assert style.check_text("a.map(f); b.map(g);", "a.ts") == []


def test_lowercase_hyphenated_names_are_accepted() -> None:
    for name in (
        "card.tsx",
        "info-card.tsx",
        "use-retry.ts",
        "shared-lib.test.ts",
        "nexy-client.d.ts",
    ):
        assert style.name_failures(Path("src") / name) == []


def test_tool_config_files_at_the_root_are_accepted() -> None:
    assert style.name_failures(Path("vitest.config.ts")) == []


def test_route_segment_names_are_accepted() -> None:
    assert style.name_failures(Path("src/routes/[lang]/[slug].tsx")) == []


def test_other_name_styles_are_refused() -> None:
    for name in ("InfoCard.tsx", "info_card.tsx", "info.card.tsx", "useRetry.ts"):
        assert len(style.name_failures(Path("src") / name)) == 1, name


def test_a_hook_file_must_start_with_use() -> None:
    assert style.name_failures(Path("src/shared/hooks/retry.ts")) == [
        "src/shared/hooks/retry.ts: a file in a hooks folder must start with use-"
    ]


def test_the_project_source_follows_the_rules() -> None:
    assert style.run_checks(ROOT).failures == []
