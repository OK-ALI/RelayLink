import {
  ArrowRight,
  Gamepad2,
  Grid2X2,
  Laptop,
  Layers,
  Monitor,
  Settings,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { LinkMark } from '../../components/LinkMark';
import type { Navigate } from '../../navigation';

export function CommandCenter({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <>
      <div className="workspace-grid">
        <div className="workspace-main">
          <section className="device-panel" aria-labelledby="devices-title">
            <div className="section-header">
              <h2 id="devices-title">Device connections</h2>
              <span className="count">0 paired</span>
            </div>
            <div className="connection-strip">
              <div className="host-endpoint">
                <Laptop size={25} />
                <div>
                  <b>This PC</b>
                  <span>This device</span>
                </div>
              </div>
              <div className="connection-rule">
                <span />
                <LinkMark small />
                <span />
              </div>
              <div className="host-endpoint">
                <Smartphone size={24} />
                <div>
                  <b>Mobile</b>
                  <span>Not paired</span>
                </div>
              </div>
            </div>
            <table className="device-table">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Connection</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={3}>
                    <div className="empty-row">
                      <Smartphone size={18} />
                      <div>
                        <b>No paired devices</b>
                        <p>Pairing is unavailable in this preview.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="panel-actions">
              <button className="secondary" onClick={() => onNavigate('Devices')}>
                Device overview <ArrowRight size={14} />
              </button>
              <button className="secondary" disabled title="Pairing is unavailable in this preview">
                Pair device <span>Unavailable</span>
              </button>
            </div>
          </section>
          <section className="activity-section" aria-labelledby="activity-title">
            <div className="section-header">
              <h2 id="activity-title">PC activity</h2>
              <span className="quiet-label">Activity unavailable</span>
            </div>
            <dl className="activity-list">
              <div>
                <dt>Current app</dt>
                <dd>Unavailable</dd>
              </div>
              <div>
                <dt>Media</dt>
                <dd>Unavailable</dd>
              </div>
              <div>
                <dt>Game profile</dt>
                <dd>Not active</dd>
              </div>
            </dl>
            <p className="section-note">Activity information is unavailable in this preview.</p>
          </section>
        </div>
        <aside className="workspace-side" aria-label="Access and local actions">
          <section className="access-panel">
            <div className="section-header">
              <h2>Access & safety</h2>
              <ShieldCheck size={18} />
            </div>
            <div className="access-state">
              <span className="status-dot" />
              <strong>Remote access is off</strong>
            </div>
            <dl className="access-list">
              <div>
                <dt>Authorized devices</dt>
                <dd>None</dd>
              </div>
              <div>
                <dt>PC input</dt>
                <dd>Disabled</dd>
              </div>
              <div>
                <dt>Screen viewing</dt>
                <dd>Unavailable</dd>
              </div>
            </dl>
            <button className="text-action" onClick={() => onNavigate('Settings', 'privacy')}>
              Review access <ArrowRight size={14} />
            </button>
            <p className="section-note">No active sessions to pause or disconnect.</p>
          </section>
          <section className="local-actions">
            <div className="section-header">
              <h2>Quick Access</h2>
            </div>
            <button onClick={() => onNavigate('Appearance')}>
              <Layers size={16} />
              <span>Appearance</span>
              <ArrowRight size={14} />
            </button>
            <button onClick={() => onNavigate('Settings')}>
              <Settings size={16} />
              <span>Settings</span>
              <ArrowRight size={14} />
            </button>
          </section>
        </aside>
      </div>
      <section className="surfaces-section" aria-labelledby="surfaces-title">
        <div className="section-header">
          <h2 id="surfaces-title">Control surfaces</h2>
          <span className="quiet-label">Unavailable in this preview</span>
        </div>
        <div className="surface-list">
          {[
            {
              name: 'PC Controls',
              detail: 'Pointer and keyboard',
              Icon: Monitor,
            },
            {
              name: 'Relay Decks',
              detail: 'Configurable action surfaces',
              Icon: Grid2X2,
            },
            {
              name: 'Relay Pad',
              detail: 'Game profiles and controllers',
              Icon: Gamepad2,
            },
          ].map(({ name, detail, Icon }) => (
            <div className="surface-row" key={name}>
              <Icon size={19} />
              <b>{name}</b>
              <span>{detail}</span>
              <span className="planned">Unavailable</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
