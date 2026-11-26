from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Notfound(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/notfound.tsx',
        page_key='3aad67fa072a40db61d2cd7c93303b56',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/notfound',
        dynamic=False,
    )


Notfound.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
