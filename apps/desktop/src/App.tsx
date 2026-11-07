import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { CircleHelp, Command, Layers, Settings, ShieldCheck, Smartphone } from 'lucide-react';
import {
  themes,
  typography,
  motionDuration,
  type ThemeId,
  type TypographyId,
  type MotionMode,
} from '@relay-link/design-tokens';
import { loadTypography } from './features/settings/typography';
import { LinkMark } from './components/LinkMark';
import { CommandCenter } from './features/command-center/CommandCenter';
import { SettingsView } from './features/settings/SettingsView';
import { verifyNativeBoundary, type BoundaryResult } from './ipc/foundation';
import type { Page, Navigate } from './navigation';

export function App() {
  const [page, setPage] = useState<Page>('Command Center');
  const [theme, setTheme] = useState<ThemeId>('amber');
  const [query, setQuery] = useState(location.hash.split('/')[1] || 'appearance');
  const [reduced, setReduced] = useState(false);
  const [osReduced, setOsReduced] = useState(
    matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [mode, setMode] = useState<MotionMode>('balanced');
  const [font, setFont] = useState<TypographyId>('baseline');
  const [fontStatus, setFontStatus] = useState('A · Baseline active');
  const fontRequest = useRef(0);
  const scrollPositions = useRef<Record<string, number>>({});
  const previewFont = async (id: TypographyId) => {
    const token = ++fontRequest.current;
    const start = performance.now();
    setFontStatus('Loading font preview…');
    try {
      await loadTypography(id);
      if (token !== fontRequest.current) return;
      setFont(id);
      setFontStatus(
        `${typography[id].label} ready · ${Math.round(performance.now() - start)} ms load · session only`,
      );
    } catch {
      if (token === fontRequest.current)
        setFontStatus('Font preview unavailable; previous system retained');
    }
  };
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const changed = () => setOsReduced(media.matches);
    media.addEventListener('change', changed);
    if (location.hash.startsWith('#settings/')) setPage('Settings');
    const anchor = () => {
      if (location.hash.startsWith('#settings/')) {
        setPage('Settings');
        setQuery(location.hash.split('/')[1] || 'appearance');
      }
    };
    window.addEventListener('hashchange', anchor);
    return () => {
      media.removeEventListener('change', changed);
      window.removeEventListener('hashchange', anchor);
    };
  }, []);
  const [boundary, setBoundary] = useState<BoundaryResult>('checking');
  useEffect(() => {
    void verifyNativeBoundary().then(setBoundary);
  }, []);
  const navigate: Navigate = (next, search) => {
    scrollPositions.current[page] = window.scrollY;
    setPage(next);
    if (search) setQuery(search);
    else if (next === 'Appearance') setQuery('appearance');
    history.replaceState(null, '', next === 'Settings' ? `#settings/${search || query}` : '#');
    requestAnimationFrame(() =>
      window.scrollTo({ top: scrollPositions.current[next] || 0, behavior: 'instant' }),
    );
  };
  const palette = themes[theme];
  const vars = Object.fromEntries(
    Object.entries(palette)
      .filter(([key]) => key !== 'name')
      .map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;
  return (
    <div
      className={`shell ${reduced || osReduced || mode === 'performance' ? 'reduced' : ''}`}
      style={
        {
          ...vars,
          '--duration': `${motionDuration(mode, reduced || osReduced)}ms`,
        } as CSSProperties
      }
      data-theme={theme}
      data-typography={font}
      data-motion={mode}
    >
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={() => navigate('Command Center')}
          aria-label="Relay Link home"
        >
          <LinkMark small />
          <span>
            Relay <b>Link</b>
          </span>
        </a>
        <p className="rail-label">RELAY LINK</p>
        <nav aria-label="Main navigation">
          {(
            [
              ['Command Center', Command],
              ['Devices', Smartphone],
              ['Appearance', Layers],
              ['Settings', Settings],
            ] as const
          ).map(([label, Icon]) => (
            <button
              className={page === label ? 'nav active' : 'nav'}
              aria-current={page === label ? 'page' : undefined}
              key={label}
              onClick={() => navigate(label)}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <ShieldCheck size={18} />
          <b>Remote access off</b>
          <p>No devices authorized.</p>
        </div>
        <button className="help" onClick={() => navigate('Settings', 'about')}>
          <CircleHelp size={16} />
          Help & information
        </button>
        <div className="version">
          PREVIEW <span>0.1</span>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <span>This PC</span>
          <span className="pill">
            <i />
            No active sessions
          </span>
        </header>
        <div className="content">
          {font !== 'baseline' && (
            <div className="preview-banner">
              <span>{typography[font].label} · Typography demonstration</span>
              <button onClick={() => void previewFont('baseline')}>End preview</button>
            </div>
          )}
          <div className="page-heading">
            <div>
              <h1>{page}</h1>
              <p className="intro">
                {page === 'Command Center'
                  ? 'This PC'
                  : page === 'Devices'
                    ? 'Pairing and device access are not enabled.'
                    : 'Preferences for this device'}
              </p>
            </div>
            <span className="edition">PREVIEW</span>
          </div>
          {page === 'Command Center' && <CommandCenter onNavigate={navigate} />}
          {page === 'Devices' && (
            <section className="device-panel">
              <div className="section-header">
                <h2>Paired devices</h2>
                <span className="count">0</span>
              </div>
              <div className="empty-row">
                <Smartphone size={22} />
                <div>
                  <b>No paired devices</b>
                  <p>Pairing is unavailable in this preview. Remote access remains off.</p>
                </div>
              </div>
              <div className="panel-actions">
                <button className="secondary" disabled>
                  Pair device · Unavailable
                </button>
              </div>
            </section>
          )}
          {(page === 'Appearance' || page === 'Settings') && (
            <SettingsView
              searchable={page === 'Settings'}
              query={query}
              setQuery={setQuery}
              theme={theme}
              setTheme={setTheme}
              reduced={reduced}
              setReduced={setReduced}
              mode={mode}
              setMode={setMode}
              font={font}
              previewFont={(id) => void previewFont(id)}
              fontStatus={fontStatus}
            />
          )}
          <footer>
            <span>Relay Link · Preview</span>
            <details className="app-diagnostics">
              <summary>Application information</summary>
              <span data-testid="boundary-status" data-result={boundary}>
                {boundary === 'verified'
                  ? 'Local access checks passed'
                  : boundary === 'browser'
                    ? 'Design preview'
                    : boundary === 'failed'
                      ? 'Local access check failed'
                      : 'Checking local access…'}
              </span>
            </details>
          </footer>
        </div>
      </main>
    </div>
  );
}
