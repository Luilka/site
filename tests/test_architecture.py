from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMPONENTS = SRC / "components"
SHARED = SRC / "shared"


def test_shared_folders_are_separated_by_intention() -> None:
    for folder in ("ui", "hooks", "utils", "i18n", "types"):
        assert (SHARED / folder).is_dir(), folder


def test_component_folders_are_separated_by_intention() -> None:
    for folder in ("layout", "cards", "patterns", "sections"):
        assert (COMPONENTS / folder).is_dir(), folder


def test_templates_became_sections() -> None:
    assert not (COMPONENTS / "templates").exists()
    assert not (COMPONENTS / "ui").exists()


def test_atoms_use_short_lowercase_file_names() -> None:
    expected = (
        "badge.ui.tsx",
        "button.ui.tsx",
        "card.ui.tsx",
        "container.ui.tsx",
        "input.ui.tsx",
        "link.ui.tsx",
        "icon-tile.ui.tsx",
        "motion-box.ui.tsx",
    )
    for name in expected:
        assert (SHARED / "ui" / name).is_file(), name


def test_layout_patterns_and_cards_use_complete_component_names() -> None:
    expected = {
        "layout": (
            "header.layout.tsx",
            "footer.layout.tsx",
            "brand-mark.layout.tsx",
            "language-toggle.layout.tsx",
            "newsletter-form.layout.tsx",
        ),
        "patterns": (
            "contact-panel.pattern.tsx",
            "page-hero.pattern.tsx",
            "page-frame.pattern.tsx",
            "process-band.pattern.tsx",
        ),
        "cards": (
            "product.card.tsx",
            "service.card.tsx",
            "work.card.tsx",
            "step.card.tsx",
            "info.card.tsx",
        ),
    }
    for folder, names in expected.items():
        for name in names:
            assert (COMPONENTS / folder / name).is_file(), name


def test_home_sections_are_named_after_their_intention() -> None:
    expected = ("hero", "about", "process", "services", "products", "works", "info")
    for name in expected:
        assert (COMPONENTS / "sections" / "(home)" / f"{name}.section.tsx").is_file(), name


def test_no_component_imports_from_a_removed_folder() -> None:
    sources = list(SRC.rglob("*.ts")) + list(SRC.rglob("*.tsx"))
    removed = ("@/components/ui/", "@/components/templates/", '"@/i18n', '"@/lib/', '"@/types"')
    offenders = [
        str(path.relative_to(ROOT))
        for path in sources
        if any(name in path.read_text(encoding="utf-8") for name in removed)
    ]
    assert offenders == []


def test_client_links_go_through_one_nexy_adapter() -> None:
    sources = [path for path in SRC.rglob("*.tsx") if path.name != "link.ui.tsx"]
    offenders = [
        str(path.relative_to(ROOT))
        for path in sources
        if "@nexy/client" in path.read_text(encoding="utf-8")
    ]
    assert offenders == []
    adapter = (SHARED / "ui" / "link.ui.tsx").read_text(encoding="utf-8")
    assert 'from "@nexy/client"' in adapter


def test_landing_page_composes_the_home_sections() -> None:
    landing = (SRC / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
    for name in ("HomeStory", "HomeOffer", "HomeProof"):
        assert name in landing, name


def test_home_sections_compose_the_page_sections() -> None:
    home = COMPONENTS / "sections" / "(home)"
    text = "".join(path.read_text(encoding="utf-8") for path in home.glob("home-*.section.tsx"))
    for name in (
        "HeroSection",
        "ProcessSection",
        "ServicesSection",
        "ProductsSection",
        "WorksSection",
    ):
        assert name in text, name


def test_python_shared_code_lives_beside_the_typescript_utils() -> None:
    for name in ("content_files.py", "languages.py", "detail_slugs.py"):
        assert (SHARED / "utils" / name).is_file(), name
    assert (SHARED / "__init__.py").is_file()


def test_tsx_files_hold_one_component_each() -> None:
    offenders = [
        str(path.relative_to(ROOT))
        for path in COMPONENTS.rglob("*.tsx")
        if path.read_text(encoding="utf-8").count("export default function") != 1
    ]
    assert offenders == []
