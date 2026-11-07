import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { freshSnapshot } from './android-ui.mjs';

const adb = (...args) =>
  execFileSync('adb', args, { encoding: 'utf8', timeout: 20000, maxBuffer: 16 * 1024 * 1024 });
assert.equal(adb('shell', 'getprop', 'ro.kernel.qemu').trim(), '1', 'Dedicated emulator only');
const dir = 'docs/testing/evidence/v2.5/android';
await mkdir(dir, { recursive: true });
const density = adb('shell', 'wm', 'density').match(/Override density:\s*(\d+)/)?.[1] ?? 'reset';
const rotation = adb('shell', 'settings', 'get', 'system', 'user_rotation').trim();
const autoRotate = adb('shell', 'settings', 'get', 'system', 'accelerometer_rotation').trim();
const dump = () => freshSnapshot(adb, '/sdcard/relay-link-layout.xml');
const open = async (section) => {
  adb(
    'shell',
    'am',
    'start',
    '-n',
    'com.relaylink.mobile/.MainActivity',
    '-a',
    'android.intent.action.VIEW',
    '-d',
    `relay-link://settings/${section}`,
  );
  await delay(500);
  for (let i = 0; i < 20; i++) {
    try {
      const xml = dump();
      if (
        xml.includes(
          section === 'privacy'
            ? 'No devices have permission to control this PC.'
            : 'Phase 0 complete',
        )
      )
        return xml;
    } catch {
      /* Wait for the actual view. */
    }
    await delay(250);
  }
  throw new Error(`Native settings deep link failed: ${section}`);
};
const shot = async (name) =>
  writeFile(
    `${dir}/${name}.png`,
    execFileSync('adb', ['exec-out', 'screencap', '-p'], { maxBuffer: 16 * 1024 * 1024 }),
  );
try {
  const cases = [];
  adb('shell', 'settings', 'put', 'system', 'accelerometer_rotation', '0');
  adb('shell', 'settings', 'put', 'system', 'user_rotation', '0');
  for (const value of ['480', '400']) {
    adb('shell', 'wm', 'density', value);
    await delay(700);
    const xml = await open('privacy');
    assert(!xml.includes('Unmatched Route'));
    await shot(`density-${value}-privacy`);
    cases.push({ density: value, privacyDeepLink: 'PASS' });
  }
  adb('shell', 'settings', 'put', 'system', 'user_rotation', '1');
  await delay(700);
  const landscape = await open('privacy');
  assert(landscape.includes('rotation="1"'));
  await shot('landscape-privacy');
  const [, screenWidth, screenHeight] = landscape.match(/bounds="\[0,0\]\[(\d+),(\d+)\]"/);
  const accessVisible = (xml) => {
    const node = xml
      .match(/<node\b[^>]+>/g)
      ?.find((n) => n.includes('text="No devices have permission to control this PC."'));
    const bounds = node?.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    return bounds && Number(bounds[4]) - Number(bounds[2]) >= 45;
  };
  let scrolled = landscape;
  for (let i = 0; !accessVisible(scrolled) && i < 5; i++) {
    adb(
      'shell',
      'input',
      'swipe',
      String(Math.round(Number(screenWidth) * 0.6)),
      String(Math.round(Number(screenHeight) * 0.72)),
      String(Math.round(Number(screenWidth) * 0.6)),
      String(Math.round(Number(screenHeight) * 0.4)),
      '250',
    );
    await delay(200);
    scrolled = dump();
  }
  assert(accessVisible(scrolled), 'Landscape access information must be readable after scrolling');
  await shot('landscape-privacy-controls');
  adb('shell', 'settings', 'put', 'system', 'user_rotation', '0');
  await delay(500);
  await open('about');
  await shot('about-progress-information');
  adb('shell', 'input', 'keyevent', '4');
  await delay(300);
  assert(dump().includes('Remote access is off'), 'Hardware Back must return to Home');
  await open('about');
  await shot('about-reopened');
  adb('shell', 'input', 'keyevent', '4');
  await delay(300);
  assert(dump().includes('Remote access is off'), 'Repeated link must preserve hardware Back');
  const result = {
    result: 'PASS',
    runtime: 'actual Android API35 emulator',
    cases,
    landscape: 'rotation 1 confirmed; access information scrolled into readable bounds',
    deepLinks:
      'relay-link://settings/privacy and /about exercised; identical About reopened after Back',
    back: 'hardware Back returned to Home',
    limitations:
      'Density emulates phone layouts; physical hardware and spoken screen-reader behavior not verified',
  };
  await writeFile(`${dir}/layout-verification.json`, JSON.stringify(result, null, 2) + '\n');
  console.log('PASS: native Android density, landscape, local deep links and hardware Back.');
} finally {
  adb('shell', 'wm', 'density', density);
  adb('shell', 'settings', 'put', 'system', 'user_rotation', rotation);
  adb('shell', 'settings', 'put', 'system', 'accelerometer_rotation', autoRotate);
}
