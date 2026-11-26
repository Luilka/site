import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMPONENTS = SRC / "components"
SHARED = SRC / "shared"


def test_shared_folders_are_separated_by_intention() -> None:
    for folder in ("ui", "hooks", "utils", "i18n", "types"):
        assert (SHARED / folder).is_dir(), folder


def test_component_families_are_one_plural_file_each() -> None:
    for family in ("layout", "cards", "patterns", "sections"):
        assert (COMPONENTS / f"{family}.tsx").is_file(), family
        assert not (COMPONENTS / family).exists(), family


def test_templates_became_sections() -> None:
    assert not (COMPONENTS / "templates").exists()
    assert not (COMPONENTS / "ui").exists()


def test_atoms_use_plural_file_names() -> None:
    expected = (
        "badges.tsx",
        "buttons.tsx",
        "cards.tsx",
        "containers.tsx",
        "inputs.tsx",
        "links.tsx",
        "icon-tiles.tsx",
        "motion-boxes.tsx",
    )
    for name in expected:
        assert (SHARED / "ui" / name).is_file(), name


def test_each_family_declares_its_components() -> None:
    expected = {
        "layout": ("Header", "Footer", "BrandMark", "NewsletterForm"),
        "patterns": ("ContactPanel", "PageHero", "PageFrame", "ProcessBand"),
        "cards": ("ProductCard", "ServiceCard", "WorkCard", "StepCard"),
        "sections": (
            "AboutSection",
            "ProcessSection",
            "ServicesSection",
            "ProductsSection",
            "WorksSection",
        ),
    }
    for family, names in expected.items():
        text = (COMPONENTS / f"{family}.tsx").read_text(encoding="utf-8")
        for name in names:
            assert f"export function {name}(" in text, name


def test_client_links_go_through_one_nexy_adapter() -> None:
    sources = [path for path in SRC.rglob("*.tsx") if path.name != "links.tsx"]
    offenders = [
        str(path.relative_to(ROOT))
        for path in sources
        if "@nexy/client" in path.read_text(encoding="utf-8")
    ]
    assert offenders == []
    adapter = (SHARED / "ui" / "links.tsx").read_text(encoding="utf-8")
    assert 'from "@nexy/client"' in adapter


def test_landing_page_composes_the_home_sections() -> None:
    landing = (SRC / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
    for name in ("HomeStory", "HomeOffer", "HomeProof"):
        assert name in landing, name


def test_home_sections_compose_the_page_sections() -> None:
    text = (SRC / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
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


def test_component_files_use_named_exports() -> None:
    files = list(COMPONENTS.rglob("*.tsx")) + list((SHARED / "ui").glob("*.tsx"))
    offenders = [
        str(path.relative_to(ROOT))
        for path in files
        if "export default" in path.read_text(encoding="utf-8")
    ]
    assert offenders == []


def test_every_type_lives_in_shared_types() -> None:
    offenders = [
        str(path.relative_to(ROOT))
        for path in SRC.rglob("*.ts*")
        if "types" not in path.parts and not path.name.endswith(".d.ts")
        if re.search(r"^(export )?(type|interface) \w+ ", path.read_text(encoding="utf-8"), re.M)
        and "export type {" not in path.read_text(encoding="utf-8")
    ]
    assert offenders == []
