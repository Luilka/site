SUPPORTED_LANGUAGES = frozenset({"fr", "en"})


def is_supported_language(value: object) -> bool:
    """Tells whether the value is a language the site is written in."""
    return value in SUPPORTED_LANGUAGES
