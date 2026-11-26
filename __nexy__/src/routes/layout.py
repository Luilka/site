from typing import *
from fastapi import *
import json as __json
from pathlib import Path as __Path
from nexy import Template as __Template
from jinja2 import Template as __JinjaTemplate
NexyElement = Union[callable, __JinjaTemplate]
from nexy.vite import Vite as __Vite
def __nexy_shell(children: str) -> str:
    if children.lstrip()[:15].lower().startswith(('<!doctype', '<html')):
        return children
    return (
        '<!DOCTYPE html><html lang="en"><head>'
        '<meta charset="utf-8">'
        '<meta name="viewport" content="width=device-width, initial-scale=1">'
        "<script>document.documentElement.classList.toggle('dark',localStorage.getItem('nexy-theme')==='dark'||(!('nexy-theme' in localStorage)&&matchMedia('(prefers-color-scheme: dark)').matches))</script>"
        + __Vite()
        + '</head><body>'
        + children
        + '</body></html>'
    )

def Layout(caller: Any = None, children: str = '', **kwargs: Any) -> str:
    if caller is not None and callable(caller):
        Slot = caller
    else:
        Slot = lambda: children if children else ''
    __is_prod = __Path('__nexy__/nexy.prod').is_file()
    __mount_id = 'nexy-' + __import__('hashlib').md5((__Path('__nexy__/src/routes/layout.py').as_posix() + '|default|1').encode()).hexdigest()[:10]
    # SSR static HTML: populated by SSG build, empty in dev
    __ssr = ''
    __ext = '.tsx'
    if __is_prod:
        __ssg_file = __Path('__nexy__/client/static/src/routes/layout.Default.html')
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
    rendered = str(__Template().render('__nexy__/src/routes/layout.html', context))
    return __nexy_shell(rendered)
