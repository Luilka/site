"""Checks the images of public/: modern formats only and a size budget per file."""

import sys
from pathlib import Path

PUBLIC = Path("public")
MODERN = {".svg": 50_000, ".webp": 200_000, ".avif": 200_000, ".ico": 50_000}
RASTER_FORBIDDEN = {".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"}


def image_files(folder: Path) -> list[Path]:
    known = set(MODERN) | RASTER_FORBIDDEN
    return sorted(path for path in folder.rglob("*") if path.suffix.lower() in known)


def file_failures(path: Path) -> list[str]:
    suffix = path.suffix.lower()
    if suffix in RASTER_FORBIDDEN:
        return [f"{path}: use webp or avif instead of {suffix}"]
    size = path.stat().st_size
    limit = MODERN[suffix]
    return [f"{path}: {size} bytes, over the {limit} bytes budget"] if size > limit else []


def run_checks(root: Path) -> list[str]:
    folder = root / PUBLIC
    files = image_files(folder) if folder.is_dir() else []
    return [failure for path in files for failure in file_failures(path)]


def main() -> int:
    root = Path(__file__).resolve().parent.parent
    failures = run_checks(root)
    print(f"images checked: {len(image_files(root / PUBLIC))}")
    for failure in failures:
        print(f"- {failure}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
