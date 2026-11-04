import { useEffect, useState, type CSSProperties } from 'react';
import { CircleHelp, Command, Layers, Settings, ShieldCheck, Smartphone } from 'lucide-react';
import { themes, type ThemeId } from '@relay-link/design-tokens';
import { LinkMark } from './components/LinkMark';
import { CommandCenter } from './features/command-center/CommandCenter';
import { SettingsView } from './features/settings/SettingsView';
import { verifyNativeBoundary, type BoundaryResult } from './ipc/foundation';
import type { Page, Navigate } from './navigation';

export function App() {
  const [page, setPage] = useState<Page>('Command Center');
  const [theme, setTheme] = useState<ThemeId>('amber');
  const [query, setQuery] = useState('');
  const [reduced, setReduced] = useState(false);
  const [boundary, setBoundary] = useState<BoundaryResult>('checking');
  useEffect(() => {
    void verifyNativeBoundary().then(setBoundary);
  }, []);
  const navigate: Navigate = (next, search = '') => {
    setPage(next);
    setQuery(search);
  };
  const palette = themes[theme];
  const vars = Object.fromEntries(
    Object.entries(palette)
      .filter(([key]) => key !== 'name')
      .map(([key, value]) => [`--${key}`, value]),
  ) as CSSProperties;
  return (
    <div className={`shell ${reduced ? 'reduced' : ''}`} style={vars} data-theme={theme}>
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
        <p className="rail-label">WORKSPACE</p>
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
          DEVELOPMENT <span>0.1</span>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span>
            {page}
          </span>
          <span className="pill">
            <i />
            No active sessions
          </span>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <h1>{page}</h1>
              <p className="intro">
                {page === 'Command Center'
                  ? 'This PC · Local workspace'
                  : page === 'Devices'
                    ? 'Pairing and device access are not enabled.'
                    : 'Local application preferences'}
              </p>
            </div>
            <span className="edition">PHASE 0</span>
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
                  <p>Pairing is planned for Phase 1. Remote access remains off.</p>
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
            />
          )}
          <footer>
            <span>Relay Link · Foundation preview</span>
            <span data-testid="boundary-status" data-result={boundary}>
              {boundary === 'verified'
                ? 'Local access checks passed'
                : boundary === 'browser'
                  ? 'Design preview'
                  : boundary === 'failed'
                    ? 'Local access check failed'
                    : 'Checking local access…'}
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
