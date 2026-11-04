import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

test('desktop navigation, candidacy, settings and theme remain usable without control', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(
    page.getByRole('heading', { name: 'A little closer. A lot more control.' }),
  ).toBeVisible();
  await expect(page.getByText('Remote access is off')).toBeVisible();
  await expect(page.getByTestId('boundary-status')).toHaveText('Browser design preview');
  await page.getByRole('button', { name: 'Devices', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Your devices will live here.' })).toBeVisible();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByLabel('Search settings').fill('privacy');
  await expect(page.getByRole('heading', { name: 'Privacy and access' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Appearance', exact: true })).not.toBeVisible();
  await page.getByLabel('Search settings').fill('');
  await page.getByRole('button', { name: 'Arctic Light' }).click();
  await expect(page.locator('.shell')).toHaveAttribute('data-theme', 'light');
  await page.getByLabel('Reduce motion').check();
  await expect(page.locator('.shell')).toHaveClass(/reduced/);
  await page.getByLabel('Search settings').fill('no-such-setting');
  await expect(page.getByRole('status')).toHaveText(/No settings found/);
  await page.screenshot({ path: 'artifacts-local/desktop-light.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('compact desktop and candidate dashboard remain in bounds', async ({ page }) => {
  await page.setViewportSize({ width: 800, height: 900 });
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Good things work together.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: 'artifacts-local/desktop-amber.png', fullPage: true });
});

test('mobile web shell navigation/search/theme and no-control state', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('http://127.0.0.1:8082');
  await expect(page.getByText('Remote access is off')).toBeVisible();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByLabel('Search settings').fill('privacy');
  await expect(page.getByText('No control capabilities are granted.')).toBeVisible();
  await page.getByLabel('Search settings').fill('');
  await page.getByRole('button', { name: 'Carbon Teal' }).click();
  await page.getByRole('switch', { name: 'Reduce motion' }).check();
  await page.screenshot({ path: 'artifacts-local/mobile-teal.png', fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  expect(errors).toEqual([]);
});

test('capture concrete desktop, mobile and letter-free mark comparisons for owner review', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByText('Remote access is off')).toBeVisible();
  await page.screenshot({ path: 'artifacts-local/review-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 393, height: 852 });
  await page.goto('http://127.0.0.1:8082');
  await expect(page.getByText('Remote access is off')).toBeVisible();
  await page.screenshot({ path: 'artifacts-local/review-mobile.png', fullPage: true });
  const names = ['linked-path', 'relay-loop', 'directional-bridge'];
  const marks = await Promise.all(
    names.map((name) => readFile(`branding/source/${name}-candidate.svg`, 'utf8')),
  );
  await page.setViewportSize({ width: 1200, height: 650 });
  await page.setContent(
    `<html><body style="margin:0;background:#101419;color:#f5f1e8;font-family:system-ui;padding:44px"><p style="color:#f0a34a;letter-spacing:3px;font-size:11px">RELAY LINK · PHASE 0 DESIGN REVIEW</p><h1 style="font-size:32px">Three link-only directions.</h1><p style="color:#b9c3ce">Original comparison studies. No symbol is selected or approved.</p><div style="display:flex;gap:24px;margin-top:36px">${marks.map((mark, i) => `<section style="flex:1;background:#1b232d;padding:28px;border-radius:18px"><div style="width:100px;height:100px;margin-bottom:28px">${mark}</div><h2 style="font-size:18px">${['A · Linked Path', 'B · Relay Loop', 'C · Directional Bridge'][i]}</h2><div style="display:flex;gap:20px;align-items:center">${[16, 24, 32].map((size) => `<span style="display:inline-block;width:${size}px;height:${size}px">${mark}</span>`).join('')}</div><p style="font-size:11px;color:#b9c3ce">16 px · 24 px · 32 px</p></section>`).join('')}</div></body></html>`,
  );
  await page.screenshot({ path: 'artifacts-local/review-symbols.png', fullPage: true });
});
