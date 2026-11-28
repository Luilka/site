"""Renders the hero reel: captures each frame of `timeline.html` in Chrome, then adds the sound.

Run with:
uv run --with imageio-ffmpeg --with numpy --with pillow \
    python motion/hero-reel/render.py <output folder>
"""

import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import imageio_ffmpeg
from PIL import Image

HERE = Path(__file__).resolve().parent
FPS = 24
DURATION = 18
POSTER_TIME = 5.0


def capture(frame: int, folder: Path) -> None:
    target = folder / f"frame-{frame:03d}.png"
    url = f"file://{HERE / 'timeline.html'}?t={frame / FPS:.4f}"
    subprocess.run(
        [
            "google-chrome",
            "--headless",
            "--no-sandbox",
            "--disable-gpu",
            "--allow-file-access-from-files",
            "--virtual-time-budget=3000",
            "--window-size=1200,880",
            f"--screenshot={target}",
            url,
        ],
        check=True,
        capture_output=True,
    )


def main(out: Path) -> None:
    frames = out / "frames"
    frames.mkdir(parents=True, exist_ok=True)
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(lambda frame: capture(frame, frames), range(FPS * DURATION)))
    sound = out / "hero-sound.wav"
    subprocess.run([sys.executable, str(HERE / "sound.py"), str(sound)], check=True)
    video = out / "hero-reel.mp4"
    subprocess.run(
        [
            imageio_ffmpeg.get_ffmpeg_exe(),
            "-y",
            "-framerate",
            str(FPS),
            "-i",
            str(frames / "frame-%03d.png"),
            "-i",
            str(sound),
            "-c:v",
            "libx264",
            "-crf",
            "26",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-c:a",
            "aac",
            "-b:a",
            "96k",
            "-shortest",
            str(video),
        ],
        check=True,
        capture_output=True,
    )
    Image.open(frames / f"frame-{round(POSTER_TIME * FPS):03d}.png").convert("RGB").save(
        out / "hero-reel-poster.webp", quality=80
    )


if __name__ == "__main__":
    main(Path(sys.argv[1]))
