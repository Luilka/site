from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
COMPONENTS = SRC / "components"


def test_design_system_folders_are_separated_by_intention() -> None:
    for folder in ("ui", "patterns", "templates"):
        assert (COMPONENTS / folder).is_dir(), folder


def test_atoms_use_short_lowercase_file_names() -> None:
    expected = (
        "badge.tsx",
        "button.tsx",
        "card.tsx",
        "container.tsx",
        "input.tsx",
        "link.tsx",
    )
    for name in expected:
        assert (COMPONENTS / "ui" / name).is_file(), name


def test_macros_and_templates_use_complete_component_names() -> None:
    expected_patterns = (
        "site-header.tsx",
        "site-footer.tsx",
        "brand-mark.tsx",
        "language-toggle.tsx",
        "nav-dropdown.tsx",
        "contact-panel.tsx",
        "newsletter-form.tsx",
    )
    expected_templates = (
        "hero-section.tsx",
        "about-section.tsx",
        "process-section.tsx",
        "services-section.tsx",
        "products-section.tsx",
        "works-section.tsx",
        "info-section.tsx",
    )
    for name in expected_patterns:
        assert (COMPONENTS / "patterns" / name).is_file(), name
    for name in expected_templates:
        assert (COMPONENTS / "templates" / name).is_file(), name


def test_client_links_go_through_one_nexy_adapter() -> None:
    sources = [path for path in SRC.rglob("*.tsx") if path.name != "link.tsx"]
    offenders = [
        str(path.relative_to(ROOT))
        for path in sources
        if "@nexy/client" in path.read_text(encoding="utf-8")
    ]
    assert offenders == []
    adapter = (COMPONENTS / "ui" / "link.tsx").read_text(encoding="utf-8")
    assert 'from "@nexy/client"' in adapter


def test_landing_page_composes_section_templates() -> None:
    landing = (SRC / "routes" / "[lang]" / "index.tsx").read_text(encoding="utf-8")
    for name in (
        "HeroSection",
        "AboutSection",
        "ProcessSection",
        "ServicesSection",
        "ProductsSection",
        "WorksSection",
    ):
        assert name in landing, name
