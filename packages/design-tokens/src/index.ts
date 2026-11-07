export const themes = {
  amber: {
    name: 'Obsidian Amber',
    canvas: '#101419',
    surface: '#1B232D',
    elevated: '#303C49',
    accent: '#F0A34A',
    text: '#F5F1E8',
    muted: '#B9C3CE',
    onAccent: '#101419',
  },
  blue: {
    name: 'Midnight Blue',
    canvas: '#0B1423',
    surface: '#16273E',
    elevated: '#28496A',
    accent: '#5E9BFF',
    text: '#E6F0FF',
    muted: '#B6C9DE',
    onAccent: '#0B1423',
  },
  teal: {
    name: 'Carbon Teal',
    canvas: '#0C1718',
    surface: '#182A2A',
    elevated: '#27504B',
    accent: '#44D2B1',
    text: '#E4FAF5',
    muted: '#ACCCC5',
    onAccent: '#0C1718',
  },
  light: {
    name: 'Arctic Light',
    canvas: '#F7F8FA',
    surface: '#E9EDF2',
    elevated: '#CDD6E0',
    accent: '#A75A15',
    text: '#202B38',
    muted: '#465569',
    onAccent: '#FFFFFF',
  },
} as const;
export type ThemeId = keyof typeof themes;
export type Theme = (typeof themes)[ThemeId];
/** Preview-only policy. Product connection events intentionally have no playback path. */
export class FeedbackPreviewGate {
  private last = -Infinity;
  private generation = 0;
  begin(origin: string, muted: boolean, volume: number, now: number) {
    if (
      origin !== 'demonstration' ||
      muted ||
      !Number.isFinite(volume) ||
      volume <= 0 ||
      volume > 1 ||
      now - this.last < 1000
    )
      return null;
    this.last = now;
    return ++this.generation;
  }
  cancel() {
    this.generation++;
  }
  current(token: number) {
    return token === this.generation;
  }
}

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radii = { control: 10, card: 18, panel: 24 } as const;
export const motion = { quick: 120, panel: 180, reduced: 0 } as const;
export type MotionMode = 'performance' | 'balanced' | 'enhanced';
export function motionDuration(mode: MotionMode, reduced: boolean) {
  return reduced || mode === 'performance' ? 0 : mode === 'balanced' ? 160 : 220;
}
export const typography = {
  baseline: { label: 'A · Baseline', detail: 'Space Grotesk / Manrope' },
  plex: { label: 'B · Precision', detail: 'IBM Plex Sans' },
  editorial: { label: 'C · Editorial', detail: 'Fraunces / Source Sans 3' },
} as const;
export type TypographyId = keyof typeof typography;
export const identity = {
  name: 'Relay Link',
  service: 'relay-link',
  protocol: 'relay-link-v1',
  protocolVersion: 1,
  storageNamespace: 'relay-link',
  proposedPort: 8934,
  portValidated: false,
} as const;
export const settings = [
  {
    id: 'appearance',
    title: 'Appearance',
    description: 'Theme and visual preferences for this application.',
    keywords: 'theme color contrast',
  },
  {
    id: 'motion',
    title: 'Motion and accessibility',
    description: 'Purposeful transitions. System Reduced Motion always takes priority.',
    keywords: 'accessibility animation performance',
  },
  {
    id: 'feedback',
    title: 'Sound and haptics',
    description: 'Demonstration previews only. No connection has occurred.',
    keywords: 'sound audio volume haptic vibration chime demonstration',
  },
  {
    id: 'privacy',
    title: 'Privacy and access',
    description: 'PC control is unavailable in this preview.',
    keywords: 'security permissions input',
  },
  {
    id: 'about',
    title: 'About Relay Link',
    description: 'Phase 0 · Desktop and Mobile foundations.',
    keywords: 'version help setup',
  },
] as const;
