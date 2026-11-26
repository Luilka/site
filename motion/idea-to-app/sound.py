"""Sound design of "De l'idée à l'app": a few cues, real silences, a room tone and a voice.

The timeline exports its cues (`window.CUES`) as JSON, so picture and sound cannot drift apart.
The voice comes from Veyla (`veyla say`, 48 kHz, 24 bit) and the bed is ducked under it.
Run with: uv run --with numpy python motion/idea-to-app/sound.py cues.json out.wav [voice_dir]
"""

import json
import sys
import wave
from collections.abc import Callable
from pathlib import Path

import numpy as np

RATE = 48000
DURATION = 32.0
TIME = np.arange(int(RATE * DURATION)) / RATE
RNG = np.random.default_rng(32)


def local(start: float) -> np.ndarray:
    return np.clip(TIME - start, 0, None)


def tone(start: float, freq: float, decay: float, gain: float) -> np.ndarray:
    """A struck bar: slightly detuned, with inharmonic partials that die faster than the base."""
    freq *= 1 + RNG.normal(0, 0.002)
    age = local(start)
    gate = (1 - np.exp(-age / 0.003)) * (TIME >= start)
    body = np.sin(2 * np.pi * freq * age)
    upper = 0.32 * np.sin(2 * np.pi * freq * 2.76 * age) * np.exp(-age / (decay * 0.35))
    top = 0.12 * np.sin(2 * np.pi * freq * 5.4 * age) * np.exp(-age / (decay * 0.15))
    return gain * RNG.uniform(0.88, 1.12) * gate * (body + upper + top) * np.exp(-age / decay)


def noise_burst(count: int, bright: float) -> np.ndarray:
    spectrum = np.fft.rfft(RNG.standard_normal(count))
    pitch = np.fft.rfftfreq(count, 1 / RATE)
    return np.fft.irfft(spectrum / (1 + (pitch / bright) ** 2), count)


def tick(start: float, gain: float, length: float = 0.02, bright: float = 4000.0) -> np.ndarray:
    count = int(length * RATE)
    shaped = noise_burst(count, bright) * np.exp(-np.linspace(0, 6, count))
    out = np.zeros_like(TIME)
    begin = int(start * RATE)
    out[begin : begin + count] = gain * shaped / (np.max(np.abs(shaped)) + 1e-9)
    return out


def air(start: float, length: float, gain: float, low: float, high: float) -> np.ndarray:
    count = int(length * RATE)
    spectrum = np.fft.rfft(RNG.standard_normal(count))
    pitch = np.fft.rfftfreq(count, 1 / RATE)
    spectrum *= ((pitch > low) & (pitch < high)) / (1 + pitch / 2000)
    shaped = np.fft.irfft(spectrum, count) * np.sin(np.pi * np.linspace(0, 1, count)) ** 2
    out = np.zeros_like(TIME)
    begin = int(start * RATE)
    end = min(begin + count, len(out))
    out[begin:end] = gain * shaped[: end - begin] / (np.max(np.abs(shaped)) + 1e-9)
    return out


def glide(start: float, low: float, high: float, length: float, gain: float) -> np.ndarray:
    age = local(start)
    progress = np.clip(age / length, 0, 1)
    phase = 2 * np.pi * np.cumsum(low + (high - low) * progress**2) / RATE * (TIME >= start)
    return gain * np.sin(np.pi * progress) ** 2 * (age <= length) * np.sin(phase)


def pop(start: float, freq: float, gain: float) -> np.ndarray:
    age = local(start)
    bend = freq * (0.7 + 0.3 * (1 - np.exp(-age / 0.03)))
    return gain * (TIME >= start) * np.sin(2 * np.pi * np.cumsum(bend) / RATE) * np.exp(-age / 0.09)


def bells(start: float, freqs: tuple[float, ...], gain: float) -> np.ndarray:
    return sum(tone(start + i * 0.09, f, 2.0, gain) for i, f in enumerate(freqs))


def room() -> np.ndarray:
    """A quiet room tone, so the mix never falls to digital silence."""
    spectrum = np.fft.rfft(RNG.standard_normal(len(TIME)))
    pitch = np.fft.rfftfreq(len(TIME), 1 / RATE)
    shaped = np.fft.irfft(spectrum / (1 + (pitch / 300) ** 2), len(TIME))
    return 0.05 * shaped / np.max(np.abs(shaped)) * (0.8 + 0.2 * np.sin(TIME * 0.7))


def pad() -> np.ndarray:
    drift = 0.7 + 0.3 * np.sin(2 * np.pi * TIME / DURATION - np.pi / 2) ** 2
    roots = (73.42, 110.0, 146.83, 293.66)
    body = sum(np.sin(2 * np.pi * (f + d) * TIME) for f in roots for d in (-0.3, 0.3))
    return 0.012 * drift * body


def cue(kind: str, start: float, n: int) -> np.ndarray:
    table: dict[str, Callable[[], np.ndarray]] = {
        "swish": lambda: air(start, 0.9, 0.05, 300, 2600),
        "pop": lambda: pop(start, 520, 0.2) + bells(start + 0.6, (1568.0, 2093.0), 0.02),
        "paper": lambda: air(start, 0.5, 0.04, 1800, 7000) + tick(start + 0.35, 0.05, 0.03),
        "bubble": lambda: pop(start, 988, 0.12),
        "thump": lambda: tone(start, (110.0, 164.8)[n], 0.5, 0.22) + tick(start, 0.05),
        "draw": lambda: glide(start, 300, 900, 1.2, 0.035),
        "snap": lambda: tick(start, 0.1, 0.02, 2500) + tone(start, 660, 0.06, 0.05),
        "press": lambda: tick(start, 0.15, 0.012, 6000) + tone(start, 1800, 0.02, 0.04),
        "release": lambda: tick(start, 0.07, 0.01, 5000),
        "success": lambda: tone(start, 784.0, 0.8, 0.15) + tone(start + 0.1, 1174.7, 0.9, 0.13),
        "land": lambda: tone(start, 140.0 + 14 * n, 0.14, 0.16) + tick(start, 0.07, 0.015, 3000),
        "toggle": lambda: tick(start, 0.1, 0.012, 3000) + tone(start, 220.0, 0.04, 0.08),
        "final": lambda: bells(start, (587.33, 739.99, 880.0, 1318.5), 0.1),
    }
    return table[kind]()


def read_voice(path: Path) -> np.ndarray:
    with wave.open(str(path)) as file:
        width, raw = file.getsampwidth(), file.readframes(file.getnframes())
    if width != 3:
        raise ValueError("the voice must be a 24 bit WAV")
    parts = np.frombuffer(raw, dtype=np.uint8).reshape(-1, 3).astype(np.int32)
    value = parts[:, 0] | (parts[:, 1] << 8) | (parts[:, 2] << 16)
    return np.where(value >= 1 << 23, value - (1 << 24), value) / 8388608.0


def voice_track(cues: list[dict[str, float]], folder: Path) -> np.ndarray:
    track = np.zeros_like(TIME)
    for item in cues:
        if item["kind"] == "voice":
            clip = read_voice(folder / f"fr_{int(item['n'])}.wav")
            begin = int(float(item["t"]) * RATE)
            track[begin : begin + len(clip)] += clip[: len(track) - begin]
    return track


def duck(voice: np.ndarray) -> np.ndarray:
    """Lowers the bed by up to 60 percent while someone speaks."""
    window = int(0.12 * RATE)
    level = np.convolve(np.abs(voice), np.ones(window) / window, mode="same")
    return 1 - 0.6 * np.clip(level / 0.12, 0, 1)


def master() -> np.ndarray:
    fade_in = np.clip(TIME / 1.2, 0, 1)
    fade_out = np.clip((DURATION - TIME) / 1.2, 0, 1)
    return np.sin(fade_in * np.pi / 2) * np.sin(fade_out * np.pi / 2)


def mix(cues: list[dict[str, float]], folder: Path | None) -> np.ndarray:
    bed = pad() + room()
    for item in cues:
        if item["kind"] != "voice":
            bed = bed + cue(str(item["kind"]), float(item["t"]), int(item["n"]))
    voice = voice_track(cues, folder) if folder else np.zeros_like(TIME)
    bed = bed * master() * duck(voice)
    bed = bed * ((0.3 if folder else 0.7) / np.max(np.abs(bed)))
    track = bed + voice * 0.85
    return track * min(1.0, 0.95 / np.max(np.abs(track)))


def write(path: str, track: np.ndarray) -> None:
    with wave.open(path, "wb") as file:
        file.setnchannels(1)
        file.setsampwidth(2)
        file.setframerate(RATE)
        file.writeframes((track * 32767).astype("<i2").tobytes())


if __name__ == "__main__":
    with open(sys.argv[1], encoding="utf-8") as source:
        data = json.load(source)
    write(sys.argv[2], mix(data, Path(sys.argv[3]) if len(sys.argv) > 3 else None))
