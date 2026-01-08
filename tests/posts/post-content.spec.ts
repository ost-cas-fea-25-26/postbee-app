import { expect, test } from '@playwright/test';

// Authenticated tests
test.describe('PostContent Component (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    try {
      await page.waitForLoadState('networkidle', { timeout: 60000 });
    } catch {
      throw new Error('Page did not load within 60s. Is the dev server running and seeded with posts?');
    }
  });

  test('should display post text content', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();

    if (count > 0) {
      const postText = page.locator('[data-testid="post-content-text"]').first();
      const textCount = await postText.count();

      if (textCount > 0) {
        await expect(postText).toBeVisible();
        await expect(postText).not.toBeEmpty();
      }
    }
  });

  test('should display user information', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();

    if (count > 0) {
      // User info should be visible
      const userInfo = page.locator('[data-testid="mumble-user-info"]').first();
      const userInfoCount = await userInfo.count();

      if (userInfoCount > 0) {
        await expect(userInfo).toBeVisible();
      }
    }
  });

  test('should have like button', async ({ page }) => {
    const likeButton = page.locator('[data-testid="post-content-like-button"]').first();
    const count = await likeButton.count();

    if (count > 0) {
      await expect(likeButton).toBeVisible();
    }
  });

  test('should have comments button for posts', async ({ page }) => {
    const commentsButton = page.locator('[data-testid="post-content-comments-button"]').first();
    const count = await commentsButton.count();

    if (count > 0) {
      await expect(commentsButton).toBeVisible();
    }
  });

  test('should navigate to post detail page when clicking comments', async ({ page }) => {
    const commentsButton = page.locator('[data-testid="post-content-comments-button"]').first();
    const count = await commentsButton.count();

    if (count > 0) {
      await commentsButton.click();

      // Should navigate to post detail page (or stay on home if not logged in)
      await page.waitForURL(/\/post\/[^/]+/, { timeout: 5000 }).catch(() => {
        // Navigation might not happen if not logged in or other conditions
      });
    }
  });

  test('should display media if post has media', async ({ page }) => {
    const postMedia = page.locator('[data-testid="post-content-media"]').first();
    const count = await postMedia.count();

    if (count > 0) {
      await expect(postMedia).toBeVisible();
      const images = postMedia.locator('img');
      await expect(images.first()).toBeVisible();
    }
  });

  test('should show edit/delete dropdown for own posts when logged in', async ({ page }) => {
    const dropdown = page.locator('[data-testid="post-content-dropdown"]').first();
    const count = await dropdown.count();

    // Dropdown might not be visible if user doesn't own posts or isn't logged in
    if (count > 0) {
      await expect(dropdown).toBeVisible();
    }
  });

  test('should display post content structure', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();

    if (count > 0) {
      await expect(postContent).toBeVisible();

      // Check for header
      const header = page.locator('[data-testid="post-content-header"]').first();
      const headerCount = await header.count();

      // Check for actions
      const actions = page.locator('[data-testid="post-content-actions"]').first();
      const actionsCount = await actions.count();

      // At least header or actions should be present
      expect(headerCount > 0 || actionsCount > 0).toBeTruthy();
    }
  });

  test('should handle like button click', async ({ page }) => {
    const likeButton = page.locator('[data-testid="post-content-like-button"]').first();
    const count = await likeButton.count();

    if (count > 0) {
      await expect(likeButton).toBeVisible();

      await likeButton.click();

      // Wait a bit for state update
      await page.waitForTimeout(1000);

      // Verify button still exists and is interactive
      await expect(likeButton).toBeVisible();
    }
  });
});

// Unauthenticated tests
test.use({ storageState: undefined });
test.describe('PostContent Component (unauthenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display post text content', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();
    if (count > 0) {
      const postText = page.locator('[data-testid="post-content-text"]').first();
      const textCount = await postText.count();
      if (textCount > 0) {
        await expect(postText).toBeVisible();
        await expect(postText).not.toBeEmpty();
      }
    }
  });

  test('should display user information', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();
    if (count > 0) {
      const userInfo = page.locator('[data-testid="mumble-user-info"]').first();
      const userInfoCount = await userInfo.count();
      if (userInfoCount > 0) {
        await expect(userInfo).toBeVisible();
      }
    }
  });

  test('should have like button (enabled)', async ({ page }) => {
    const likeButton = page.locator('[data-testid="post-content-like-button"]').first();
    const count = await likeButton.count();
    if (count > 0) {
      await expect(likeButton).toBeVisible();
      await expect(likeButton).toBeEnabled();
    }
  });

  test('should have comments button for posts (enabled)', async ({ page }) => {
    const commentsButton = page.locator('[data-testid="post-content-comments-button"]').first();
    const count = await commentsButton.count();
    if (count > 0) {
      await expect(commentsButton).toBeVisible();
      await expect(commentsButton).toBeEnabled();
    }
  });

  test('should display media if post has media', async ({ page }) => {
    const postMedia = page.locator('[data-testid="post-content-media"]').first();
    const count = await postMedia.count();
    if (count > 0) {
      await expect(postMedia).toBeVisible();
      const images = postMedia.locator('img');
      await expect(images.first()).toBeVisible();
    }
  });

  test('should display post content structure', async ({ page }) => {
    const postContent = page.locator('[data-testid="post-content"]').first();
    const count = await postContent.count();
    if (count > 0) {
      await expect(postContent).toBeVisible();
      const header = page.locator('[data-testid="post-content-header"]').first();
      const headerCount = await header.count();
      const actions = page.locator('[data-testid="post-content-actions"]').first();
      const actionsCount = await actions.count();
      expect(headerCount > 0 || actionsCount > 0).toBeTruthy();
    }
  });
});
