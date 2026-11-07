import type { TypographyId } from '@relay-link/design-tokens';

export async function loadTypography(id: TypographyId) {
  if (id === 'plex') {
    await Promise.all([
      import('@fontsource/ibm-plex-sans/latin-400.css'),
      import('@fontsource/ibm-plex-sans/latin-600.css'),
    ]);
  } else if (id === 'editorial') {
    await Promise.all([
      import('@fontsource/fraunces/latin-600.css'),
      import('@fontsource/source-sans-3/latin-400.css'),
      import('@fontsource/source-sans-3/latin-600.css'),
    ]);
  }
  const families =
    id === 'plex'
      ? ['IBM Plex Sans']
      : id === 'editorial'
        ? ['Fraunces', 'Source Sans 3']
        : ['Manrope', 'Space Grotesk'];
  for (const family of families) {
    const loaded = await document.fonts.load(
      `${family === 'Fraunces' ? 600 : 400} 16px "${family}"`,
    );
    if (!loaded.length && id !== 'baseline') throw new Error(`Font unavailable: ${family}`);
  }
}
