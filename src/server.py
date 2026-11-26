"""Entry point for hosts that run Luilka as a FastAPI app, such as Vercel."""

import os
import shutil
import sys
import tempfile
from importlib import import_module
from pathlib import Path

PROJECT_ITEMS = (
    "src",
    "__nexy__",
    "public",
    "nexyconfig.py",
    "pyproject.toml",
    "vite.config.ts",
)


def copy_item(source: Path, target: Path) -> None:
    """Copy a file or a folder as new, writable files, whatever the source permissions."""
    if source.is_file():
        shutil.copyfile(source, target)
        return
    target.mkdir(parents=True, exist_ok=True)
    for child in sorted(source.iterdir()):
        if child.name != "__pycache__":
            copy_item(child, target / child.name)


def copy_project(root: Path, target: Path) -> None:
    """Copy what Nexy needs at runtime, so it can rewrite its build folder."""
    for name in PROJECT_ITEMS:
        if (root / name).exists():
            copy_item(root / name, target / name)


def writable_root(root: Path) -> Path:
    """Return the project folder, or a writable copy when the host mounts it read-only."""
    if os.access(root, os.W_OK):
        return root
    target = Path(tempfile.mkdtemp(prefix="luilka-"))
    copy_project(root, target)
    return target


def enter(root: Path) -> None:
    """Make a relocated copy the working folder and the first import location."""
    os.chdir(root)
    sys.path.insert(0, str(root))


ROOT = Path(__file__).resolve().parents[1]
RUNTIME_ROOT = writable_root(ROOT)
if RUNTIME_ROOT != ROOT:
    enter(RUNTIME_ROOT)

app = import_module("nexy.app").app
