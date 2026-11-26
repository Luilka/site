import os
from pathlib import Path

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.server import app, copy_project, writable_root


def make_project(root: Path) -> None:
    (root / "__nexy__" / "src").mkdir(parents=True)
    (root / "__nexy__" / "src" / "actions.ts").write_text("x", encoding="utf-8")
    (root / "src").mkdir()
    (root / "nexyconfig.py").write_text("y", encoding="utf-8")
    (root / "vite.config.ts").write_text("z", encoding="utf-8")


def test_server_entry_exposes_a_fastapi_app() -> None:
    assert isinstance(app, FastAPI)


def test_server_entry_serves_the_french_home() -> None:
    assert TestClient(app).get("/fr").status_code == 200


def test_writable_root_keeps_a_writable_project(tmp_path: Path) -> None:
    assert writable_root(tmp_path) == tmp_path


def test_writable_root_copies_a_read_only_project(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    make_project(tmp_path)
    monkeypatch.setattr(os, "access", lambda *_args: False)
    copy = writable_root(tmp_path)
    assert copy != tmp_path
    assert (copy / "__nexy__" / "src" / "actions.ts").read_text(encoding="utf-8") == "x"


def test_copy_project_skips_missing_items(tmp_path: Path) -> None:
    make_project(tmp_path)
    target = tmp_path / "out"
    target.mkdir()
    copy_project(tmp_path, target)
    assert sorted(path.name for path in target.iterdir()) == [
        "__nexy__",
        "nexyconfig.py",
        "src",
        "vite.config.ts",
    ]


def test_relocated_copy_keeps_the_vite_config_that_links_the_client(
    tmp_path: Path, monkeypatch: pytest.MonkeyPatch
) -> None:
    make_project(tmp_path)
    monkeypatch.setattr(os, "access", lambda *_args: False)
    assert (writable_root(tmp_path) / "vite.config.ts").is_file()
