from typing import *
from fastapi import *
import json as __json
from pathlib import Path as __Path
from nexy import Template as __Template
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]

def Images(caller: Any = None, children: str = '', **kwargs: Any) -> str:
    if caller is not None and callable(caller):
        Slot = caller
    else:
        Slot = lambda: children if children else ''
    __is_prod = __Path('__nexy__/nexy.prod').is_file()
    __mount_id = 'nexy-' + __import__('hashlib').md5((__Path('__nexy__/src/shared/ui/images.py').as_posix() + '|Image|1').encode()).hexdigest()[:10]
    # SSR static HTML: populated by SSG build, empty in dev
    __ssr = ''
    __ext = '.tsx'
    if __is_prod:
        __ssg_file = __Path('__nexy__/client/static/src/shared/ui/images.Image.html')
        try:
            __ssr = __ssg_file.read_text(encoding='utf-8')
        except OSError:
            __ssr = ''
    context = {
        '__nexy_mount_id': __mount_id,
        '__nexy_ssr_content': __ssr,
        '__nexy_is_prod': __is_prod,
        '__nexy_props': __json.dumps(kwargs),
        'Slot': Slot,
        'children': children,
    }
    context.update(kwargs)
    rendered = str(__Template().render('__nexy__/src/shared/ui/images.html', context))
    return rendered
