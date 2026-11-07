import { settings } from '@relay-link/design-tokens';

/** Local settings navigation only. Never parses a pairing token or grants authority. */
export function redirectSystemPath({ path }: { path: string; initial: boolean }) {
  try {
    const url = new URL(path, 'relay-link://local');
    if (url.protocol !== 'relay-link:') return path;
    const section =
      url.hostname === 'settings'
        ? url.pathname.slice(1)
        : url.pathname.startsWith('/settings/')
          ? url.pathname.split('/')[2]
          : undefined;
    return section && settings.some((s) => s.id === section) ? `/?section=${section}` : '/';
  } catch {
    return '/';
  }
}
