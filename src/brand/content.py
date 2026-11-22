import json
from pathlib import Path
from typing import Protocol

from nexy.decorators import Injectable

NAVIGATION_FILE = Path(__file__).resolve().parents[1] / "content" / "navigation.json"


class BrandContent(Protocol):
    def tagline(self) -> str: ...

    def navigation(self) -> tuple[tuple[str, str], ...]: ...


@Injectable()
class BrandService:
    def tagline(self) -> str:
        return "Design maîtrisé. Ingénierie d'échelle."

    def navigation(self) -> tuple[tuple[str, str], ...]:
        items: list[dict[str, str]] = json.loads(NAVIGATION_FILE.read_text(encoding="utf-8"))
        return tuple((item["label"], item["href"]) for item in items)
