import json
from pathlib import Path
from typing import Any

CONTENT_DIR = Path(__file__).resolve().parents[2] / "content"


def read_json(name: str) -> Any:
    """Reads a JSON file of src/content, the data the server shares with the client."""
    return json.loads((CONTENT_DIR / name).read_text(encoding="utf-8"))
