import { test, expect } from '@playwright/test';

test('selection enables actions, local preview and download work', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Download', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: /Getting started.txt/ }).click();
  await expect(page.getByRole('button', { name: 'Download', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Open', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('fictional sample files');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  const downloading = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download', exact: true }).click();
  expect((await downloading).suggestedFilename()).toBe('Getting started.txt');
});

test('filter removes selection, empty state recovers, deletion requires confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Interface notes.md/ }).click();
  await page.getByRole('searchbox').fill('not-a-file');
  await expect(page.getByRole('heading', { name: 'No matching files' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Delete', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Clear filter' }).click();
  await page.getByRole('button', { name: /Interface notes.md/ }).click();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('button', { name: 'Cancel', exact: true }).click();
  await expect(page.getByRole('button', { name: /Interface notes.md/ })).toBeVisible();
  await page.getByRole('button', { name: 'Delete', exact: true }).click();
  await page.getByRole('button', { name: 'Confirm delete', exact: true }).click();
  await expect(page.getByRole('button', { name: /Interface notes.md/ })).toHaveCount(0);
  await page.getByRole('button', { name: 'Reset demo' }).click();
  await expect(page.getByRole('button', { name: /Interface notes.md/ })).toBeVisible();
});

test('keyboard focus, local sample and no external requests', async ({ page }) => {
  const external: string[] = []; const errors: string[] = [];
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:4173')) external.push(request.url()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'filebar / lab' })).toBeFocused();
  await page.getByRole('button', { name: 'Find', exact: true }).click();
  await expect(page.getByRole('searchbox')).toBeFocused();
  await page.getByRole('button', { name: 'Add sample' }).click();
  await expect(page.getByRole('status')).toContainText('Nothing was uploaded');
  await expect(page.getByRole('button', { name: /Sample note 1.txt/ })).toHaveAttribute('aria-pressed','true');
  expect(external).toEqual([]); expect(errors).toEqual([]);
});

for (const theme of ['Light', 'Dark']) for (const size of [20, 24]) {
  test(`visual matrix ${theme} ${size}`, async ({ page }) => {
    await page.setViewportSize({ width: 1360, height: 1080 }); await page.goto('/');
    await page.getByRole('button', { name: theme, exact: true }).click();
    await page.getByRole('button', { name: `${size} px`, exact: true }).click();
    await page.getByRole('button', { name: /Interface notes.md/ }).click();
    await expect(page.locator('.app')).toHaveAttribute('data-theme',theme.toLowerCase());
    await expect(page.locator('[data-icon="download"]')).toHaveAttribute('width',String(size));
    expect(await page.locator('svg[data-icon]').evaluateAll(nodes => new Set(nodes.map(node => node.getAttribute('data-icon'))).size)).toBe(6);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.screenshot({ path: `evidence/${theme.toLowerCase()}-${size}.png`, fullPage: true });
  });
}

test('mobile layout has no horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 }); await page.goto('/');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  await expect(page.getByRole('button', { name: 'Add sample' })).toBeVisible();
  await page.screenshot({ path: 'evidence/mobile-light.png', fullPage: true });
});
