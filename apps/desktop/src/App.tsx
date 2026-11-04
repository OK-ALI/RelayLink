import { useEffect, useState, type CSSProperties } from 'react';
import {
  ArrowUpRight,
  AudioLines,
  CircleHelp,
  Command,
  Gamepad2,
  Grid2X2,
  Laptop,
  Layers,
  Monitor,
  Search,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { themes, settings, type ThemeId } from '@relay-link/design-tokens';
import { LinkMark } from './components/LinkMark';
import { verifyNativeBoundary, type BoundaryResult } from './ipc/foundation';

type Page = 'Command Center' | 'Devices' | 'Appearance' | 'Settings';
export function App() {
  const [page, setPage] = useState<Page>('Command Center');
  const [theme, setTheme] = useState<ThemeId>('amber');
  const [query, setQuery] = useState('');
  const [reduced, setReduced] = useState(false);
  const [boundary, setBoundary] = useState<BoundaryResult>('checking');
  useEffect(() => {
    void verifyNativeBoundary().then(setBoundary);
  }, []);
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
          onClick={() => setPage('Command Center')}
          aria-label="Relay Link home"
        >
          <LinkMark small />
          <span>
            Relay <b>Link</b>
          </span>
        </a>
        <p className="rail-label">YOUR WORKSPACE</p>
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
              key={label}
              className={page === label ? 'nav active' : 'nav'}
              onClick={() => setPage(label)}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-note">
          <ShieldCheck size={20} />
          <b>You’re in control.</b>
          <p>Remote access stays off while we build the foundations.</p>
        </div>
        <button className="help" onClick={() => setPage('Settings')}>
          <CircleHelp size={17} /> Help & information
        </button>
        <div className="version">
          FOUNDATION PREVIEW <span>0.1</span>
        </div>
      </aside>
      <main>
        <header className="topbar">
          <span>
            Workspace <span className="slash">/</span> {page}
          </span>
          <span className="pill">
            <i /> Local foundation
          </span>
        </header>
        <div className="content">
          <div className="page-heading">
            <div>
              <p className="eyebrow">YOUR PC. IN YOUR HANDS.</p>
              <h1>{page === 'Command Center' ? 'A little closer.\nA lot more control.' : page}</h1>
              <p className="intro">
                {page === 'Command Center'
                  ? 'One thoughtful workspace for your PC and your phone.'
                  : 'Make Relay Link feel like your own.'}
              </p>
            </div>
            <span className="edition">
              PHASE 0 <Sparkles size={14} />
            </span>
          </div>
          {page === 'Command Center' && (
            <>
              <section className="connection-panel" aria-labelledby="connection-heading">
                <div className="panel-top">
                  <div>
                    <p className="eyebrow">CONNECTION HUB</p>
                    <h2 id="connection-heading">Good things work together.</h2>
                  </div>
                  <span className="outline-label">Not paired</span>
                </div>
                <div className="connection-map">
                  <div className="endpoint">
                    <div className="device-art">
                      <Laptop size={68} strokeWidth={1.15} />
                    </div>
                    <h3>This PC</h3>
                    <p>Desktop foundation</p>
                  </div>
                  <div className="bridge">
                    <span />
                    <LinkMark />
                    <span />
                  </div>
                  <div className="endpoint phone-end">
                    <div className="device-art">
                      <Smartphone size={58} strokeWidth={1.15} />
                    </div>
                    <h3>Your phone</h3>
                    <p>Pairing comes next</p>
                  </div>
                </div>
                <div className="connection-footer">
                  <span>
                    <i /> Remote access is off
                  </span>
                  <span>No network listener · No PC input</span>
                </div>
              </section>
              <div className="section-heading">
                <h2>A place for everything.</h2>
                <span>Built in thoughtful steps</span>
              </div>
              <section className="feature-grid" aria-label="Planned experiences">
                {[
                  {
                    title: 'PC Controls',
                    text: 'The everyday, made effortless.',
                    Icon: Monitor,
                    label: 'Phase 3',
                  },
                  {
                    title: 'Media',
                    text: 'Set the mood. Stay in the flow.',
                    Icon: AudioLines,
                    label: 'Phase 4',
                  },
                  {
                    title: 'Relay Decks',
                    text: 'Your shortcuts. Your way.',
                    Icon: Grid2X2,
                    label: 'Phase 7',
                  },
                  {
                    title: 'Relay Pad',
                    text: 'A new way to play.',
                    Icon: Gamepad2,
                    label: 'Phase 8',
                  },
                ].map(({ title, text, Icon, label }) => (
                  <article className="feature" key={title}>
                    <div className="feature-top">
                      <Icon size={25} strokeWidth={1.4} />
                      <span>{label}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="planned">Planned</span>
                  </article>
                ))}
              </section>
              <section className="personalize">
                <div className="palette-symbol">
                  <Layers size={25} />
                </div>
                <div>
                  <h3>Same connection. Your expression.</h3>
                  <p>Explore four candidate themes, made for both screens.</p>
                </div>
                <button className="text-action" onClick={() => setPage('Appearance')}>
                  Explore appearance <ArrowUpRight size={18} />
                </button>
              </section>
            </>
          )}
          {page === 'Devices' && (
            <section className="empty-state">
              <Smartphone size={46} />
              <h2>Your devices will live here.</h2>
              <p>
                Pairing and trusted-device management begin in Phase 1.
                <br />
                This foundation does not accept remote connections.
              </p>
              <span className="outline-label">Remote access off</span>
            </section>
          )}
          {(page === 'Appearance' || page === 'Settings') && (
            <section className="settings-panel">
              {page === 'Settings' && (
                <label className="search">
                  <Search size={18} />
                  <input
                    aria-label="Search settings"
                    placeholder="Find a setting…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </label>
              )}
              {settings
                .filter((item) =>
                  `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
                )
                .map((item) => (
                  <div className="setting-row" key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                    {item.id === 'appearance' && (
                      <div className="themes">
                        {Object.entries(themes).map(([id, t]) => (
                          <button
                            key={id}
                            className={theme === id ? 'theme selected' : 'theme'}
                            aria-pressed={theme === id}
                            onClick={() => setTheme(id as ThemeId)}
                          >
                            <span style={{ background: t.canvas, borderColor: t.accent }}>
                              <i style={{ background: t.accent }} />
                            </span>
                            {t.name}
                          </button>
                        ))}
                      </div>
                    )}
                    {item.id === 'motion' && (
                      <label className="toggle">
                        <input
                          type="checkbox"
                          checked={reduced}
                          onChange={(e) => setReduced(e.target.checked)}
                        />{' '}
                        Reduce motion
                      </label>
                    )}
                    {item.id === 'privacy' && (
                      <div className="privacy-note">
                        <ShieldCheck size={18} /> No control capabilities are granted.
                      </div>
                    )}
                  </div>
                ))}
              {!settings.some((item) =>
                `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
              ) && <p role="status">No settings found. Try “theme”, “motion” or “privacy”.</p>}
              <p className="candidate-note">
                Themes, typography and the link symbol are design candidates awaiting owner review.
              </p>
            </section>
          )}
          <footer>
            <span>
              Relay Link <span className="muted">·</span> Control · Connect · Play
            </span>
            <span data-testid="boundary-status">
              {boundary === 'verified'
                ? 'Native boundary verified'
                : boundary === 'browser'
                  ? 'Browser design preview'
                  : boundary === 'failed'
                    ? 'Boundary verification failed'
                    : 'Checking native boundary…'}
            </span>
          </footer>
        </div>
      </main>
    </div>
  );
}
