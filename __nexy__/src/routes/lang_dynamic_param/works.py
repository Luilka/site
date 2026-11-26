from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Works(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/[lang]/works.tsx',
        page_key='ef354c93e85dfdc898516eb24d2d6cc2',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/[lang]/works',
        dynamic=True,
    )


Works.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
