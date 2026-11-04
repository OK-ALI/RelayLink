import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

const adb = (...args) => execFileSync('adb', args, { encoding: 'utf8', timeout: 20000 });
const dump = () => {
  adb('shell', 'uiautomator', 'dump', '/sdcard/relay-link-ui.xml');
  return adb('exec-out', 'cat', '/sdcard/relay-link-ui.xml');
};
function tap(xml, label) {
  const node = xml
    .match(/<node\b[^>]+>/g)
    ?.find((item) => item.includes(`text="${label}"`) || item.includes(`content-desc="${label}"`));
  const bounds = node?.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
  assert(bounds, `Native Android node not found: ${label}`);
  adb(
    'shell',
    'input',
    'tap',
    String(Math.floor((Number(bounds[1]) + Number(bounds[3])) / 2)),
    String(Math.floor((Number(bounds[2]) + Number(bounds[4])) / 2)),
  );
}
await mkdir('artifacts-local', { recursive: true });
adb('reverse', 'tcp:8081', 'tcp:8081');
adb(
  'shell',
  'am',
  'start',
  '-W',
  '-a',
  'android.intent.action.VIEW',
  '-d',
  'exp+relay-link://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081',
  'com.relaylink.mobile',
);
let xml = '';
for (let attempt = 0; attempt < 90; attempt++) {
  await delay(1000);
  try {
    xml = dump();
    if (xml.includes('Remote access is off')) break;
  } catch {
    /* Retry while the emulator and native view initialize. */
  }
}
await writeFile('artifacts-local/android-home.xml', xml);
assert(
  xml.includes('Remote access is off'),
  'Actual Android Home did not show the disabled-control foundation',
);
tap(xml, 'Settings');
await delay(1000);
xml = dump();
assert(xml.includes('Appearance'), 'Actual Android Settings did not open');
tap(xml, 'Search settings');
adb('shell', 'input', 'text', 'privacy');
await delay(500);
xml = dump();
assert(xml.includes('Privacy and access'), 'Actual Android settings search failed');
await writeFile('artifacts-local/android-settings.xml', xml);
await writeFile(
  'artifacts-local/android-shell.png',
  execFileSync('adb', ['exec-out', 'screencap', '-p']),
);
await writeFile(
  'artifacts-local/android-smoke.json',
  JSON.stringify(
    {
      result: 'PASS',
      runtime: 'actual Android emulator development build',
      home: 'disabled control visible',
      settings: 'opened',
      search: 'privacy found',
      physicalDevice: 'NOT RUN',
    },
    null,
    2,
  ) + '\n',
);
console.log(
  'PASS: actual Android development build opened Home, Settings and privacy search. Physical-device behavior is not claimed.',
);
