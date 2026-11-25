from functools import cache

from src.shared.utils.content_files import read_json

DETAIL_KINDS = frozenset({"blog", "work", "products", "services"})


@cache
def detail_slugs() -> dict[str, list[str]]:
    """Loads the slugs of every detail page, read once from src/content/details.json."""
    slugs: dict[str, list[str]] = read_json("details.json")
    return slugs


def is_known_detail(kind: str, slug: str) -> bool:
    """Tells whether a detail page exists for this kind and slug."""
    return slug in detail_slugs().get(kind, [])
