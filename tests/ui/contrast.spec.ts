import { test, expect, type Locator } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

async function contrast(locator: Locator) {
  return locator.evaluate((element) => {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true })!;
    const ancestors: Element[] = [];
    for (let node: Element | null = element; node; node = node.parentElement)
      ancestors.unshift(node);
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 1, 1);
    for (const node of ancestors) {
      context.fillStyle = getComputedStyle(node).backgroundColor;
      context.fillRect(0, 0, 1, 1);
    }
    const background = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let text: Node | null;
    while ((text = walker.nextNode())) if (text.textContent?.trim()) break;
    context.fillStyle = getComputedStyle(text?.parentElement || element).color;
    context.fillRect(0, 0, 1, 1);
    const foreground = [...context.getImageData(0, 0, 1, 1).data].slice(0, 3);
    const luminance = (values: number[]) =>
      values
        .map((v) => v / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce((s, v, i) => s + v * [0.2126, 0.7152, 0.0722][i]!, 0);
    const a = luminance(foreground),
      b = luminance(background);
    return { foreground, background, ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05) };
  });
}

test('selected and pressed text states remain readable in every theme on both renderers', async ({
  page,
}) => {
  const results = [];
  await page.goto('/#settings/appearance');
  for (const label of ['Obsidian Amber', 'Midnight Blue', 'Carbon Teal', 'Arctic Light']) {
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.waitForFunction(() => document.getAnimations().length === 0);
    for (const selector of [
      '.nav.active',
      '.section-rail nav button[aria-current]',
      '.type-options button[aria-pressed=true]',
    ]) {
      const measurement = await contrast(page.locator(selector));
      expect(measurement.ratio, `${label}: ${selector}`).toBeGreaterThanOrEqual(4.5);
      results.push({ platform: 'Desktop', theme: label, selector, ...measurement });
    }
  }
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('http://127.0.0.1:8082');
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  for (const label of ['Obsidian Amber', 'Midnight Blue', 'Carbon Teal', 'Arctic Light']) {
    await page.getByRole('button', { name: 'Jump to Section', exact: true }).click();
    await page.getByRole('button', { name: 'Appearance', exact: true }).last().click();
    await page.getByRole('button', { name: label, exact: true }).click();
    await page.getByRole('button', { name: 'Jump to Section', exact: true }).click();
    await page.getByRole('button', { name: 'Motion and accessibility', exact: true }).click();
    const button = page.getByRole('button', { name: 'balanced', exact: true });
    await button.click();
    for (const state of ['selected', 'pressed']) {
      if (state === 'pressed') {
        const box = (await button.boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
      }
      const measurement = await contrast(button);
      expect(measurement.ratio, `${label}: Mobile ${state}`).toBeGreaterThanOrEqual(4.5);
      results.push({ platform: 'Mobile web renderer', theme: label, state, ...measurement });
      if (state === 'pressed') await page.mouse.up();
    }
  }
  await mkdir('artifacts-local/v2.5', { recursive: true });
  await writeFile(
    'artifacts-local/v2.5/state-contrast.json',
    JSON.stringify(results, null, 2) + '\n',
  );
});
