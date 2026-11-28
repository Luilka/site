from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VIDEO = ROOT / "public" / "video"
MEGABYTE = 1024 * 1024


def test_both_languages_have_a_film_a_poster_and_a_light_file() -> None:
    for language in ("fr", "en"):
        film = VIDEO / f"film-{language}.mp4"
        assert film.stat().st_size < 8 * MEGABYTE
        assert (VIDEO / f"film-{language}-poster.webp").stat().st_size < MEGABYTE


def test_the_french_captions_are_a_webvtt_file_with_one_cue_per_spoken_line() -> None:
    text = (VIDEO / "film-fr.vtt").read_text(encoding="utf-8")
    assert text.startswith("WEBVTT")
    assert text.count("-->") == 6
