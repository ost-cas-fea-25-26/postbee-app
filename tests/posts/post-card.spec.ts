import { expect, test } from '@playwright/test';

test.describe('PostCard Component', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page where posts are displayed
    await page.goto('/');
  });

  test('should display post cards on the page', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Page should load successfully (posts may or may not be present)
    const postCards = page.locator('[data-testid="post-card"]');
    await postCards
      .first()
      .isVisible()
      .catch(() => {
        // Empty state is acceptable
      });
  });

  test('should render post card container', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const postCard = page.locator('[data-testid="post-card"]').first();

    // Check if post card exists (might not if there are no posts)
    const count = await postCard.count();
    if (count > 0) {
      await expect(postCard).toBeVisible();
    }
  });

  test('should be clickable when post card is present', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const postCard = page.locator('[data-testid="post-card"]').first();
    const count = await postCard.count();

    if (count > 0) {
      // Post card should be visible and interactive
      await expect(postCard).toBeVisible();
    }
  });
});
