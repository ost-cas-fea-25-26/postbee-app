import { expect } from '@playwright/test';

import { test } from '../fixtures/a11y';

test.describe('Accessibility - Profile Page', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Accessibility tests only run on Chromium');

  test.beforeEach(async ({ page }) => {
    // Navigate to the current user's profile using /profile/me route
    await page.goto('/profile/me', { waitUntil: 'networkidle' });
  });

  test('profile page should not have accessibility violations', async ({ page, makeAxeBuilder }) => {
    const accessibilityScanResults = await makeAxeBuilder(page).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
