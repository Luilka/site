import json
from pathlib import Path

from fastapi import Request
from nexy import notFound

DETAILS_FILE = Path(__file__).resolve().parents[2] / "content" / "details.json"
SUPPORTED_LANGUAGES = frozenset({"fr", "en"})
DETAIL_KINDS = frozenset({"blog", "work", "products", "services"})
DETAILS: dict[str, list[str]] = json.loads(DETAILS_FILE.read_text(encoding="utf-8"))


def validate_language(request: Request) -> None:
    print("espoir")
    language = request.path_params.get("lang")
    if language not in SUPPORTED_LANGUAGES:
        notFound(f"Unknown language: {language}")


def validate_detail_slug(request: Request) -> None:
    segments = [segment for segment in request.url.path.split("/") if segment]
    if len(segments) != 3 or segments[1] not in DETAIL_KINDS:
        return
    kind, slug = segments[1], segments[2]
    if slug not in DETAILS.get(kind, []):
        notFound(f"Unknown {kind} slug: {slug}")


dependencies = [validate_language, validate_detail_slug]
