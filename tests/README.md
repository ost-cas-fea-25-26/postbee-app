# Playwright E2E Tests

This directory contains end-to-end tests for the PostBee application using Playwright.

## Setup

1. Install Playwright browsers (if not already installed):

   ```bash
   npx playwright install --with-deps chromium
   ```

2. Set up authentication environment variables:

   Create a `.env` file or set the following environment variables:
   ```bash
   PLAYWRIGHT_TEST_USERNAME=your-test-username
   PLAYWRIGHT_TEST_PASSWORD=your-test-password
   ```

   These credentials will be used to authenticate before running tests. If not set, tests will run without authentication (some tests may be skipped or behave differently).

3. Make sure your development server is running or will be started automatically:
   ```bash
   npm run dev
   ```

## Running Tests

### Run all tests

```bash
npm run test:e2e
```

### Run tests in UI mode (interactive)

```bash
npm run test:e2e:ui
```

### Run tests in headed mode (see browser)

```bash
npm run test:e2e:headed
```

### Debug tests

```bash
npm run test:e2e:debug
```

### View test report

```bash
npm run test:e2e:report
```

## Test Structure

### Posts Component Tests

- **post-card.spec.ts**: Tests for the PostCard component
  - Post card rendering
  - Accessibility attributes
  - Click interactions

- **post-create.spec.ts**: Tests for the PostCreate component
  - Form display
  - Textarea input
  - Image upload button
  - Send button
  - Form validation

- **posts-list.spec.ts**: Tests for the PostsList component
  - Post list rendering
  - Infinite scroll
  - Loading states
  - Empty states

- **post-content.spec.ts**: Tests for the PostContent/PostItem component
  - Post text display
  - User information
  - Like button functionality
  - Comments button
  - Media display
  - Edit/delete dropdown

## Configuration

Tests are configured in `playwright.config.ts` at the root of the project. The configuration includes:

- Base URL: `http://localhost:3000` (or set via `PLAYWRIGHT_TEST_BASE_URL` env variable)
- Automatic dev server startup
- Multiple browser support (Chromium, Firefox, WebKit)
- Screenshots on failure
- Trace collection on retry

## Test Helpers

Helper utilities are available in `tests/helpers/`:

- **test-data.ts**: Mock data generators for posts, users, and sessions

## Authentication

Tests are configured to authenticate before running. The authentication setup:

1. Runs automatically before all tests via the `setup` project
2. Uses OAuth flow (Zitadel) to authenticate
3. Saves the authentication state to `tests/.auth/user.json`
4. Reuses the saved state for all test runs

**Environment Variables:**
- `PLAYWRIGHT_TEST_USERNAME` - Username for test authentication
- `PLAYWRIGHT_TEST_PASSWORD` - Password for test authentication

If these variables are not set, the setup will skip authentication and tests will run without authentication.

## Notes

- Tests are designed to work with authentication (recommended)
- Some tests check for element existence before interacting (to handle empty states)
- Tests use flexible selectors to handle different UI states
- The dev server is automatically started before tests run (unless `CI` is set)
- Authentication state is cached and reused across test runs for faster execution
