import { expect, test } from '@playwright/test';

test.describe('Authenticated UI', () => {
  test('should show logout button when authenticated', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for logout button (or user avatar/profile)
    const logoutButton = page.getByRole('button', { name: /logout|sign out|log out/i });
    await expect(logoutButton).toBeVisible();
  });
});
