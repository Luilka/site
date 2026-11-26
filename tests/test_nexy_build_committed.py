import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
GIT = shutil.which("git") or "git"


def is_versioned(path: str) -> bool:
    result = subprocess.run(
        [GIT, "ls-files", "--error-unmatch", path], cwd=ROOT, capture_output=True, check=False
    )
    return result.returncode == 0


def test_the_production_marker_of_the_nexy_build_is_versioned() -> None:
    assert is_versioned("__nexy__/nexy.prod")


def test_the_machine_local_build_files_are_not_versioned() -> None:
    assert not is_versioned("__nexy__/build-cache.json")
    assert not is_versioned("__nexy__/server.port")
