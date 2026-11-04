import { Search, ShieldCheck } from 'lucide-react';
import { settings, themes, type ThemeId } from '@relay-link/design-tokens';
type Props = {
  searchable: boolean;
  query: string;
  setQuery: (value: string) => void;
  theme: ThemeId;
  setTheme: (value: ThemeId) => void;
  reduced: boolean;
  setReduced: (value: boolean) => void;
};
export function SettingsView({
  searchable,
  query,
  setQuery,
  theme,
  setTheme,
  reduced,
  setReduced,
}: Props) {
  const matches = settings.filter((item) =>
    `${item.title} ${item.keywords}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <section className="settings-panel">
      {searchable && (
        <label className="search">
          <Search size={18} />
          <input
            aria-label="Search settings"
            placeholder="Find a setting…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      )}
      {matches.map((item) => (
        <div className="setting-row" key={item.id}>
          <div>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
          </div>
          {item.id === 'appearance' && (
            <div className="themes">
              {Object.entries(themes).map(([id, palette]) => (
                <button
                  key={id}
                  className={theme === id ? 'theme selected' : 'theme'}
                  aria-pressed={theme === id}
                  onClick={() => setTheme(id as ThemeId)}
                >
                  <span style={{ background: palette.canvas, borderColor: palette.accent }}>
                    <i style={{ background: palette.accent }} />
                  </span>
                  {palette.name}
                </button>
              ))}
            </div>
          )}
          {item.id === 'motion' && (
            <label className="toggle">
              <input
                type="checkbox"
                checked={reduced}
                onChange={(event) => setReduced(event.target.checked)}
              />
              Reduce motion
            </label>
          )}
          {item.id === 'privacy' && (
            <div className="privacy-note">
              <ShieldCheck size={17} />
              No control capabilities are granted.
            </div>
          )}
        </div>
      ))}
      {matches.length === 0 && (
        <p role="status">No settings found. Try “theme”, “motion” or “privacy”.</p>
      )}
      <p className="candidate-note">
        Foundation direction approved. Production artwork and detailed settings remain under review.
      </p>
    </section>
  );
}
