from src.shared.utils.content_files import CONTENT_DIR, read_json
from src.shared.utils.detail_slugs import DETAIL_KINDS, detail_slugs, is_known_detail
from src.shared.utils.languages import SUPPORTED_LANGUAGES, is_supported_language


def test_the_content_folder_holds_the_shared_json() -> None:
    assert (CONTENT_DIR / "details.json").is_file()
    assert (CONTENT_DIR / "navigation.json").is_file()


def test_read_json_returns_the_parsed_file() -> None:
    assert read_json("navigation.json")[0]["href"] == "/about"


def test_french_and_english_are_supported() -> None:
    assert SUPPORTED_LANGUAGES == {"fr", "en"}
    assert is_supported_language("fr") and is_supported_language("en")


def test_other_languages_and_missing_values_are_refused() -> None:
    assert not is_supported_language("de")
    assert not is_supported_language(None)


def test_every_detail_kind_has_slugs() -> None:
    assert set(detail_slugs()) == DETAIL_KINDS


def test_a_known_slug_is_accepted() -> None:
    assert is_known_detail("products", "tala")


def test_an_unknown_slug_or_kind_is_refused() -> None:
    assert not is_known_detail("products", "inconnu")
    assert not is_known_detail("unknown", "tala")
