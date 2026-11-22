import json
from pathlib import Path

from nexy.decorators import Container

from src.brand.content import BrandService

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"


def navigation_source() -> list[dict[str, str]]:
    source = SRC / "content" / "navigation.json"
    items: list[dict[str, str]] = json.loads(source.read_text(encoding="utf-8"))
    return items


def test_navigation_labels_have_no_punctuation() -> None:
    assert all("!" not in item["label"] for item in navigation_source())


def test_navigation_names_its_dropdowns_explicitly() -> None:
    menus = {item["label"]: item.get("menu") for item in navigation_source()}
    assert menus["Services"] == "services"
    assert menus["Products"] == "products"


def test_python_navigation_reads_the_shared_source() -> None:
    service = Container.resolve(BrandService)
    expected = tuple((item["label"], item["href"]) for item in navigation_source())
    assert service.navigation() == expected


def test_typescript_navigation_reads_the_shared_source() -> None:
    source = (SRC / "i18n" / "dictionaries.ts").read_text(encoding="utf-8")
    assert 'from "@/content/navigation.json"' in source
    assert "Services !" not in source


def test_header_selects_dropdowns_from_menu_data() -> None:
    source = (SRC / "components" / "patterns" / "site-header.tsx").read_text(encoding="utf-8")
    assert "item.menu" in source
    assert 'includes("!")' not in source
