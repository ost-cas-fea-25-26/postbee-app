import { expect, test } from '@playwright/test';

// Assumes mock server and app are running, and test user is authenticated

test.describe('Posts E2E', () => {
  //   test.beforeEach(async ({ page }) => {
  //     await page.goto('/');
  //     await page.waitForLoadState('networkidle');
  //     // Delete all posts containing the dropdown (i.e., posts owned by the test user)
  //     while ((await page.getByTestId('post-content-dropdown').count()) > 0) {
  //       const dropdown = page.getByTestId('post-content-dropdown').first();
  //       await dropdown.click();
  //       const deleteButton = page.getByTestId('post-content-delete-action').first();
  //       await deleteButton.click();
  //       // If a confirmation dialog appears, handle it (uncomment if needed)
  //       // await page.getByRole('button', { name: /confirm/i }).click();
  //       // Wait for the post to be removed from the DOM
  //       await page.waitForTimeout(500); // Adjust as needed for UI update
  //     }
  //   });
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
    await expect(page.getByText('E2E test post with media')).toBeVisible();
    // Optionally check for image preview
    await expect(page.getByAltText('post-media-create')).toBeVisible();
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
    // Unlike
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
    // Confirm delete (replace with actual selector if needed)
    // await page.getByRole('button', { name: /confirm/i }).click();
    await expect(page.getByText('E2E updated post content')).not.toBeVisible();
  });
});
