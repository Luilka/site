import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "src" / "content"
PUBLIC = ROOT / "public"
REGISTRY = json.loads((CONTENT / "images.json").read_text(encoding="utf-8"))
SLUGS = json.loads((CONTENT / "details.json").read_text(encoding="utf-8"))
VIEWBOX = re.compile(r'viewBox="0 0 (\d+) (\d+)"')


def entries() -> list[tuple[str, str, dict[str, object]]]:
    return [
        (kind, slug, image)
        for kind, items in REGISTRY.items()
        for slug, image in items.items()
    ]


def test_every_work_and_product_has_a_cover() -> None:
    for kind in ("work", "products"):
        assert sorted(REGISTRY[kind]) == sorted(SLUGS[kind])


def test_only_works_and_products_have_covers() -> None:
    assert sorted(REGISTRY) == ["products", "work"]


def test_each_cover_file_is_in_public() -> None:
    for _kind, _slug, image in entries():
        assert (PUBLIC / str(image["src"]).lstrip("/")).is_file()


def test_each_cover_declares_the_size_of_its_file() -> None:
    for _kind, _slug, image in entries():
        path = PUBLIC / str(image["src"]).lstrip("/")
        if path.suffix != ".svg":
            continue
        match = VIEWBOX.search(path.read_text(encoding="utf-8"))
        assert match is not None
        assert (int(match.group(1)), int(match.group(2))) == (image["width"], image["height"])


def test_each_cover_uses_a_modern_format() -> None:
    for _kind, _slug, image in entries():
        assert Path(str(image["src"])).suffix in {".svg", ".webp", ".avif"}
