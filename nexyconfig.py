from nexy.core.models import NexyConfigModel
from nexy.frontend import react


class NexyConfig(NexyConfigModel):
    useFF = react()
    useCSR = True
    useTitle = "luilka | "
    useAliases = {"@": "src"}
    useVite = True
    useDocs = False
    useDevTools = False  # the toolbar of `nexy dev` on every page; False removes it
