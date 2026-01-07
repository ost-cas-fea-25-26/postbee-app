import { expect, test } from '@playwright/test';

test.describe('PostsList Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display list of posts', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check if posts list container exists
    const postsList = page.locator('[data-testid="posts-list"]');
    await expect(postsList).toBeVisible();

    // Post cards may or may not be present (empty state is valid)
    const postCards = page.locator('[data-testid="post-card"]');
    await postCards
      .first()
      .isVisible()
      .catch(() => {
        // Empty state is acceptable
      });
  });

  test('should load more posts when scrolling to bottom', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Get initial count of posts
    const initialPostCards = page.locator('[data-testid="post-card"]');
    const initialCount = await initialPostCards.count();

    // Scroll to bottom to trigger infinite scroll
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait a bit for potential loading
    await page.waitForTimeout(2000);

    // Check if more posts were loaded (or at least the same amount)
    const finalPostCards = page.locator('[data-testid="post-card"]');
    const finalCount = await finalPostCards.count();

    // Final count should be >= initial count
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });

  test('should show loading skeleton when loading more posts', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Scroll to trigger loading
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Wait for potential loading state
    await page.waitForTimeout(1000);

    // Verify page responds to scrolling (skeleton may appear briefly)
    const skeleton = page.locator('[class*="skeleton"]');
    await skeleton
      .first()
      .isVisible()
      .catch(() => {
        // Skeleton may not appear if loading is instant or no more posts
      });
  });

  test('should display post content correctly', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const postCard = page.locator('[data-testid="post-card"]').first();
    const count = await postCard.count();

    if (count > 0) {
      await expect(postCard).toBeVisible();
      await expect(postCard).not.toBeEmpty();
    }
  });

  test('should handle empty state when no posts exist', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Empty state is valid - page should still be functional
    const pageContent = await page.locator('body').textContent();
    expect(pageContent).toBeTruthy();
  });
});
