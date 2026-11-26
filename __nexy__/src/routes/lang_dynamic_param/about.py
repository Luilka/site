from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def About(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/[lang]/about.tsx',
        page_key='6f262fb6cd3a682120f6d16a7693e8ed',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/[lang]/about',
        dynamic=True,
    )


About.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
