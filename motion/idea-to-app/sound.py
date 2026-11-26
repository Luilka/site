"""Sound design of "De l'idée à l'app": one cue per gesture, placed from the timeline's own events.

The timeline exports its cues (`window.CUES`) as JSON, so picture and sound cannot drift apart.
Every sound is synthesized: a soft pad, felt taps, small bells, one breath per headline.
Run with: uv run --with numpy python motion/idea-to-app/sound.py cues.json out.wav
"""

import json
import sys
import wave
from collections.abc import Callable

import numpy as np

RATE = 44100
DURATION = 32.0
TIME = np.arange(int(RATE * DURATION)) / RATE
RNG = np.random.default_rng(32)
SCALE = (523.25, 587.33, 659.25, 783.99, 880.0)


def local(start: float) -> np.ndarray:
    return np.clip(TIME - start, 0, None)


def tone(
    start: float, freq: float, decay: float, gain: float, harmonics: float = 0.3
) -> np.ndarray:
    age = local(start)
    gate = (1 - np.exp(-age / 0.003)) * (TIME >= start)
    wave_ = np.sin(2 * np.pi * freq * age) + harmonics * np.sin(4 * np.pi * freq * age) * 0.5
    return gain * gate * wave_ * np.exp(-age / decay)


def tick(start: float, gain: float, length: float = 0.02, bright: float = 4000.0) -> np.ndarray:
    count = int(length * RATE)
    noise = RNG.standard_normal(count) * np.exp(-np.linspace(0, 6, count))
    spectrum = np.fft.rfft(noise)
    pitch = np.fft.rfftfreq(count, 1 / RATE)
    spectrum *= 1 / (1 + (pitch / bright) ** 2)
    shaped = np.fft.irfft(spectrum, count)
    out = np.zeros_like(TIME)
    begin = int(start * RATE)
    out[begin : begin + count] = gain * shaped / (np.max(np.abs(shaped)) + 1e-9)
    return out


def air(start: float, length: float, gain: float, low: float, high: float) -> np.ndarray:
    count = int(length * RATE)
    spectrum = np.fft.rfft(RNG.standard_normal(count))
    pitch = np.fft.rfftfreq(count, 1 / RATE)
    spectrum *= ((pitch > low) & (pitch < high)) / (1 + pitch / 2000)
    swell = np.sin(np.pi * np.linspace(0, 1, count)) ** 2
    shaped = np.fft.irfft(spectrum, count) * swell
    out = np.zeros_like(TIME)
    begin = int(start * RATE)
    end = min(begin + count, len(out))
    out[begin:end] = gain * shaped[: end - begin] / (np.max(np.abs(shaped)) + 1e-9)
    return out


def glide(start: float, f0: float, f1: float, length: float, gain: float) -> np.ndarray:
    age = local(start)
    progress = np.clip(age / length, 0, 1)
    freq = f0 + (f1 - f0) * progress**2
    phase = 2 * np.pi * np.cumsum(freq) / RATE * (TIME >= start)
    envelope = np.sin(np.pi * progress) ** 2 * (TIME >= start) * (age <= length)
    return gain * envelope * np.sin(phase)


def pop(start: float, freq: float, gain: float) -> np.ndarray:
    age = local(start)
    bend = freq * (0.7 + 0.3 * (1 - np.exp(-age / 0.03)))
    return gain * (TIME >= start) * np.sin(2 * np.pi * np.cumsum(bend) / RATE) * np.exp(-age / 0.09)


def bells(start: float, freqs: tuple[float, ...], gain: float) -> np.ndarray:
    return sum(tone(start + i * 0.08, f, 1.8, gain, 0.6) for i, f in enumerate(freqs))


def pad() -> np.ndarray:
    drift = 0.7 + 0.3 * np.sin(2 * np.pi * TIME / DURATION - np.pi / 2) ** 2
    roots = (73.42, 110.0, 146.83, 293.66)
    body = sum(np.sin(2 * np.pi * (f + d) * TIME) for f in roots for d in (-0.3, 0.3))
    return 0.014 * drift * body


def cue(kind: str, start: float, n: int) -> np.ndarray:
    table: dict[str, Callable[[], np.ndarray]] = {
        "swish": lambda: air(start, 0.9, 0.05, 300, 2600),
        "breath": lambda: air(start, 0.4, 0.018, 1500, 6000),
        "pop": lambda: pop(start, 520, 0.22),
        "ripple": lambda: bells(start, (1568.0, 2093.0, 2637.0), 0.025),
        "blip": lambda: tone(start, (880.0, 1175.0, 1397.0)[n], 0.08, 0.09),
        "person": lambda: tone(start, SCALE[n % 5], 0.35, 0.12) + tick(start, 0.03),
        "bubble": lambda: pop(start, 988, 0.14),
        "swatch": lambda: (
            tone(start, (196.0, 261.6, 329.6, 392.0)[n], 0.5, 0.2) + tick(start, 0.05)
        ),
        "type": lambda: tone(start, 1174.7, 0.6, 0.08),
        "ruler": lambda: sum(tick(start + i * 0.05, 0.03, 0.01, 6000) for i in range(12)),
        "draw": lambda: glide(start, 300, 900, 1.2, 0.04),
        "snap": lambda: tick(start, 0.1, 0.02, 2500) + tone(start, 600 + 120 * n, 0.06, 0.06),
        "cursor": lambda: air(start, 0.85, 0.02, 600, 3000),
        "press": lambda: tick(start, 0.16, 0.012, 6000) + tone(start, 1800, 0.02, 0.05),
        "release": lambda: tick(start, 0.08, 0.01, 5000),
        "success": lambda: tone(start, 784.0, 0.8, 0.16) + tone(start + 0.1, 1174.7, 0.9, 0.14),
        "feedback": lambda: tone(start, 659.3, 0.4, 0.08),
        "toggle": lambda: tick(start, 0.1, 0.012, 3000) + tone(start, 220.0, 0.04, 0.1),
        "land": lambda: tone(start, 140.0 + 12 * n, 0.12, 0.16) + tick(start, 0.07, 0.015, 3000),
        "final": lambda: bells(start, (587.33, 739.99, 880.0, 1318.5), 0.1),
    }
    return table[kind]()


def master() -> np.ndarray:
    fade_in = np.clip(TIME / 1.2, 0, 1)
    fade_out = np.clip((DURATION - TIME) / 1.2, 0, 1)
    return np.sin(fade_in * np.pi / 2) * np.sin(fade_out * np.pi / 2)


def mix(cues: list[dict[str, float]]) -> np.ndarray:
    track = pad()
    for item in cues:
        track = track + cue(str(item["kind"]), float(item["t"]), int(item["n"]))
    track = track * master()
    return track * (0.7 / np.max(np.abs(track)))


def write(path: str, track: np.ndarray) -> None:
    with wave.open(path, "wb") as file:
        file.setnchannels(1)
        file.setsampwidth(2)
        file.setframerate(RATE)
        file.writeframes((track * 32767).astype("<i2").tobytes())


if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as source:
        write(sys.argv[2], mix(json.load(source)))
