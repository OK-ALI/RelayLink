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
  const nodes = xml.match(/<node\b[^>]+>/g) ?? [];
  const node =
    nodes.find((item) => item.includes(`content-desc="${label}"`)) ??
    nodes.find((item) => item.includes(`text="${label}"`));
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
await writeFile(
  'artifacts-local/android-smoke.json',
  JSON.stringify({ result: 'RUNNING', runtime: 'dedicated Android emulator smoke' }) + '\n',
);
try {
  assert.equal(
    adb('shell', 'getprop', 'ro.kernel.qemu').trim(),
    '1',
    'Use the dedicated test emulator',
  );
  adb('reverse', 'tcp:8081', 'tcp:8081');
  adb('shell', 'am', 'force-stop', 'com.relaylink.mobile');
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
  const startupDeadline = Date.now() + 180000;
  let introductionDismissed = false;
  let menuClosed = false;
  let launcherRecoveries = 0;
  while (Date.now() < startupDeadline) {
    await delay(1000);
    try {
      xml = dump();
      if (xml.includes("Quickstep isn't responding") && launcherRecoveries === 0) {
        tap(xml, 'Close app');
        launcherRecoveries++;
        continue;
      }
      if (xml.includes("isn't responding")) {
        throw new Error('Unexpected Android ANR: inspect failure evidence');
      }
      if (xml.includes('Remote access is off')) break;
      if (
        !introductionDismissed &&
        xml.includes('This is the developer menu.') &&
        xml.includes('text="Continue"')
      ) {
        tap(xml, 'Continue');
        introductionDismissed = true;
      } else if (
        !menuClosed &&
        xml.includes('Runtime version: exposdk:') &&
        xml.includes('content-desc="Close"')
      ) {
        tap(xml, 'Close');
        menuClosed = true;
      }
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Unexpected Android ANR')) throw error;
      /* Retry while the emulator and native view initialize. */
    }
  }
  await writeFile('artifacts-local/android-home.xml', xml);
  assert(
    xml.includes('Remote access is off'),
    'Actual Android Home did not show the disabled-control foundation',
  );
  await writeFile(
    'artifacts-local/android-home.png',
    execFileSync('adb', ['exec-out', 'screencap', '-p']),
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
  adb('shell', 'input', 'keyevent', ...Array(7).fill('67'));
  adb('shell', 'input', 'keyevent', '4');
  await delay(700);
  xml = dump();
  tap(xml, 'Carbon Teal');
  await delay(500);
  xml = dump();
  assert(
    xml
      .match(/<node\b[^>]+>/g)
      ?.some(
        (node) => node.includes('content-desc="Carbon Teal"') && node.includes('selected="true"'),
      ),
    'Native theme selection was not reflected',
  );
  tap(xml, 'Reduce motion');
  await delay(500);
  xml = dump();
  assert(
    xml
      .match(/<node\b[^>]+>/g)
      ?.some(
        (node) => node.includes('content-desc="Reduce motion"') && node.includes('checked="true"'),
      ),
    'Native reduced-motion switch did not turn on',
  );
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
        theme: 'Carbon Teal selected',
        reducedMotion: 'native switch checked',
        physicalDevice: 'NOT RUN',
        developmentIntroductionDismissed: introductionDismissed,
        developmentMenuClosed: menuClosed,
        emulatorLauncherRecoveries: launcherRecoveries,
        androidApi: adb('shell', 'getprop', 'ro.build.version.sdk').trim(),
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    'PASS: actual Android development build opened Home, Settings and privacy search. Physical-device behavior is not claimed.',
  );
} catch (error) {
  await writeFile(
    'artifacts-local/android-smoke.json',
    JSON.stringify({
      result: 'FAIL',
      error: String(error),
      runtime: 'dedicated Android emulator smoke',
    }) + '\n',
  );
  for (const [name, args] of [
    ['android-failure.png', ['exec-out', 'screencap', '-p']],
    ['android-errors.log', ['logcat', '-d', '-s', 'ReactNativeJS:E', 'AndroidRuntime:E', '*:S']],
  ]) {
    try {
      await writeFile(`artifacts-local/${name}`, execFileSync('adb', args, { timeout: 20000 }));
    } catch {
      /* Preserve the original test failure if diagnostic collection is unavailable. */
    }
  }
  throw error;
}
