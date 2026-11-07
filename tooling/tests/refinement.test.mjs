import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { FeedbackPreviewGate, motionDuration } from '../../packages/design-tokens/src/index.ts';
import { visibleTarget } from '../android-ui.mjs';

test('native automation rejects clipped controls and chooses the foreground modal target', () => {
  const node = (bounds, extra = '') =>
    `<node content-desc="Appearance" enabled="true" bounds="${bounds}" ${extra}>`;
  assert.equal(visibleTarget(node('[0,0][0,0]'), 'Appearance'), undefined);
  assert.equal(visibleTarget(node('[0,100][200,120]'), 'Appearance'), undefined);
  const target = visibleTarget(
    node('[0,2100][350,2220]') + node('[0,1200][1080,1350]'),
    'Appearance',
  );
  assert.equal(target.y, 1275);
  assert.equal(visibleTarget(node('[0,100][200,200]', 'enabled="false"'), 'Appearance'), undefined);
  assert.equal(
    visibleTarget(
      '<node class="android.widget.SeekBar" content-desc="Preview volume, 25%" enabled="true" bounds="[53,787][1028,913]">',
      'Preview volume',
    )?.y,
    850,
  );
});

test('V2.5 preserves historical files, native authority and all phase weights', () => {
  const manifest = JSON.parse(
    readFileSync('docs/planning/v2.5/INTEGRATION_VERIFICATION.json', 'utf8'),
  );
  for (const [path, expected] of Object.entries(manifest.unchangedHistoricalFiles))
    assert.equal(
      createHash('sha256')
        .update(readFileSync(path, 'utf8').replaceAll('\r\n', '\n'))
        .digest('hex'),
      expected,
      path,
    );
  for (const [path, rule] of Object.entries(manifest.allowedUiChanges ?? {})) {
    const config = JSON.parse(readFileSync(path, 'utf8'));
    assert.equal(config.app.windows[0].title, rule.titleAfter);
    config.app.windows[0].title = '<ui-title>';
    assert.equal(
      createHash('sha256').update(JSON.stringify(config)).digest('hex'),
      rule.normalizedSha256,
      'Only the authorized window caption may change',
    );
  }
  const master = readFileSync('docs/planning/v2.5/RELAY_LINK_MASTER_ROADMAP_V2_5_20261105.md');
  assert.equal(createHash('sha256').update(master).digest('hex'), manifest.integratedMasterSha256);
  assert.deepEqual(
    [
      ...master.toString().matchAll(/^\| (\d+) \| [^\n]+? \| (\d+)% \| [^\n]+? \| (\d+)% \|$/gm),
    ].map((r) => r.slice(1, 4)),
    manifest.phaseRows,
  );
});

test('feedback cannot report connection success, bypass mute or overlap a storm', () => {
  const gate = new FeedbackPreviewGate();
  assert.equal(gate.begin('connection-success', false, 0.25, 0), null);
  assert.equal(gate.begin('demonstration', true, 0.25, 0), null);
  for (const volume of [0, -1, 1.1, NaN])
    assert.equal(gate.begin('demonstration', false, volume, 0), null);
  const token = gate.begin('demonstration', false, 0.25, 0);
  assert.notEqual(token, null);
  assert(gate.current(token));
  assert.equal(gate.begin('demonstration', false, 0.25, 10), null);
  gate.cancel();
  assert(!gate.current(token));
  assert.notEqual(gate.begin('demonstration', false, 0.25, 1000), null);
});

test('Reduced Motion takes precedence over all quality modes', () => {
  for (const mode of ['performance', 'balanced', 'enhanced'])
    assert.equal(motionDuration(mode, true), 0);
  assert.equal(motionDuration('performance', false), 0);
  assert(motionDuration('balanced', false) > 0);
  assert(motionDuration('enhanced', false) <= 250);
});

test('audio configuration excludes recording and background service authority', () => {
  const config = JSON.parse(readFileSync('apps/mobile/app.json', 'utf8')).expo;
  assert.equal(
    config.plugins.filter((entry) => (Array.isArray(entry) ? entry[0] : entry) === 'expo-audio')
      .length,
    1,
    'Duplicate Expo audio plugins can apply unsafe defaults before the configured plugin',
  );
  const audio = config.plugins.find(
    (entry) => Array.isArray(entry) && entry[0] === 'expo-audio',
  )[1];
  assert.equal(audio.recordAudioAndroid, false);
  assert.equal(audio.enableBackgroundRecording, false);
  assert.equal(audio.enableBackgroundPlayback, false);
  assert(config.android.blockedPermissions.includes('android.permission.RECORD_AUDIO'));
});
