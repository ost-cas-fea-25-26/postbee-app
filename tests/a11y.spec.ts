import { expect } from '@playwright/test';

import { test } from './fixtures/a11y';

// Only run accessibility tests on Chromium
test.describe('Accessibility - Home Page', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Accessibility tests only run on Chromium');

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should not have accessibility violations on home page', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder(page).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations in settings dialog', async ({ page, makeAxeBuilder }) => {
    // Click the Settings button to open the dialog
    await page.getByRole('button', { name: /settings/i }).click();

    // Wait for the dialog to be visible
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    // Run accessibility scan on the dialog
    const accessibilityScanResults = await makeAxeBuilder(page).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should not have accessibility violations in image upload dialog', async ({ page, makeAxeBuilder }) => {
    // Click the Image upload button to open the dialog
    await page.getByRole('button', { name: /image upload/i }).click();

    // Wait for the dialog to be visible
    await page.getByRole('dialog').waitFor({ state: 'visible' });

    // Run accessibility scan on the dialog
    const accessibilityScanResults = await makeAxeBuilder(page).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
