from fastapi import Request
from nexy import notFound

from src.shared.utils.detail_slugs import DETAIL_KINDS, is_known_detail
from src.shared.utils.languages import is_supported_language


def validate_language(request: Request) -> None:
    language = request.path_params.get("lang")
    if not is_supported_language(language):
        notFound(f"Unknown language: {language}")


def validate_detail_slug(request: Request) -> None:
    segments = [segment for segment in request.url.path.split("/") if segment]
    if len(segments) != 3 or segments[1] not in DETAIL_KINDS:
        return
    kind, slug = segments[1], segments[2]
    if not is_known_detail(kind, slug):
        notFound(f"Unknown {kind} slug: {slug}")


dependencies = [validate_language, validate_detail_slug]
