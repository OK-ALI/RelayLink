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
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const radii = { control: 10, card: 18, panel: 24 } as const;
export const motion = { quick: 120, panel: 180, reduced: 0 } as const;
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
    description: 'Explore the four candidate themes.',
    keywords: 'theme color contrast',
  },
  {
    id: 'motion',
    title: 'Motion',
    description: 'Reduce transitions and visual movement.',
    keywords: 'accessibility animation performance',
  },
  {
    id: 'privacy',
    title: 'Privacy and access',
    description: 'PC control remains disabled in this foundation.',
    keywords: 'security permissions input',
  },
  {
    id: 'about',
    title: 'About Relay Link',
    description: 'Phase 0 · Desktop and Mobile foundations.',
    keywords: 'version help setup',
  },
] as const;
