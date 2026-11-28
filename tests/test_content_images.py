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
        if kind != "gallery"
        for slug, image in items.items()
    ]


def test_every_work_and_product_has_a_cover() -> None:
    for kind in ("work", "products"):
        assert sorted(REGISTRY[kind]) == sorted(SLUGS[kind])


def test_only_works_products_and_the_about_page_have_pictures() -> None:
    assert sorted(REGISTRY) == ["about", "gallery", "products", "work"]


def test_the_about_page_names_its_five_pictures() -> None:
    assert sorted(REGISTRY["about"]) == ["detailA", "detailB", "hero", "mission", "studio"]


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


def gallery_images() -> list[dict[str, object]]:
    return [
        image
        for kind in REGISTRY["gallery"].values()
        for images in kind.values()
        for image in images
    ]


def test_every_work_and_product_has_a_gallery_of_at_least_three_pictures() -> None:
    for kind in ("work", "products"):
        assert sorted(REGISTRY["gallery"][kind]) == sorted(SLUGS[kind])
        assert all(len(images) >= 3 for images in REGISTRY["gallery"][kind].values())


def test_only_works_and_products_have_a_gallery() -> None:
    assert sorted(REGISTRY["gallery"]) == ["products", "work"]


def test_each_gallery_file_is_a_modern_picture_in_public() -> None:
    for image in gallery_images():
        path = PUBLIC / str(image["src"]).lstrip("/")
        assert path.is_file(), path
        assert path.suffix in {".svg", ".webp", ".avif"}
        assert isinstance(image["width"], int) and isinstance(image["height"], int)
