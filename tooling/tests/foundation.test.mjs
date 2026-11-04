import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import test from 'node:test';
import { publicationIssues } from '../verify-publication.mjs';

test('all original phases and release rows remain unchanged', () => {
  const roadmap = readFileSync('docs/planning/v2.4/RELAY_LINK_MASTER_ROADMAP_V2_4.md', 'utf8');
  const phases = [...roadmap.matchAll(/^## Phase (\d+):/gm)].map((match) => Number(match[1]));
  assert.deepEqual(
    phases,
    Array.from({ length: 14 }, (_, i) => i),
  );
  const rows = [...roadmap.matchAll(/^\| (\d+) \| [^\n]+? \| (\d+)% \| [^\n]+? \| (\d+)% \|$/gm)];
  assert.deepEqual(
    rows.map((row) => Number(row[2])),
    [4, 6, 8, 10, 8, 6, 7, 7, 10, 10, 7, 4, 8, 5],
  );
  assert.equal(
    rows.reduce((sum, row) => sum + Number(row[2]), 0),
    100,
  );
});

test('historical published planning inputs are unchanged', () => {
  const manifest = JSON.parse(
    readFileSync('docs/planning/v2.4/HISTORICAL_SOURCE_SHA256.json', 'utf8'),
  );
  let checked = 0;
  for (const [path, expected] of Object.entries(manifest)) {
    if (path.startsWith('docs/planning/source/')) continue; // Deliberately absent from a clean public checkout.
    const currentPath = path === 'AGENTS.md' ? 'docs/governance/AGENTS.md' : path;
    assert.equal(
      createHash('sha256').update(readFileSync(currentPath)).digest('hex'),
      expected,
      currentPath,
    );
    checked++;
  }
  assert.equal(checked, 4);
});

test('native command enrollment and grants do not include the denied probe or control', () => {
  const capability = JSON.parse(
    readFileSync('apps/desktop/src-tauri/capabilities/main.json', 'utf8'),
  );
  assert.deepEqual(capability.windows, ['main']);
  assert(capability.permissions.includes('allow-foundation-status'));
  assert(!capability.permissions.includes('allow-boundary-probe'));
  assert(!capability.remote);
  const config = JSON.parse(readFileSync('apps/desktop/src-tauri/tauri.conf.json', 'utf8'));
  assert.deepEqual(config.app.security.capabilities, ['main']);
  assert.equal(config.bundle.active, false);
});

test('publication scanner rejects sensitive paths and content without printing values', () => {
  for (const path of [
    '.env',
    'apps/mobile/android/local.properties',
    'signing.pfx',
    'artifacts-local/reference/source.js',
    'docs/planning/source/input.md',
  ])
    assert(publicationIssues(path).length > 0, path);
  assert(publicationIssues('sample.txt', '-----BEGIN ' + 'PRIVATE KEY-----').length > 0);
  assert.deepEqual(publicationIssues('apps/desktop/src/App.tsx', 'const value = 1;'), []);
});

test('owned project documentation is organized inside docs', () => {
  const paths = execFileSync('git', ['ls-files', '-z'], { encoding: 'utf8' })
    .split('\0')
    .filter(Boolean);
  const scattered = paths.filter(
    (path) => /(?:\.md$|(?:^|\/)LICENSE$)/.test(path) && !path.startsWith('docs/'),
  );
  assert.deepEqual(scattered, [], 'Keep all project documentation under docs/');
});
