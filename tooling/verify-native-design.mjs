import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';

export async function runRefinement({ request, execute, id }) {
  const dir = 'docs/testing/evidence/v2.5/windows';
  await mkdir(dir, { recursive: true });
  const click = async (label, selector = 'button') => {
    const found = await execute(
      `const b=Array.from(document.querySelectorAll(${JSON.stringify(selector)})).find(b=>(b.getAttribute('aria-label')||b.textContent.trim())===${JSON.stringify(label)}); if(b){b.click();return true;}return false;`,
    );
    assert(found, `Missing native control: ${label}`);
    await delay(250);
  };
  const main = (label) => click(label, 'nav[aria-label="Main navigation"] button');
  // Text includes decorative arrows in the rail; select by accessible label below.
  const choose = async (sectionId) => {
    assert(
      await execute(
        `const b=document.querySelector('.section-rail nav button:nth-child(${['appearance', 'motion', 'feedback', 'privacy', 'about'].indexOf(sectionId) + 1})');if(b){b.click();return true}return false`,
      ),
    );
    await delay(250);
  };
  const screenshot = async (name) => {
    const png = await request(`/session/${id}/screenshot`);
    await writeFile(`${dir}/${name}.png`, Buffer.from(png, 'base64'));
  };
  await request(`/session/${id}/window/rect`, 'POST', { width: 1280, height: 900, x: 0, y: 0 });
  const fonts = [];
  await main('Settings');
  await choose('appearance');
  for (const [theme, label] of [
    ['amber', 'Obsidian Amber'],
    ['light', 'Arctic Light'],
  ]) {
    for (const [font, prefix] of [
      ['baseline', 'A · Baseline'],
      ['plex', 'B · Precision'],
      ['editorial', 'C · Editorial'],
    ]) {
      await main('Settings');
      await choose('appearance');
      await click(label, '.themes button');
      assert(
        await execute(
          `const b=Array.from(document.querySelectorAll('.type-options button')).find(b=>b.textContent.startsWith(${JSON.stringify(prefix)}));if(b){b.click();return true}return false`,
        ),
      );
      let state;
      for (let attempt = 0; attempt < 40; attempt++) {
        await delay(150);
        state = await execute(
          `return {font:document.querySelector('.shell').dataset.typography,status:document.querySelector('[data-testid="font-status"]').textContent,body:getComputedStyle(document.querySelector('.shell')).fontFamily,heading:getComputedStyle(document.querySelector('h2')).fontFamily,width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth}`,
        );
        if (state.font === font && state.status.includes('ready')) break;
      }
      assert.equal(state.font, font);
      assert.match(state.status, /ready/);
      assert.equal(state.overflow, false);
      fonts.push({ theme, font, ...state });
      await execute('window.scrollTo(0,0)');
      await screenshot(`${font}-${theme}-settings`);
      await main('Command Center');
      await screenshot(`${font}-${theme}-home`);
    }
  }
  await main('Settings');
  await choose('appearance');
  await execute("document.querySelector('.type-options button').click()");
  await delay(300);
  for (const [label, theme] of [
    ['Obsidian Amber', 'amber'],
    ['Midnight Blue', 'blue'],
    ['Carbon Teal', 'teal'],
    ['Arctic Light', 'light'],
  ]) {
    await click(label, '.themes button');
    await main('Command Center');
    await screenshot(`theme-${theme}`);
    await main('Settings');
  }
  await choose('about');
  await click('Open component study');
  await screenshot('component-study-light');
  await click('Close study');
  await choose('appearance');
  await click('Obsidian Amber', '.themes button');
  await choose('about');
  await click('Open component study');
  await screenshot('component-study-dark');
  await click('Close study');
  await click('Jump to Section');
  await screenshot('jump-picker');
  await click('Close section picker');
  await choose('feedback');
  await screenshot('feedback-demonstration');
  await click('Demonstrate chime A');
  assert.match(
    await execute(
      'return document.querySelector(\'[aria-label="Feedback preview status"]\').textContent',
    ),
    /muted/,
  );
  await execute("document.querySelector('input[role=switch]').click()");
  await click('Demonstrate chime A');
  await click('Stop preview');
  assert.match(
    await execute(
      'return document.querySelector(\'[aria-label="Feedback preview status"]\').textContent',
    ),
    /stopped/,
  );
  const frames = [];
  for (const mode of ['performance', 'balanced', 'enhanced', 'reduced']) {
    await choose('motion');
    await execute(
      `const r=document.querySelectorAll('.mode-options input')[${mode === 'performance' ? 0 : mode === 'enhanced' ? 2 : 1}];r.click();const s=document.querySelector('input[role=switch]');if(s.checked!==${mode === 'reduced'})s.click();`,
    );
    frames.push(
      await request(`/session/${id}/execute/async`, 'POST', {
        script: `const done=arguments[arguments.length-1];const times=[];let previous=performance.now();const start=previous;let i=0;let maxAnimations=0;const duration=getComputedStyle(document.querySelector(".shell")).getPropertyValue("--duration");function frame(now){times.push(now-previous);previous=now;maxAnimations=Math.max(maxAnimations,document.getAnimations().length);if(i++%20===0){document.querySelectorAll('.section-rail nav button')[Math.floor(i/20)%5].click()}if(now-start<3000)requestAnimationFrame(frame);else{times.sort((a,b)=>a-b);done({mode:${JSON.stringify(mode)},elapsed:now-start,frames:times.length,duration,maxAnimations,p95:times[Math.floor(times.length*.95)],max:times.at(-1),animations:document.getAnimations().length})}}requestAnimationFrame(frame);`,
        args: [],
      }),
    );
  }
  assert(
    frames
      .filter((f) => ['performance', 'reduced'].includes(f.mode))
      .every((f) => f.maxAnimations === 0),
  );
  assert(
    frames
      .filter((f) => ['balanced', 'enhanced'].includes(f.mode))
      .every((f) => f.maxAnimations > 0),
  );
  await main('Command Center');
  for (const [width, height] of [
    [1280, 800],
    [1920, 1080],
    [800, 900],
  ]) {
    await request(`/session/${id}/window/rect`, 'POST', { width, height, x: 0, y: 0 });
    await delay(200);
    assert.equal(await execute('return document.documentElement.scrollWidth>innerWidth'), false);
    await screenshot(`responsive-${width}`);
  }
  await request(`/session/${id}/window/rect`, 'POST', { width: 1280, height: 900, x: 0, y: 0 });
  await execute("document.documentElement.style.zoom='2'");
  await delay(200);
  assert.equal(await execute('return document.documentElement.scrollWidth>innerWidth'), false);
  await screenshot('content-zoom-200');
  await execute("document.documentElement.style.zoom='1'");
  let video = { result: 'NOT RUN', reason: 'Use --record to attempt application-window recording' };
  if (process.argv.includes('--record')) {
    await request(`/session/${id}/window/rect`, 'POST', { width: 1000, height: 700, x: 0, y: 0 });
    const { recordNativeMotion } = await import('./record-native-motion.mjs');
    video = await recordNativeMotion({ execute, choose, click, main, dir });
  }
  await writeFile(
    `${dir}/verification.json`,
    JSON.stringify(
      {
        result: 'PASS',
        runtime: 'actual Tauri Windows WebView2',
        fonts,
        frames,
        video,
        frameLimit: 'Short rAF diagnostics; not input latency, GPU or physical low-end acceptance.',
        feedback: 'Mute and stop exercised; audibility not observed',
        scaling: '200% content zoom, not OS DPI',
      },
      null,
      2,
    ) + '\n',
  );
}
