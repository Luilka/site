from typing import Any
from nexy.modules.runtime.csr_document import render_document as __render_document


def Index(
    caller: Any = None,
    children: str = "",
    **kwargs: Any,
) -> str:
    return __render_document(
        page_file='/src/routes/[lang]/services/index.tsx',
        page_key='19cb6bc65bd219c006a4099d99462db5',
        layouts=['/src/routes/layout.tsx'],
        layout_keys=['23f3c8d11e703767ced9b06d6830dc70'],
        props=kwargs,
        static_stem='/src/routes/[lang]/services/index',
        dynamic=True,
    )


Index.__nexy_blocking__ = True  # waits on Node: rendered off the event loop
