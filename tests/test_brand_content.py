from nexy.decorators import Container

from src.brand.content import BrandService


def test_brand_service_provides_the_tagline() -> None:
    service = Container.resolve(BrandService)
    assert service.tagline() == "Design maîtrisé. Produits clairs. Impact mesurable."


def test_brand_service_provides_the_navigation_order() -> None:
    service = Container.resolve(BrandService)
    assert service.navigation() == (
        ("About", "/about"),
        ("Services", "/services"),
        ("Products", "/products"),
        ("Works", "/works"),
        ("Blog", "/blog"),
        ("Job", "/job"),
    )
