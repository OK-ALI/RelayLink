import assert from 'node:assert/strict';
import { execFileSync, spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { visibleTarget } from './android-ui.mjs';

export async function verifyAndroidDesign({ adb, dump, tap }) {
  const dir = 'docs/testing/evidence/v2.5/android';
  await mkdir(dir, { recursive: true });
  const scales = {};
  for (const key of [
    'animator_duration_scale',
    'transition_animation_scale',
    'window_animation_scale',
  ]) {
    scales[key] = adb('shell', 'settings', 'get', 'global', key).trim();
    adb('shell', 'settings', 'put', 'global', key, '1');
  }
  const fontScale = adb('shell', 'settings', 'get', 'system', 'font_scale').trim();
  const top = async () => {
    for (let i = 0; i < 4; i++) adb('shell', 'input', 'swipe', '500', '550', '500', '1900', '160');
    await delay(200);
  };
  const click = async (label, find = false) => {
    let xml = dump();
    for (let i = 0; find && !visibleTarget(xml, label) && i < 8; i++) {
      adb('shell', 'input', 'swipe', '500', '1770', '500', '700', '180');
      await delay(120);
      xml = dump();
    }
    tap(xml, label);
    await delay(250);
    return dump();
  };
  const shot = async (name) =>
    writeFile(
      `${dir}/${name}.png`,
      execFileSync('adb', ['exec-out', 'screencap', '-p'], { maxBuffer: 16 * 1024 * 1024 }),
    );
  const jump = async (label) => {
    await top();
    await click('Jump to Section');
    await click(label);
  };
  const captures = [];
  try {
    await click('Settings');
    await top();
    await click('Jump to Section');
    await click('Search settings');
    adb('shell', 'input', 'text', 'privacy');
    await delay(250);
    await shot('jump-search-keyboard');
    await click('Privacy and access');
    assert(dump().includes('No devices have permission to control this PC.'));
    await jump('Appearance');
    for (const [theme, label] of [
      ['amber', 'Obsidian Amber'],
      ['light', 'Arctic Light'],
    ]) {
      for (const [font, name] of [
        ['baseline', 'A · Baseline · Space Grotesk / Manrope'],
        ['plex', 'B · Precision · IBM Plex Sans'],
        ['editorial', 'C · Editorial · Fraunces / Source Sans 3'],
      ]) {
        await top();
        await click(label, true);
        await click(name, true);
        adb('shell', 'input', 'swipe', '500', '1700', '500', '900', '180');
        await delay(200);
        let xml = '';
        for (let i = 0; i < 25; i++) {
          xml = dump();
          if (xml.includes('ready')) break;
          await delay(200);
        }
        assert(xml.includes('ready'), `Font load not confirmed: ${font}`);
        const status = (xml.match(/text="([^"]*ready[^"]*)"/) || [])[1];
        assert(
          status?.includes(
            font === 'baseline'
              ? 'A · Baseline'
              : font === 'plex'
                ? 'B · Precision'
                : 'C · Editorial',
          ),
        );
        captures.push({ theme, font, status });
        await top();
        await shot(`${font}-${theme}-settings`);
        await click('Home');
        await top();
        assert(dump().includes('Remote access is off'));
        await shot(`${font}-${theme}-home`);
        await click('Settings');
      }
    }
    await click('A · Baseline · Space Grotesk / Manrope', true);
    await top();
    for (const [label, theme] of [
      ['Obsidian Amber', 'amber'],
      ['Midnight Blue', 'blue'],
      ['Carbon Teal', 'teal'],
      ['Arctic Light', 'light'],
    ]) {
      const xml = await click(label, true);
      assert(
        xml
          .match(/<node\b[^>]+>/g)
          ?.some((n) => n.includes(`content-desc="${label}"`) && n.includes('selected="true"')),
      );
      await top();
      await shot(`theme-${theme}`);
    }
    await jump('Motion and accessibility');
    await click('Reduce motion');
    let xml = dump();
    const node = xml
      .match(/<node\b[^>]+>/g)
      ?.find((n) => n.includes('content-desc="Reduce motion"'));
    assert(node?.includes('checked="true"'));
    const bounds = node.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    assert(bounds);
    const density =
      Number([...adb('shell', 'wm', 'density').matchAll(/density:\s*(\d+)/g)].at(-1)[1]) / 160;
    const switchTargetDp = (Number(bounds[4]) - Number(bounds[2])) / density;
    assert(switchTargetDp >= 44);
    await shot('reduced-motion');
    await click('Reduce motion');
    const modes = [];
    for (const mode of ['performance', 'balanced', 'enhanced']) {
      const modeXml = await click(mode, true);
      assert(visibleTarget(modeXml, mode)?.node.includes('selected="true"'));
      modes.push(mode);
    }
    for (const key of Object.keys(scales)) adb('shell', 'settings', 'put', 'global', key, '0');
    await delay(500);
    await top();
    assert(dump().includes('System Reduced Motion: On'));
    await shot('system-reduced-motion');
    for (const key of Object.keys(scales)) adb('shell', 'settings', 'put', 'global', key, '1');
    await jump('Sound and haptics');
    await click('Demonstrate chime A', true);
    assert(dump().includes('Preview muted'));
    await click('Mute demonstration sounds', true);
    await click('Demonstrate chime A', true);
    adb('shell', 'input', 'swipe', '500', '1770', '500', '900', '180');
    const playbackXml = dump();
    assert(
      playbackXml.includes('Demonstration ended') || playbackXml.includes('Playing demonstration'),
      'Native playback must report playing or an actual completion event',
    );
    await top();
    const volumeTarget = visibleTarget(await click('Preview volume', true), 'Preview volume');
    assert(volumeTarget, 'Full-row adjustable volume control must be exposed');
    const volumeBounds = volumeTarget.node.match(/bounds="\[(\d+),(\d+)\]\[(\d+),(\d+)\]"/);
    const sliderTargetDp = (Number(volumeBounds[4]) - Number(volumeBounds[2])) / density;
    assert(sliderTargetDp >= 48, 'Slider accessibility target must be at least 48 dp');
    const [left, upper, right, lower] = volumeBounds.slice(1).map(Number);
    adb(
      'shell',
      'input',
      'tap',
      String(Math.round(left + (right - left) * 0.8)),
      String(upper + 4),
    );
    await delay(200);
    const volumeXml = dump();
    const previewVolume = Number(volumeXml.match(/text="Preview volume · (\d+)%"/)?.[1]);
    assert(
      Number.isFinite(previewVolume) && previewVolume >= 70 && previewVolume <= 90,
      'Touch outside the thin inner rail must update the volume through the full row',
    );
    adb(
      'shell',
      'input',
      'swipe',
      String(Math.round(left + (right - left) * 0.8)),
      String(Math.round((upper + lower) / 2)),
      String(Math.round(left + (right - left) * 0.3)),
      String(Math.round((upper + lower) / 2)),
      '350',
    );
    await delay(200);
    const draggedVolume = Number(dump().match(/text="Preview volume · (\d+)%"/)?.[1]);
    assert(draggedVolume >= 20 && draggedVolume <= 40, 'Native slider drag must remain functional');
    await top();
    await click('Stop preview', true);
    adb('shell', 'input', 'swipe', '500', '1770', '500', '900', '180');
    assert(dump().includes('Demonstration stopped'));
    await click('Enable haptic demonstration', true);
    await click('Demonstrate selection haptic', true);
    assert(dump().includes('Haptic request sent'));
    await shot('feedback-demonstration');
    await jump('About Relay Link');
    await click('Open component study');
    await shot('component-study-light');
    adb('shell', 'input', 'keyevent', '4');
    await delay(200);
    assert(dump().includes('Jump to Section'));
    await jump('Appearance');
    await click('Obsidian Amber', true);
    await jump('About Relay Link');
    await click('Open component study');
    await shot('component-study-dark');
    await click('Close study');
    await top();
    await click('Jump to Section');
    await shot('jump-picker');
    adb('shell', 'input', 'keyevent', '4');
    adb('shell', 'input', 'keyevent', '3');
    adb('shell', 'settings', 'put', 'system', 'font_scale', '1.3');
    adb('shell', 'am', 'start', '-n', 'com.relaylink.mobile/.MainActivity');
    await delay(800);
    await click('Home');
    await top();
    const scaledXml = dump();
    await writeFile(`${dir}/font-scale-130.xml`, scaledXml);
    const bodyHeight = (xml) => {
      const bounds = xml.match(
        /<node\b[^>]*text="No PC selected. Pairing is unavailable in this preview."[^>]*bounds="\[\d+,(\d+)\]\[\d+,(\d+)\]"/,
      );
      assert(bounds, 'Body text measurement missing');
      return Number(bounds[2]) - Number(bounds[1]);
    };
    const originalBodyHeightPx = bodyHeight(
      await readFile('artifacts-local/android-home.xml', 'utf8'),
    );
    const scaledBodyHeightPx = bodyHeight(scaledXml);
    assert(
      scaledBodyHeightPx > originalBodyHeightPx,
      'System font scale must visibly increase text metrics',
    );
    await shot('font-scale-130');
    adb('shell', 'settings', 'put', 'system', 'font_scale', fontScale);
    adb('shell', 'input', 'keyevent', '3');
    adb('shell', 'am', 'start', '-n', 'com.relaylink.mobile/.MainActivity');
    await delay(500);
    adb('shell', 'dumpsys', 'gfxinfo', 'com.relaylink.mobile', 'reset');
    const recording = spawn(
      'adb',
      [
        'shell',
        'screenrecord',
        '--time-limit',
        '20',
        '--size',
        '540x1200',
        '/sdcard/relay-link-v25.mp4',
      ],
      { stdio: 'ignore', windowsHide: true },
    );
    const recorded = new Promise((resolve) => recording.on('close', resolve));
    for (let i = 0; i < 3; i++) {
      await click('Settings');
      await jump('Motion and accessibility');
      await click(i % 2 ? 'balanced' : 'enhanced', true);
      await click('Home');
    }
    await recorded;
    adb('pull', '/sdcard/relay-link-v25.mp4', `${dir}/motion-demonstration.mp4`);
    await writeFile(
      `${dir}/gfxinfo.txt`,
      adb('shell', 'dumpsys', 'gfxinfo', 'com.relaylink.mobile', 'framestats'),
    );
    await writeFile(
      `${dir}/memory.txt`,
      adb('shell', 'dumpsys', 'meminfo', 'com.relaylink.mobile'),
    );
    const errors = adb('logcat', '-d', '-s', 'ReactNativeJS:E', 'AndroidRuntime:E', '*:S');
    await writeFile(`${dir}/runtime-errors.log`, errors);
    assert(
      !/ E (ReactNativeJS|AndroidRuntime):/.test(errors),
      'Native runtime errors must be resolved before PASS',
    );
    const result = {
      result: 'PASS',
      runtime: 'actual Android API35 x86_64 emulator',
      captures,
      modes,
      switchTargetDp,
      sliderTargetDp,
      previewVolume,
      draggedVolume,
      osReduced: 'All Android animation scales 0 observed On; restored',
      scaling: 'font_scale 1.3 captured; restored',
      originalBodyHeightPx,
      scaledBodyHeightPx,
      feedback:
        'Mute, manual play request, stop and haptic API request observed; audio/haptic perception NOT RUN',
      motion:
        'Native screen recording and gfxinfo; development/emulation diagnostic, not low-end performance acceptance',
      originalSystemScales: scales,
    };
    await writeFile(`${dir}/verification.json`, JSON.stringify(result, null, 2) + '\n');
    return result;
  } finally {
    for (const [key, value] of Object.entries(scales))
      adb('shell', 'settings', 'put', 'global', key, value);
    adb('shell', 'settings', 'put', 'system', 'font_scale', fontScale);
  }
}
