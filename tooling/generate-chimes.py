"""Original review-only PCM synthesis; no third-party samples. Reproducible assets."""
from pathlib import Path
import math
import struct
import wave

destination = Path(__file__).resolve().parents[1] / 'packages/design-tokens/assets'
destination.mkdir(parents=True, exist_ok=True)
for name, frequencies in [('chime-a', (523.25, 783.99)), ('chime-b', (440.0, 659.25))]:
    values = []
    for index in range(28665):
        time = index / 44100
        sample = 0.0
        for start, frequency in zip((0, 0.16), frequencies):
            age = time - start
            if 0 <= age < 0.45:
                envelope = min(age / 0.018, 1) * math.exp(-age * 10) * min((0.45 - age) / 0.06, 1)
                sample += 0.15 * envelope * math.sin(2 * math.pi * frequency * age)
        values.append(struct.pack('<h', round(sample * 32767)))
    with wave.open(str(destination / f'{name}.wav'), 'wb') as output:
        output.setparams((1, 2, 44100, 0, 'NONE', 'not compressed'))
        output.writeframes(b''.join(values))
