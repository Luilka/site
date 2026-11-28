import re
from pathlib import Path

LAYOUT = (Path(__file__).resolve().parents[1] / "src" / "components" / "layout.tsx").read_text(
    encoding="utf-8"
)


def test_header_swaps_the_navigation_and_the_menu_at_the_same_width() -> None:
    hidden_below = set(re.findall(r"max-\[(\d+)px\]:hidden", LAYOUT))
    hidden_from = set(re.findall(r"min-\[(\d+)px\]:hidden", LAYOUT))
    assert hidden_below == hidden_from
    assert len(hidden_below) == 1


def test_header_keeps_the_navigation_for_widths_where_the_french_labels_fit() -> None:
    (width,) = re.findall(r"max-\[(\d+)px\]:hidden", LAYOUT)
    assert int(width) >= 1140


def test_footer_columns_may_shrink_so_the_page_never_scrolls_sideways() -> None:
    assert "max-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" in LAYOUT


def test_footer_brand_and_newsletter_take_the_full_width_on_small_screens() -> None:
    assert LAYOUT.count("max-[1000px]:col-span-2") == 2


def test_contact_label_gives_way_to_its_icon_before_the_header_overflows() -> None:
    (width,) = re.findall(r"max-\[(\d+)px\]:sr-only", LAYOUT)
    assert int(width) >= 440
