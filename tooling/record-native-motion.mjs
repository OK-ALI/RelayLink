import { spawn } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

export async function recordNativeMotion({ execute, choose, click, main, dir }) {
  await main('Settings');
  await choose('motion');
  await execute(
    "const s=document.querySelector('input[role=switch]');if(s.checked)s.click();document.querySelectorAll('.mode-options input')[1].click()",
  );
  const path = `${dir}/motion-demonstration.mp4`;
  const config = JSON.parse(await readFile('apps/desktop/src-tauri/tauri.conf.json', 'utf8'));
  // Capture this application window only. Never fall back to recording the desktop.
  const child = spawn(
    'ffmpeg',
    [
      '-y',
      '-f',
      'gdigrab',
      '-framerate',
      '30',
      '-i',
      `title=${config.app.windows[0].title}`,
      '-t',
      '18',
      '-vf',
      'scale=1280:-2',
      '-c:v',
      'libx264',
      '-preset',
      'ultrafast',
      '-pix_fmt',
      'yuv420p',
      path,
    ],
    { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] },
  );
  let diagnostics = '';
  child.stderr.setEncoding('utf8');
  child.stderr.on('data', (chunk) => {
    diagnostics = (diagnostics + chunk).slice(-4000);
  });
  const finished = new Promise((resolve) => {
    child.on('error', () => resolve(null));
    child.on('close', resolve);
  });
  await delay(700);
  await choose('appearance');
  await delay(1000);
  await click('Jump to Section');
  await delay(1000);
  await click('Close section picker');
  await choose('privacy');
  await delay(1000);
  await main('Command Center');
  await delay(1000);
  await main('Settings');
  await choose('motion');
  await delay(1000);
  await execute("document.querySelector('input[role=switch]').click()");
  await choose('appearance');
  const code = await finished;
  await writeFile('artifacts-local/native-record.log', diagnostics);
  return code === 0
    ? {
        result: 'PASS',
        path,
        scope: 'Actual Windows application window only; Balanced then Reduced Motion',
      }
    : {
        result: 'NOT RUN',
        reason:
          'Window-specific FFmpeg recording was unavailable; no desktop capture fallback used',
      };
}
