from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Slug_catch_all(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/[lang]/products/[slug].tsx',
        page_key='ce5a9f861b450acd5ed47a1ff02f6c73',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/[lang]/products/[slug]',
        dynamic=True,
    )


Slug_catch_all.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
