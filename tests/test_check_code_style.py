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
    text = "function A() { a.map(f); b.map(g); }"
    assert style.check_text(text, "a.tsx") == [
        "a.tsx: 2 .map calls in one component, one is allowed"
    ]


def test_one_map_call_per_component_is_allowed_in_one_tsx_file() -> None:
    text = "function A() { a.map(f); }\nfunction B() { b.map(g); }"
    assert style.check_text(text, "a.tsx") == []


def test_several_map_calls_are_allowed_in_ts() -> None:
    assert style.check_text("a.map(f); b.map(g);", "a.ts") == []


def test_ts_names_follow_the_folder_they_live_in() -> None:
    accepted = (
        "src/shared/hooks/use-retry.hook.ts",
        "src/shared/utils/validate-email.util.ts",
        "src/shared/i18n/dictionaries.i18n.ts",
        "src/shared/types/detail.type.ts",
        "src/content/detail-models.content.ts",
    )
    for name in accepted:
        assert style.name_failures(Path(name)) == [], name


def test_tsx_files_have_plain_plural_names() -> None:
    for name in ("src/components/cards.tsx", "src/shared/ui/buttons.tsx", "src/routes/layout.tsx"):
        assert style.name_failures(Path(name)) == [], name


def test_a_ts_name_without_its_folder_suffix_is_refused() -> None:
    failures = style.name_failures(Path("src/shared/utils/validate-email.ts"))
    assert failures == ["src/shared/utils/validate-email.ts: file name must be <name>.util.ts(x)"]


def test_barrels_and_declarations_are_accepted() -> None:
    assert style.name_failures(Path("src/shared/i18n/index.ts")) == []
    assert style.name_failures(Path("src/shared/types/nexy-client.d.ts")) == []


def test_routes_and_tests_keep_plain_names() -> None:
    for name in (
        "src/routes/layout.tsx",
        "src/routes/[lang]/[slug].tsx",
        "tests/client/shared-lib.test.ts",
    ):
        assert style.name_failures(Path(name)) == [], name


def test_other_name_styles_are_refused() -> None:
    for name in ("src/routes/InfoCard.tsx", "src/routes/info_card.tsx", "src/routes/useRetry.ts"):
        assert len(style.name_failures(Path(name))) == 1, name


def test_tool_config_files_at_the_root_are_accepted() -> None:
    assert style.name_failures(Path("vitest.config.ts")) == []


def test_a_hook_file_must_start_with_use() -> None:
    assert style.name_failures(Path("src/shared/hooks/retry.hook.ts")) == [
        "src/shared/hooks/retry.hook.ts: a file in a hooks folder must start with use-"
    ]


def test_the_project_source_follows_the_rules() -> None:
    assert style.run_checks(ROOT).failures == []
