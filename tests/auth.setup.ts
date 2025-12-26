import { test as setup } from '@playwright/test';
import 'dotenv/config';
import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { dirname } from 'path';

const authFile = 'tests/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const testUsername = process.env.PLAYWRIGHT_TEST_USERNAME;
  const testPassword = process.env.PLAYWRIGHT_TEST_PASSWORD;

  if (!testUsername || !testPassword) {
    console.warn('⚠️  PLAYWRIGHT_TEST_USERNAME and PLAYWRIGHT_TEST_PASSWORD not set. Skipping authentication.');

    return;
  }

  // Create auth directory if it doesn't exist
  const authDir = dirname(authFile);
  if (!existsSync(authDir)) {
    await mkdir(authDir, { recursive: true });
  }

  // Navigate to the home page
  await page.goto('/');

  // Wait for and click the login button
  const loginButton = page.getByRole('button', { name: /login/i });
  await loginButton.waitFor({ timeout: 10000 });
  await loginButton.click();

  // Wait for the OAuth provider login page to load by waiting for username input
  const usernameInput = page
    .locator('input[name="username"], input[type="text"][autocomplete="username"], input[type="email"]')
    .first();
  await usernameInput.waitFor({ timeout: 30000 });

  // Fill in username
  await usernameInput.fill(testUsername);

  // Look for and click continue/submit button
  const continueButton = page
    .getByRole('button', { name: /continue|next|submit|login/i })
    .or(page.locator('button[type="submit"]'))
    .first();
  await continueButton.click();

  // Wait for the password field to appear
  const passwordInput = page.locator('input[name="password"], input[type="password"]').first();
  await passwordInput.waitFor({ timeout: 10000 });

  // Fill in password
  await passwordInput.fill(testPassword);

  // Submit the form
  const submitButton = page
    .getByRole('button', { name: /continue|next|submit|login|sign in/i })
    .or(page.locator('button[type="submit"]'))
    .first();
  await submitButton.click();

  // Wait for redirect back to the app (OAuth callback)
  await page.waitForURL(/\//, { timeout: 30000 });

  // Reload the page to ensure session is recognized
  await page.reload();

  // Wait for authentication to complete
  await page.waitForLoadState('networkidle');

  // Verify we're logged in by checking that login button is not visible and logout button is visible
  const logoutButton = page.getByRole('button', { name: /logout|sign out|log out/i });

  // Wait for either logout button to appear or confirm login button is gone
  await Promise.race([
    logoutButton.waitFor({ timeout: 15000 }),
    loginButton.waitFor({ state: 'hidden', timeout: 15000 }).then(() => {
      // If login button is hidden, assume logged in
      return true;
    }),
  ]).catch(() => {
    throw new Error('Authentication verification failed - user does not appear to be logged in');
  });

  // Save the authentication state
  await page.context().storageState({ path: authFile });

  console.info('✅ Authentication successful. Storage state saved.');
});
