from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Errors(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/errors.tsx',
        page_key='cfc6ab75cdbad02795080427bd5c7239',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/errors',
        dynamic=False,
    )


Errors.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
