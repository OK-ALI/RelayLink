import { test, expect } from '@playwright/test';

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
