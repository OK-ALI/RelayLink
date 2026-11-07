import { test, expect, type Page } from '@playwright/test';

async function jump(page: Page, name: string, mobile = false) {
  await page.getByRole('button', { name: 'Jump to Section', exact: true }).click();
  await page.getByRole('button', { name, exact: true }).last().click();
  if (!mobile) await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  else
    await expect(page.getByRole('button', { name: 'Jump to Section', exact: true })).toBeFocused();
}

test('audio preview failure remains local and does not affect navigation or access state', async ({
  page,
}) => {
  await page.route('**/*.wav', (route) => route.abort('failed'));
  await page.goto('/#settings/feedback');
  await page.getByRole('switch', { name: 'Mute demonstration sounds' }).uncheck();
  await page.getByRole('button', { name: 'Demonstrate chime A' }).click();
  await expect(page.getByRole('status', { name: 'Feedback preview status' })).toHaveText(
    'Audio preview unavailable',
  );
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('button', { name: 'Command Center', exact: true })
    .click();
  await expect(page.getByText('Remote access is off', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Pair device Unavailable' })).toBeDisabled();
});

test('Desktop navigation, Jump discovery, themes and disabled control regressions', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Command Center', exact: true })).toBeVisible();
  await expect(page.getByText('Remote access is off', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quick Access', exact: true })).toBeVisible();
  expect(await page.locator('body').innerText()).not.toMatch(
    /workspace|phase \d|\b4%|not implemented|development/i,
  );
  await expect(page.getByTestId('boundary-status')).toHaveText('Design preview');
  await page.getByRole('button', { name: 'Devices', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Paired devices' })).toBeVisible();
  await page.getByRole('button', { name: 'Settings', exact: true }).click();
  await page.getByRole('button', { name: 'Jump to Section', exact: true }).click();
  await page.getByLabel('Search settings').fill('privacy');
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Privacy and access', exact: true })
    .click();
  await expect(page.getByText('No devices have permission to control this PC.')).toBeVisible();
  await jump(page, 'Appearance');
  for (const [label, id] of [
    ['Arctic Light', 'light'],
    ['Midnight Blue', 'blue'],
    ['Carbon Teal', 'teal'],
    ['Obsidian Amber', 'amber'],
  ]) {
    await page.getByRole('button', { name: label }).click();
    await expect(page.locator('.shell')).toHaveAttribute('data-theme', id!);
  }
  await jump(page, 'Motion and accessibility');
  await page.getByRole('switch', { name: 'Reduce motion' }).check();
  await expect(page.locator('.shell')).toHaveClass(/reduced/);
  await page.getByRole('button', { name: 'Jump to Section', exact: true }).click();
  await page.getByLabel('Search settings').fill('no-such-setting');
  await expect(page.getByRole('status')).toHaveText(/No settings found/);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Jump to Section', exact: true })).toBeFocused();
  expect(errors).toEqual([]);
});

test('Desktop font previews load, survive navigation, race safely and reset on reload', async ({
  page,
}) => {
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('button', { name: 'Appearance', exact: true })
    .click();
  for (const [name, id] of [
    ['B · Precision', 'plex'],
    ['C · Editorial', 'editorial'],
    ['A · Baseline', 'baseline'],
  ]) {
    await page.getByRole('button', { name: new RegExp(name!) }).click();
    await expect(page.getByTestId('font-status')).toContainText('ready');
    await expect(page.locator('.shell')).toHaveAttribute('data-typography', id!);
    await page.getByRole('button', { name: 'Command Center', exact: true }).click();
    await expect(page.locator('.shell')).toHaveAttribute('data-typography', id!);
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('button', { name: 'Appearance', exact: true })
      .click();
  }
  await page.getByRole('button', { name: /B · Precision/ }).click();
  await page.getByRole('button', { name: /C · Editorial/ }).click();
  await expect(page.locator('.shell')).toHaveAttribute('data-typography', 'editorial');
  await page.reload();
  await expect(page.locator('.shell')).toHaveAttribute('data-typography', 'baseline');
});

test('Desktop direct anchor, keyboard focus, OS reduction and feedback cancellation', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#settings/privacy');
  await expect(page.getByRole('heading', { name: 'Privacy and access' })).toBeVisible();
  await expect(page.locator('.shell')).toHaveClass(/reduced/);
  await jump(page, 'Sound and haptics');
  await page.getByRole('button', { name: 'Demonstrate chime A' }).click();
  await expect(page.getByRole('status', { name: 'Feedback preview status' })).toHaveText(
    'Preview muted',
  );
  await page.getByRole('switch', { name: 'Mute demonstration sounds' }).uncheck();
  await page.getByRole('button', { name: 'Demonstrate chime A' }).click();
  await expect(page.getByRole('status', { name: 'Feedback preview status' })).toHaveText(
    /demonstration|Demonstration/,
  );
  await page.getByRole('button', { name: 'Stop preview' }).click();
  await expect(page.getByRole('status', { name: 'Feedback preview status' })).toHaveText(
    'Demonstration stopped',
  );
  await page.getByRole('slider', { name: 'Preview volume' }).fill('0');
  await page.getByRole('button', { name: 'Demonstrate chime B' }).click();
  await expect(page.getByRole('status', { name: 'Feedback preview status' })).toHaveText(
    'Preview muted',
  );
  await jump(page, 'About Relay Link');
  await page.getByRole('button', { name: 'Open component study' }).click();
  await expect(page.getByRole('dialog', { name: 'Component study' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Unavailable', exact: true })).toBeDisabled();
  await page.getByRole('slider', { name: 'Study precision slider' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('slider', { name: 'Study precision slider' })).toHaveValue('41');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open component study' })).toBeFocused();
});

for (const [width, height] of [
  [800, 900],
  [1280, 800],
  [1920, 1080],
])
  test(`Desktop ${width}: all four themes and responsive composition`, async ({ page }) => {
    await page.setViewportSize({ width: width!, height: height! });
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Device connections' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pair device Unavailable' })).toBeDisabled();
    await page.getByRole('button', { name: 'Review access' }).click();
    await expect(page.getByRole('heading', { name: 'Privacy and access' })).toBeVisible();
    await jump(page, 'Appearance');
    for (const label of ['Obsidian Amber', 'Midnight Blue', 'Carbon Teal', 'Arctic Light']) {
      await page.getByRole('button', { name: label }).click();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.screenshot({
        path: `artifacts-local/v2.5/browser-desktop-${width}-${label.replaceAll(' ', '-')}.png`,
        fullPage: true,
      });
    }
  });

for (const [width, height] of [
  [360, 800],
  [430, 932],
  [800, 360],
])
  test(`Mobile ${width}: Jump, themes, touch targets and motion`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.setViewportSize({ width: width!, height: height! });
    await page.goto('http://127.0.0.1:8082/?section=about');
    await expect(
      page.getByText('0.1 · Foundation · Phase 0 complete · 4%', { exact: true }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Home', exact: true }).click();
    await expect(page).not.toHaveURL(/section=/);
    await expect(page.getByText('Remote access is off')).toBeVisible();
    expect(await page.locator('body').innerText()).not.toMatch(
      /workspace|phase \d|\b4%|not implemented|development/i,
    );
    await page.getByRole('button', { name: 'Settings', exact: true }).click();
    const trigger = page.getByRole('button', { name: 'Jump to Section', exact: true });
    expect((await trigger.boundingBox())!.height).toBeGreaterThanOrEqual(48);
    await jump(page, 'Privacy and access', true);
    await expect(page.getByText('No devices have permission to control this PC.')).toBeVisible();
    await jump(page, 'Appearance', true);
    for (const label of ['Obsidian Amber', 'Midnight Blue', 'Carbon Teal', 'Arctic Light'])
      await page.getByRole('button', { name: label, exact: true }).click();
    await jump(page, 'Motion and accessibility', true);
    await page.getByRole('switch', { name: 'Reduce motion' }).check();
    expect(
      (await page.getByRole('switch', { name: 'Reduce motion' }).boundingBox())!.height,
    ).toBeGreaterThanOrEqual(44);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await jump(page, 'Sound and haptics', true);
    const volume = page.getByRole('slider', { name: 'Preview volume', exact: true });
    expect((await volume.boundingBox())!.height).toBeGreaterThanOrEqual(48);
    await volume.focus();
    await volume.press('ArrowRight');
    await expect(volume).toHaveValue('26');
    await volume.fill('100');
    await volume.press('ArrowRight');
    await expect(volume).toHaveValue('100');
    await volume.fill('0');
    await page.getByRole('button', { name: 'Demonstrate chime A' }).click();
    await expect(page.getByText('Preview muted', { exact: true })).toBeVisible();
    await page.screenshot({
      path: `artifacts-local/v2.5/browser-mobile-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
