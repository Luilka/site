import json
from pathlib import Path
from urllib.parse import urlparse

SOURCE = Path(__file__).resolve().parents[1] / "src" / "content" / "social.json"
HOSTS = {
    "linkedin": {"linkedin.com", "www.linkedin.com"},
    "tiktok": {"tiktok.com", "www.tiktok.com"},
    "youtube": {"youtube.com", "www.youtube.com", "youtu.be"},
}


def addresses() -> dict[str, str]:
    data: dict[str, str] = json.loads(SOURCE.read_text(encoding="utf-8"))
    return data


def test_social_content_names_the_three_networks() -> None:
    assert sorted(addresses()) == ["linkedin", "tiktok", "youtube"]


def test_a_filled_address_is_a_secure_link_to_its_own_network() -> None:
    for network, address in addresses().items():
        if not address:
            continue
        parsed = urlparse(address)
        assert parsed.scheme == "https"
        assert parsed.hostname in HOSTS[network]
