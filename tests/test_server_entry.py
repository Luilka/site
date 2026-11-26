from fastapi import FastAPI
from fastapi.testclient import TestClient

from src.server import app


def test_server_entry_exposes_a_fastapi_app() -> None:
    assert isinstance(app, FastAPI)


def test_server_entry_serves_the_french_home() -> None:
    assert TestClient(app).get("/fr").status_code == 200
