/* eslint-disable @typescript-eslint/no-require-imports -- Metro requires static asset references for bundled fonts/audio. */
import * as Font from 'expo-font';
import type { TypographyId } from '@relay-link/design-tokens';

const sources = {
  baseline: {
    Manrope_400Regular: require('@expo-google-fonts/manrope/400Regular/Manrope_400Regular.ttf'),
    SpaceGrotesk_500Medium: require('@expo-google-fonts/space-grotesk/500Medium/SpaceGrotesk_500Medium.ttf'),
  },
  plex: {
    IBMPlexSans_400Regular: require('@expo-google-fonts/ibm-plex-sans/400Regular/IBMPlexSans_400Regular.ttf'),
    IBMPlexSans_600SemiBold: require('@expo-google-fonts/ibm-plex-sans/600SemiBold/IBMPlexSans_600SemiBold.ttf'),
  },
  editorial: {
    SourceSans3_400Regular: require('@expo-google-fonts/source-sans-3/400Regular/SourceSans3_400Regular.ttf'),
    Fraunces_600SemiBold: require('@expo-google-fonts/fraunces/600SemiBold/Fraunces_600SemiBold.ttf'),
  },
};
export const fontFamilies = {
  baseline: ['Manrope_400Regular', 'SpaceGrotesk_500Medium'],
  plex: ['IBMPlexSans_400Regular', 'IBMPlexSans_600SemiBold'],
  editorial: ['SourceSans3_400Regular', 'Fraunces_600SemiBold'],
} as const;
export async function loadTypography(id: TypographyId) {
  await Font.loadAsync(sources[id]);
  if (fontFamilies[id].some((name) => !Font.isLoaded(name)))
    throw new Error('Font load incomplete');
}
