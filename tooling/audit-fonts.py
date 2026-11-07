"""Audit the actual bundled font files. Run with the isolated fonttools PYTHONPATH."""
from pathlib import Path
import hashlib
import json
import shutil
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1]
destination = root / 'docs/legal/fonts/v2.5'
destination.mkdir(parents=True, exist_ok=True)
groups = {
    'baseline': [('manrope', '400Regular/Manrope_400Regular.ttf'), ('space-grotesk', '500Medium/SpaceGrotesk_500Medium.ttf')],
    'plex': [('ibm-plex-sans', '400Regular/IBMPlexSans_400Regular.ttf'), ('ibm-plex-sans', '600SemiBold/IBMPlexSans_600SemiBold.ttf')],
    'editorial': [('source-sans-3', '400Regular/SourceSans3_400Regular.ttf'), ('fraunces', '600SemiBold/Fraunces_600SemiBold.ttf')],
}
samples = {'latin': 'Relay Link Il1 O0 0123456789 éüñ', 'greek': 'Ελληνικά', 'cyrillic': 'Русский', 'arabic': 'العربية', 'devanagari': 'हिन्दी', 'cjk': '中文日本語', 'symbols': '✓⌄→↗·%'}
output = {}
for system, entries in groups.items():
    results = []
    for family, relative in entries:
        directory = root / 'apps/mobile/node_modules/@expo-google-fonts' / family
        path = directory / relative
        font = TTFont(path)
        cmap = font.getBestCmap()
        license_paths = list(directory.glob('*LICENSE*')) + list(directory.glob('*OFL*'))
        assert license_paths, f'Missing font license: {family}'
        for license_path in license_paths:
            shutil.copyfile(license_path, destination / f'{family}-{license_path.name}')
        results.append({'family': family, 'file': relative, 'bytes': path.stat().st_size, 'sha256': hashlib.sha256(path.read_bytes()).hexdigest(), 'glyphCount': len(cmap), 'missingCharacters': {name: ''.join(dict.fromkeys(c for c in text if ord(c) not in cmap)) for name, text in samples.items()}, 'licenseFiles': [p.name for p in license_paths]})
    output[system] = {'nativeLoadedAssetBytes': sum(r['bytes'] for r in results), 'fonts': results}
target = root / 'docs/testing/evidence/v2.5/font-audit.json'
target.parent.mkdir(parents=True, exist_ok=True)
target.write_text(json.dumps(output, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('PASS: actual font glyphs, asset sizes, hashes and supplied license files recorded.')
