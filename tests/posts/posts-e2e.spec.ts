import { createClient } from '@mocky-balboa/playwright';
import { expect, test } from '@playwright/test';

// Assumes mock server and app are running, and test user is authenticated

test.describe('Posts E2E', () => {
  // test('clear', async ({ page, mocky }) => {
  //   // Mock delete post endpoint
  //   mocky.route(
  //     '**/posts/*',
  //     (route) => {
  //       route.fulfill({ status: 200, contentType: 'application/json', body: '{}' });
  //     },
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   while ((await page.getByTestId('post-content-dropdown').count()) > 0) {
  //     const dropdown = page.getByTestId('post-content-dropdown').first();
  //     await dropdown.click();
  //     const deleteButton = page.getByTestId('post-content-delete-action').first();
  //     await deleteButton.click();
  //     await page.waitForTimeout(500);
  //   }
  // });

  test('should create a post with content only', async ({ page, context }) => {
    const mocky = await createClient(context);

    // Mock create post endpoint
    mocky.route(
      '**/posts',
      (route) =>
        route.fulfill({
          status: 201,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: '1', content: 'E2E test post content' }),
        }),
      // { type: 'both' },
    );
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.getByTestId('post-create-textarea').fill('E2E test post content');
    await page.getByTestId('post-create-send-button').click();
    await page.waitForTimeout(3000);
    await expect(page.getByText('E2E test post content')).toBeVisible();
  });
  // test('should create a post with media', async ({ page }) => {
  //   const mocky = createClient();
  //   // Mock create post with media endpoint
  //   mocky.route(
  //     '**/posts',
  //     (route) =>
  //       route.fulfill({
  //         status: 201,
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ id: '2', content: 'E2E test post with media', media: 'test-image.gif' }),
  //       }),
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   await page.getByTestId('post-create-textarea').fill('E2E test post with media');
  //   await page.getByTestId('post-create-upload-button').click();
  //   const filePath = 'tests/assets/test-image.gif';
  //   await page.setInputFiles('input[type="file"]', filePath);
  //   await page.getByTestId('upload-dialog-apply-button').click();
  //   await page.getByTestId('post-create-send-button').click();
  //   const post = page.locator('[data-testid="post-content"]', { hasText: 'E2E test post with media' }).first();
  //   await expect(post).toBeVisible();
  //   await expect(post.getByAltText('post-media')).toBeVisible();
  // });

  // test('should like a post', async ({ page, mocky }) => {
  //   // Mock like endpoint
  //   mocky.route(
  //     '**/posts/*/like',
  //     (route) => route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json' }, body: '{}' }),
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   const likeButton = page.getByTestId('post-content-like-button').first();
  //   await likeButton.click();
  //   await expect(likeButton).toHaveAttribute('aria-pressed', 'true');
  // });

  // test('should unlike a post', async ({ page, mocky }) => {
  //   // Mock unlike endpoint
  //   mocky.route(
  //     '**/posts/*/like',
  //     (route) => route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json' }, body: '{}' }),
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   const likeButton = page.getByTestId('post-content-like-button').first();
  //   await likeButton.click();
  //   await likeButton.click();
  //   await expect(likeButton).toHaveAttribute('aria-pressed', 'false');
  // });

  // test('should update a post', async ({ page, mocky }) => {
  //   // Mock update endpoint
  //   mocky.route(
  //     '**/posts/*',
  //     (route) =>
  //       route.fulfill({
  //         status: 200,
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({ id: '1', content: 'E2E updated post content' }),
  //       }),
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   const dropdown = page.getByTestId('post-content-dropdown').first();
  //   await dropdown.click();
  //   const editButton = page.getByTestId('post-content-edit-action').first();
  //   await editButton.click();
  //   const textarea = page.getByTestId('post-edit-textarea');
  //   await textarea.fill('E2E updated post content');
  //   await page.getByTestId('post-edit-send-button').click();
  //   await expect(page.getByText('E2E updated post content')).toBeVisible();
  // });

  // test('should delete a post', async ({ page, mocky }) => {
  //   // Mock delete endpoint
  //   mocky.route(
  //     '**/posts/*',
  //     (route) => route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json' }, body: '{}' }),
  //     { type: 'both' },
  //   );
  //   await page.goto('/');
  //   await page.waitForLoadState('networkidle');
  //   const dropdown = page.getByTestId('post-content-dropdown').first();
  //   await dropdown.click();
  //   const deleteButton = page.getByTestId('post-content-delete-action').first();
  //   await deleteButton.click();
  //   await expect(page.getByText('E2E updated post content')).not.toBeVisible();
  // });
});
