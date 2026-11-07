import { useEffect, useRef, useState } from 'react';
import { ArrowDownToLine, Check, ShieldCheck, X } from 'lucide-react';
import {
  settings,
  themes,
  typography,
  type ThemeId,
  type TypographyId,
  type MotionMode,
} from '@relay-link/design-tokens';
import { Button, Toggle } from '../../components/Controls';
import { Feedback } from './Feedback';

type Props = {
  searchable: boolean;
  query: string;
  setQuery: (value: string) => void;
  theme: ThemeId;
  setTheme: (value: ThemeId) => void;
  reduced: boolean;
  setReduced: (value: boolean) => void;
  mode: MotionMode;
  setMode: (value: MotionMode) => void;
  font: TypographyId;
  previewFont: (id: TypographyId) => void;
  fontStatus: string;
};
export function SettingsView(p: Props) {
  const [active, setActive] = useState(p.query || 'appearance');
  const [filter, setFilter] = useState('');
  const [previous, setPrevious] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const study = useRef<HTMLDialogElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const scrollPositions = useRef<Record<string, number>>({});
  const matches = settings.filter((item) =>
    `${item.title} ${item.keywords}`.toLowerCase().includes(filter.toLowerCase()),
  );
  const select = (id: string, back = false) => {
    scrollPositions.current[active] = window.scrollY;
    if (!back && id !== active) setPrevious((v) => [...v, active]);
    setActive(id);
    p.setQuery(id);
    dialog.current?.close();
    window.history.replaceState(null, '', `#settings/${id}`);
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollPositions.current[id] || 0, behavior: 'instant' });
      heading.current?.focus({ preventScroll: true });
    });
  };
  useEffect(() => {
    if (settings.some((s) => s.id === p.query)) setActive(p.query);
  }, [p.query]);
  const item = settings.find((s) => s.id === active) ?? settings[0];
  return (
    <section className="settings-layout">
      {p.searchable && (
        <aside className="section-rail">
          <Button
            className="jump-trigger"
            onClick={() => {
              setFilter('');
              dialog.current?.showModal();
            }}
          >
            <ArrowDownToLine size={16} />
            Jump to Section
          </Button>
          <nav aria-label="Settings sections">
            {settings.map((s) => (
              <button
                key={s.id}
                aria-current={active === s.id ? 'location' : undefined}
                onClick={() => select(s.id)}
              >
                {s.title}
                <span>{active === s.id ? '•' : '›'}</span>
              </button>
            ))}
          </nav>
          <p>
            On this PC
            <br />
            Preferences last for this session.
          </p>
        </aside>
      )}
      <div className="settings-detail" key={item.id}>
        <div className="section-header">
          <span className="quiet-label">
            {String(settings.findIndex((s) => s.id === item.id) + 1).padStart(2, '0')} / 05
          </span>
          {previous.length > 0 && (
            <Button
              onClick={() => {
                const next = previous.at(-1)!;
                setPrevious((v) => v.slice(0, -1));
                select(next, true);
              }}
            >
              Back to previous section
            </Button>
          )}
        </div>
        <h2 ref={heading} tabIndex={-1}>
          {item.title}
        </h2>
        <p className="setting-description">{item.description}</p>
        {item.id === 'appearance' && (
          <>
            <h3>Color theme</h3>
            <div className="themes">
              {Object.entries(themes).map(([id, palette]) => (
                <button
                  key={id}
                  className={p.theme === id ? 'theme selected' : 'theme'}
                  aria-pressed={p.theme === id}
                  onClick={() => p.setTheme(id as ThemeId)}
                >
                  <span style={{ background: palette.canvas, borderColor: palette.accent }}>
                    <i style={{ background: palette.accent }} />
                  </span>
                  <span className="theme-name">
                    {palette.name}
                    {p.theme === id && <Check size={14} />}
                  </span>
                </button>
              ))}
            </div>
            <div className="setting-divider" />
            <h3>Typography comparison</h3>
            <p>
              Session-only review. A is the unchanged default; no candidate is permanently adopted.
            </p>
            <div className="type-options">
              {Object.entries(typography).map(([id, type]) => (
                <Button
                  key={id}
                  aria-pressed={p.font === id}
                  onClick={() => p.previewFont(id as TypographyId)}
                >
                  <b>{type.label}</b>
                  <span>{type.detail}</span>
                </Button>
              ))}
            </div>
            <p role="status" data-testid="font-status">
              {p.fontStatus}
            </p>
            <p className="specimen">
              Relay Link · Il1 O0 · 0123456789 · 4%
              <br />
              Devices, privacy and useful actions.
            </p>
          </>
        )}
        {item.id === 'motion' && (
          <>
            <Toggle label="Reduce motion" checked={p.reduced} onChange={p.setReduced} />
            <p>System preference is also respected, including while this window is open.</p>
            <fieldset className="mode-options">
              <legend>Animation quality</legend>
              {(['performance', 'balanced', 'enhanced'] as const).map((m) => (
                <label key={m}>
                  <input
                    type="radio"
                    name="motion-mode"
                    checked={p.mode === m}
                    onChange={() => p.setMode(m)}
                  />
                  {m}
                </label>
              ))}
            </fieldset>
            <p>
              Performance removes movement. Balanced uses brief transitions. Enhanced adds a little
              settling time. Actions respond immediately in every mode.
            </p>
          </>
        )}
        {item.id === 'feedback' && <Feedback />}
        {item.id === 'privacy' && (
          <>
            <div className="privacy-note">
              <ShieldCheck size={20} />
              No devices have permission to control this PC.
            </div>
            <dl className="access-list">
              <div>
                <dt>Remote access</dt>
                <dd>Off</dd>
              </div>
              <div>
                <dt>Authorized devices</dt>
                <dd>0</dd>
              </div>
              <div>
                <dt>Windows control</dt>
                <dd>Unavailable</dd>
              </div>
            </dl>
            <p>Pairing and control are unavailable. Demonstrations do not enable access.</p>
          </>
        )}
        {item.id === 'about' && (
          <>
            <dl className="access-list">
              <div>
                <dt>Version</dt>
                <dd>0.1 · Foundation</dd>
              </div>
              <div>
                <dt>Completed progress</dt>
                <dd>4% · Phase 0</dd>
              </div>
            </dl>
            <p>
              Linked Path is the approved symbol direction. Production artwork, typography and
              signature sound remain under review.
            </p>
            <Button onClick={() => study.current?.showModal()}>Open component study</Button>
          </>
        )}
      </div>
      <dialog
        ref={dialog}
        className="review-dialog"
        aria-labelledby="jump-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="section-header">
          <h2 id="jump-title">Jump to Section</h2>
          <Button aria-label="Close section picker" onClick={() => dialog.current?.close()}>
            <X size={18} />
          </Button>
        </div>
        <label className="search">
          <input
            autoFocus
            aria-label="Search settings"
            placeholder="Find a section or keyword"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </label>
        <nav aria-label="Matching sections">
          {matches.map((s) => (
            <Button key={s.id} aria-label={s.title} onClick={() => select(s.id)}>
              {s.title}
              <span>{s.id === active ? 'Current' : '↗'}</span>
            </Button>
          ))}
        </nav>
        {!matches.length && (
          <p role="status">No settings found. Try “theme”, “motion” or “privacy”.</p>
        )}
      </dialog>
      <dialog ref={study} className="review-dialog study" aria-labelledby="study-title">
        <div className="section-header">
          <h2 id="study-title">Component study</h2>
          <Button onClick={() => study.current?.close()}>Close study</Button>
        </div>
        <p>Local demonstrations · no device or control actions.</p>
        <div className="button-row">
          <Button className="primary">Primary action</Button>
          <Button>Secondary action</Button>
          <Button disabled>Unavailable</Button>
          <Button aria-busy="true">Loading…</Button>
        </div>
        <div className="button-row">
          <Button data-study-state="pressed">Pressed study</Button>
          <Button data-study-state="focus">Focus study</Button>
        </div>
        <label className="search">
          Device label
          <input aria-label="Study device label" defaultValue="This PC" />
        </label>
        <label className="search error">
          Invalid label
          <input
            aria-label="Study invalid label"
            aria-invalid="true"
            defaultValue=""
            aria-describedby="study-error"
          />
        </label>
        <p id="study-error">Enter a label. Error state demonstration.</p>
        <Toggle label="Study switch" checked={p.reduced} onChange={p.setReduced} />
        <label className="range-label">
          Precision slider
          <input
            aria-label="Study precision slider"
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue="40"
          />
        </label>
        <div className="device-study">
          <span>This PC</span>
          <span className="status-chip">Remote access off</span>
        </div>
        <p>
          Dialog, selection and navigation are exercised in Settings. Simulated pressed/focus
          examples supplement actual keyboard and pointer tests.
        </p>
      </dialog>
    </section>
  );
}
