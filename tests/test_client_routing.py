from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ROUTES = ROOT / "src" / "routes"
PAGE_NAMES = ("about", "blog", "contact", "job", "products", "services", "works")


def test_configuration_enables_client_routing() -> None:
    config = (ROOT / "nexyconfig.py").read_text(encoding="utf-8")
    assert "useCSR = True" in config


def test_home_route_is_a_react_file() -> None:
    assert (ROUTES / "[lang]" / "index.tsx").is_file()


def test_root_layout_is_a_react_file() -> None:
    assert (ROUTES / "layout.tsx").is_file()


def test_every_page_has_a_react_route() -> None:
    for name in PAGE_NAMES:
        assert (ROUTES / "[lang]" / f"{name}.tsx").is_file(), name


def test_root_url_has_a_client_route() -> None:
    assert (ROUTES / "index.tsx").is_file()
    assert not (ROUTES / "index.py").exists()
    for name in PAGE_NAMES:
        assert not (ROUTES / f"{name}.tsx").exists(), name
