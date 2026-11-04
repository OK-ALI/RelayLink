import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const endpoint = 'http://127.0.0.1:4444';
async function request(path, method = 'GET', body) {
  const response = await fetch(endpoint + path, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal: AbortSignal.timeout(60000),
  });
  const result = await response.json();
  if (!response.ok || result.value?.error) throw new Error(JSON.stringify(result));
  return result.value;
}
const started = await request('/session', 'POST', {
  capabilities: {
    alwaysMatch: {
      browserName: 'wry',
      'tauri:options': { application: resolve('target/debug/relay-link-desktop.exe') },
    },
  },
});
const id = started.sessionId;
const execute = (script) => request(`/session/${id}/execute/sync`, 'POST', { script, args: [] });
try {
  let status = '';
  for (let attempt = 0; attempt < 40; attempt++) {
    status = await execute(
      "return document.querySelector('[data-testid=boundary-status]')?.textContent || ''",
    );
    if (status === 'Native boundary verified') break;
    await delay(250);
  }
  if (status !== 'Native boundary verified') {
    await mkdir('artifacts-local', { recursive: true });
    await writeFile(
      'artifacts-local/native-failure.json',
      JSON.stringify(
        { status, page: await execute('return {url:location.href,text:document.body.innerText}') },
        null,
        2,
      ),
    );
  }
  assert.equal(status, 'Native boundary verified');
  const boundary = await request(`/session/${id}/execute/async`, 'POST', {
    script: `const done=arguments[arguments.length-1]; (async()=>{const result={};for(const name of ['foundation_status','boundary_probe','windows_control']){try{result[name]={allowed:true,value:await window.__TAURI_INTERNALS__.invoke(name)}}catch(error){result[name]={allowed:false,error:String(error)}}}done(result)})()`,
    args: [],
  });
  assert.equal(boundary.foundation_status.allowed, true);
  assert.equal(boundary.foundation_status.value.controlEnabled, false);
  assert.equal(boundary.boundary_probe.allowed, false);
  assert.match(boundary.boundary_probe.error, /not allowed|denied|permission/i);
  assert.equal(boundary.windows_control.allowed, false);
  await execute(
    "Array.from(document.querySelectorAll('nav button')).find(b=>b.textContent==='Settings').click()",
  );
  await delay(250);
  assert.match(await execute('return document.querySelector("h1").textContent'), /Settings/);
  const screenshot = await request(`/session/${id}/screenshot`);
  await mkdir('artifacts-local', { recursive: true });
  await writeFile('artifacts-local/native-desktop.png', Buffer.from(screenshot, 'base64'));
  await writeFile(
    'artifacts-local/native-boundary.json',
    JSON.stringify(
      {
        result: 'PASS',
        runtime: 'actual Windows Tauri WebView2',
        boundary,
        navigation: 'Settings opened',
      },
      null,
      2,
    ) + '\n',
  );
  console.log(
    'PASS: actual Tauri WebView allows local status, denies enrolled-ungranted probe, rejects nonexistent Windows control, and opens Settings.',
  );
} finally {
  await request(`/session/${id}`, 'DELETE');
}
