from fastapi.testclient import TestClient
from nexy.app import app


def test_unknown_path_answers_with_a_real_404() -> None:
    response = TestClient(app).get("/fr/une-page-inexistante")
    assert response.status_code == 404
    assert "__nexy_page" in response.text


def test_unknown_english_path_answers_with_a_real_404() -> None:
    response = TestClient(app).get("/en/missing-page")
    assert response.status_code == 404
