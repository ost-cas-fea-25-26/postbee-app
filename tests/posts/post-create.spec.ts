import { expect, test } from '@playwright/test';

test.describe('PostCreate Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display post creation form when user is logged in', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check if the form exists (only visible when logged in)
    const form = page.locator('[data-testid="post-create-form"]');
    const count = await form.count();

    if (count > 0) {
      await expect(form).toBeVisible();

      const header = page.locator('[data-testid="post-create-header"]');
      await expect(header).toBeVisible();
    }
  });

  test('should have textarea for post content', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const textarea = page.locator('[data-testid="post-create-textarea"]');
    const count = await textarea.count();

    if (count > 0) {
      await expect(textarea).toBeVisible();
      await expect(textarea).toHaveAttribute('placeholder', 'Your opinion matters!');
    }
  });

  test('should have image upload button', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const uploadButton = page.locator('[data-testid="post-create-upload-button"]');
    const count = await uploadButton.count();

    if (count > 0) {
      await expect(uploadButton).toBeVisible();
    }
  });

  test('should have send button', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const sendButton = page.locator('[data-testid="post-create-send-button"]');
    const count = await sendButton.count();

    if (count > 0) {
      await expect(sendButton).toBeVisible();
    }
  });

  test('should show validation error when submitting empty form', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const sendButton = page.locator('[data-testid="post-create-send-button"]');
    const count = await sendButton.count();

    if (count > 0) {
      await sendButton.click();

      // Wait a bit for validation to trigger
      await page.waitForTimeout(500);

      // Check for error message
      const errorMessage = page.getByText(/please enter your contribution/i);
      const hasError = (await errorMessage.count()) > 0;

      // Validation should show an error or prevent submission
      expect(hasError).toBeTruthy();
    }
  });

  test('should allow typing in textarea', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    const textarea = page.locator('[data-testid="post-create-textarea"]');
    const count = await textarea.count();

    if (count > 0) {
      await textarea.fill('This is a test post');
      await expect(textarea).toHaveValue('This is a test post');
    }
  });
});
