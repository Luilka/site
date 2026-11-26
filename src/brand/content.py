from typing import Protocol

from nexy.decorators import Injectable

from src.shared.utils.content_files import read_json


class BrandContent(Protocol):
    def tagline(self) -> str: ...

    def navigation(self) -> tuple[tuple[str, str], ...]: ...


@Injectable()
class BrandService:
    def tagline(self) -> str:
        return "Design maîtrisé. Produits clairs. Impact mesurable."

    def navigation(self) -> tuple[tuple[str, str], ...]:
        items: list[dict[str, str]] = read_json("navigation.json")
        return tuple((item["label"], item["href"]) for item in items)
