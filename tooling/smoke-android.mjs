import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { performance } from 'node:perf_hooks';
import { freshSnapshot, visibleTarget } from './android-ui.mjs';

const adb = (...args) => execFileSync('adb', args, { encoding: 'utf8', timeout: 20000 });
const dump = () => freshSnapshot(adb, '/sdcard/relay-link-ui.xml');
function tap(xml, label) {
  const target = visibleTarget(xml, label);
  assert(target, `Visible native Android node not found: ${label}`);
  adb('shell', 'input', 'tap', String(target.x), String(target.y));
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
  adb('logcat', '-c'); // Dedicated emulator only; prior failures are preserved before a retry.
  adb('shell', 'am', 'force-stop', 'com.relaylink.mobile');
  adb(
    'shell',
    'am',
    'start',
    '-n',
    'com.relaylink.mobile/.MainActivity',
    '-a',
    'android.intent.action.VIEW',
    '-d',
    'exp+relay-link://expo-development-client/?url=http%3A%2F%2F127.0.0.1%3A8081',
  );
  let xml = '';
  const startupDeadline = performance.now() + 180000;
  let introductionDismissed = false;
  let menuClosed = false;
  let introductionAttempts = 0;
  let menuCloseAttempts = 0;
  let launcherRecoveries = 0;
  while (performance.now() < startupDeadline) {
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
      if (xml.includes('This is the developer menu.') && xml.includes('text="Continue"')) {
        assert(
          introductionAttempts++ < 3,
          'Expo introduction did not dismiss after bounded attempts',
        );
        tap(xml, 'Continue');
        introductionDismissed = true;
      } else if (
        xml.includes('Runtime version: exposdk:') &&
        xml.includes('content-desc="Close"')
      ) {
        assert(menuCloseAttempts++ < 3, 'Expo developer menu did not close after bounded attempts');
        tap(xml, 'Close');
        menuClosed = true;
      } else if (xml.includes('Remote access is off')) break;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith('Unexpected Android ANR')) throw error;
      if (error instanceof Error && error.message.startsWith('Expo ')) throw error;
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
    execFileSync('adb', ['exec-out', 'screencap', '-p'], { maxBuffer: 16 * 1024 * 1024 }),
  );
  const { verifyAndroidDesign } = await import('./verify-android-design.mjs');
  const refinement = await verifyAndroidDesign({ adb, dump, tap });
  await writeFile(
    'artifacts-local/android-smoke.json',
    JSON.stringify(
      {
        result: 'PASS',
        runtime: 'actual Android API35 emulator development build',
        home: 'disabled control visible',
        refinement,
        developmentIntroductionDismissed: introductionDismissed,
        developmentMenuClosed: menuClosed,
        developmentIntroductionTapAttempts: introductionAttempts,
        developmentMenuCloseAttempts: menuCloseAttempts,
        emulatorLauncherRecoveries: launcherRecoveries,
        physicalDevice: 'NOT RUN',
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    'PASS: actual Android Jump, themes, typography and motion/feedback demonstrations verified. Physical sensation is not claimed.',
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
