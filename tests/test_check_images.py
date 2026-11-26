import importlib.util
import json
from pathlib import Path
from types import ModuleType

ROOT = Path(__file__).resolve().parents[1]


def load_script() -> ModuleType:
    path = ROOT / "scripts" / "check_images.py"
    spec = importlib.util.spec_from_file_location("check_images", path)
    assert spec is not None and spec.loader is not None
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


images = load_script()


def write(root: Path, name: str, size: int) -> None:
    folder = root / "public"
    folder.mkdir(exist_ok=True)
    (folder / name).write_bytes(b"x" * size)


def test_the_project_images_follow_the_rules() -> None:
    assert images.run_checks(ROOT) == []


def test_a_missing_public_folder_has_nothing_to_check(tmp_path: Path) -> None:
    assert images.run_checks(tmp_path) == []


def test_modern_images_under_budget_pass(tmp_path: Path) -> None:
    write(tmp_path, "case.webp", 150_000)
    write(tmp_path, "logo.svg", 1_000)
    assert images.run_checks(tmp_path) == []


def test_png_and_jpeg_are_refused(tmp_path: Path) -> None:
    write(tmp_path, "case.png", 10)
    write(tmp_path, "photo.JPG", 10)
    assert len(images.run_checks(tmp_path)) == 2


def test_an_image_over_budget_is_refused(tmp_path: Path) -> None:
    write(tmp_path, "case.avif", 200_001)
    assert "over the 200000 bytes budget" in images.run_checks(tmp_path)[0]


def test_vercel_config_caches_hashed_assets_for_a_year() -> None:
    config = json.loads((ROOT / "vercel.json").read_text(encoding="utf-8"))
    assets = next(rule for rule in config["headers"] if rule["source"] == "/assets/(.*)")
    assert "max-age=31536000, immutable" in assets["headers"][0]["value"]
