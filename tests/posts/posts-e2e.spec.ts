import { expect, test } from '@playwright/test';

test.describe('Posts E2E', () => {
  test('should create a post with content only', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('post-create-textarea').fill('E2E test post content');
    await page.getByTestId('post-create-send-button').click();
    await page.waitForTimeout(3000); // wait for post to appear
    await expect(page.getByText('E2E test post content')).toBeVisible();
  });

  test('should create a post with media', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('post-create-textarea').fill('E2E test post with media');
    await page.getByTestId('post-create-upload-button').click();
    // Simulate file upload (replace with a real file path in your repo)
    const filePath = 'tests/assets/test-image.gif';
    await page.setInputFiles('input[type="file"]', filePath);
    await page.getByTestId('upload-dialog-apply-button').click();
    await page.getByTestId('post-create-send-button').click();
    // Check for the post text
    const post = page.locator('[data-testid="post-content"]', { hasText: 'E2E test post with media' }).first();
    await expect(post).toBeVisible();
    // Check for image preview inside the correct post
    await expect(post.getByAltText('post-media')).toBeVisible();
  });

  test('should like a post', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const likeButton = page.getByTestId('post-content-like-button').first();
    await likeButton.click();
    await expect(likeButton).toHaveAttribute('aria-pressed', 'true');
  });

  test('should unlike a post', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const likeButton = page.getByTestId('post-content-like-button').first();

    // Like first
    await likeButton.click();
    await expect(likeButton).toHaveAttribute('aria-pressed', 'true');

    // Unlike
    await page.waitForTimeout(3000);
    await likeButton.click();
    await expect(likeButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('should update a post', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Open dropdown menu first
    const dropdown = page.getByTestId('post-content-dropdown').first();
    await dropdown.click();
    // Find edit button (replace with actual selector)
    const editButton = page.getByTestId('post-content-edit-action').first();
    await editButton.click();
    const textarea = page.getByTestId('post-edit-textarea');
    await textarea.fill('E2E updated post content');
    await page.getByTestId('post-edit-send-button').click();
    await expect(page.getByText('E2E updated post content')).toBeVisible();
  });

  test('should delete a post', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Open dropdown menu first
    const dropdown = page.getByTestId('post-content-dropdown').first();
    await dropdown.click();
    // Find delete button (correct selector)
    const deleteButton = page.getByTestId('post-content-delete-action').first();
    await deleteButton.click();
    await expect(page.getByText('E2E updated post content')).not.toBeVisible();
  });
});
