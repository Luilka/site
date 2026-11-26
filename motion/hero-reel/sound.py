"""Sound design of the hero reel: a soft pad, one bell per step and a breath before each landing.

Every cue is placed from the same times as `timeline.html`, so picture and sound stay in step.
Run with: uv run --with numpy python motion/hero-reel/sound.py hero-sound.wav
"""

import sys
import wave

import numpy as np

SAMPLE_RATE = 44100
DURATION = 8.0
FIRST_STEP = 0.6
STEP_LENGTH = 1.7
BELLS = (587.33, 739.99, 880.0, 1174.66)
PAD = (73.42, 110.0, 146.83)

TIME = np.arange(int(SAMPLE_RATE * DURATION)) / SAMPLE_RATE
RNG = np.random.default_rng(24)


def step_start(index: int) -> float:
    return FIRST_STEP + index * STEP_LENGTH


def bell(frequency: float, start: float, gain: float) -> np.ndarray:
    local = np.clip(TIME - start, 0, None)
    attack = (1 - np.exp(-local / 0.004)) * (TIME >= start)
    body = np.sin(2 * np.pi * frequency * local) * np.exp(-local / 1.6)
    over = 0.35 * np.sin(4 * np.pi * frequency * local) * np.exp(-local / 0.6)
    air = 0.12 * np.sin(6.02 * np.pi * frequency * local) * np.exp(-local / 0.3)
    return gain * attack * (body + over + air)


def thud(start: float, gain: float) -> np.ndarray:
    local = np.clip(TIME - start, 0, None)
    return gain * (TIME >= start) * np.sin(2 * np.pi * 70 * local) * np.exp(-local / 0.09)


def breath(start: float, length: float, gain: float) -> np.ndarray:
    count = int(length * SAMPLE_RATE)
    spectrum = np.fft.rfft(RNG.standard_normal(count))
    pitch = np.fft.rfftfreq(count, 1 / SAMPLE_RATE)
    spectrum *= ((pitch > 500) & (pitch < 3200)) / (1 + pitch / 1500)
    swell = np.sin(np.pi * np.linspace(0, 1, count)) ** 2
    shaped = np.fft.irfft(spectrum, count) * swell
    out = np.zeros_like(TIME)
    begin = int(start * SAMPLE_RATE)
    out[begin : begin + count] = gain * shaped / np.max(np.abs(shaped))
    return out


def pad() -> np.ndarray:
    swell = 0.6 + 0.4 * np.sin(2 * np.pi * TIME / DURATION - np.pi / 2) ** 2
    tone = sum(np.sin(2 * np.pi * (f + d) * TIME) for f in PAD for d in (-0.3, 0.3))
    return 0.018 * swell * tone


def master() -> np.ndarray:
    fade_in = np.clip(TIME / 0.6, 0, 1)
    fade_out = np.clip((DURATION - TIME) / 1.0, 0, 1)
    return np.sin(fade_in * np.pi / 2) * np.sin(fade_out * np.pi / 2)


def mix() -> np.ndarray:
    track = pad()
    for index, frequency in enumerate(BELLS):
        start = step_start(index)
        track += bell(frequency, start + 0.12, 0.16)
        track += thud(start + 0.5, 0.2)
        track += breath(start - 0.45, 0.8, 0.05)
    track += bell(739.99, step_start(3) + 0.2, 0.07) + bell(880.0, step_start(3) + 0.28, 0.06)
    track *= master()
    return track * (0.7 / np.max(np.abs(track)))


def write(path: str, track: np.ndarray) -> None:
    with wave.open(path, "wb") as file:
        file.setnchannels(1)
        file.setsampwidth(2)
        file.setframerate(SAMPLE_RATE)
        file.writeframes((track * 32767).astype("<i2").tobytes())


if __name__ == "__main__":
    write(sys.argv[1], mix())
