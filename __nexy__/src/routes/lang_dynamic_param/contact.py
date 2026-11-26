from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Contact(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/[lang]/contact.tsx',
        page_key='c62cdc46bc856b470c0e9f6952c2b124',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/[lang]/contact',
        dynamic=True,
    )


Contact.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
