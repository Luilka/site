import json
from pathlib import Path

from fastapi.testclient import TestClient
from nexy.app import app

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"

DETAIL_PATHS = (
    "/fr/blog/livrer-par-etapes",
    "/fr/work/yano",
    "/fr/products/tala",
    "/fr/services/ux-design",
    "/en/blog/livrer-par-etapes",
    "/en/work/yano",
    "/en/products/tala",
    "/en/services/ux-design",
)

UNKNOWN_DETAIL_PATHS = (
    "/fr/blog/inconnu",
    "/fr/work/inconnu",
    "/fr/products/inconnu",
    "/fr/services/inconnu",
)


def test_unknown_unprefixed_path_answers_with_a_real_404() -> None:
    response = TestClient(app).get("/about")
    assert response.status_code == 404
    assert "__nexy_page" in response.text


def test_known_detail_paths_answer_with_200() -> None:
    client = TestClient(app)
    for path in DETAIL_PATHS:
        assert client.get(path).status_code == 200, path


def test_unknown_detail_slugs_answer_with_a_real_404() -> None:
    client = TestClient(app)
    for path in UNKNOWN_DETAIL_PATHS:
        response = client.get(path)
        assert response.status_code == 404, path
        assert "__nexy_page" in response.text, path


def test_detail_routes_use_nexy_folder_names() -> None:
    for kind in ("blog", "work", "products", "services"):
        assert (SRC / "routes" / "[lang]" / kind / "[slug].tsx").is_file(), kind


def test_types_folder_holds_the_dynamic_models() -> None:
    types = SRC / "shared" / "types"
    assert (types / "index.ts").is_file()
    assert (types / "site.type.ts").is_file()
    assert (types / "detail.type.ts").is_file()
    detail = (types / "detail.type.ts").read_text(encoding="utf-8")
    assert "DetailModel" in detail
    assert "DetailRouteProps" in detail


def test_server_validation_uses_the_shared_slug_source() -> None:
    source = (SRC / "routes" / "[lang]" / "dependencies.py").read_text(encoding="utf-8")
    shared = (SRC / "shared" / "utils" / "detail_slugs.py").read_text(encoding="utf-8")
    assert "src.shared.utils.detail_slugs" in source
    assert "details.json" in shared
    assert "notFound" in source


def test_shared_slug_source_has_all_four_collections() -> None:
    slugs = json.loads((SRC / "content" / "details.json").read_text(encoding="utf-8"))
    assert set(slugs) == {"blog", "work", "products", "services"}
    assert len(slugs["blog"]) == 3
    assert len(slugs["work"]) == 4
    assert len(slugs["products"]) == 3
    assert len(slugs["services"]) == 4


def test_typescript_configs_include_the_requested_glob() -> None:
    for name in ("tsconfig.json", "tsconfig.client.json"):
        config = json.loads((ROOT / name).read_text(encoding="utf-8"))
        assert "**/*.*.{ts,tsx}" in config["include"], name
    vitest = (ROOT / "vitest.config.ts").read_text(encoding="utf-8")
    assert '"tests/client/**/*.test.{ts,tsx}"' in vitest
