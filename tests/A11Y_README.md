# Accessibility Testing with @axe-core/playwright

This project includes automated accessibility tests using `@axe-core/playwright` to ensure WCAG compliance.

## Running A11y Tests

```bash
# Run all tests including accessibility tests
npm run test:e2e

# Run only accessibility tests
npm run test:e2e -- --grep "Accessibility"

# Run with UI mode for debugging
npm run test:e2e:ui -- --grep "Accessibility"

# Run in headed mode to see the browser
npm run test:e2e:headed -- --grep "Accessibility"
```

## Writing New Accessibility Tests

Use the custom `makeAxeBuilder` fixture provided in the test setup:

```typescript
import { expect } from '@playwright/test';

import { test } from './fixtures/a11y';

test('should not have accessibility violations', async ({ page, makeAxeBuilder }) => {
  await page.goto('/your-page');

  const accessibilityScanResults = await makeAxeBuilder(page).analyze();
  expect(accessibilityScanResults.violations).toEqual([]);
});
```

## Advanced Usage

### Exclude Specific Elements

```typescript
const accessibilityScanResults = await makeAxeBuilder(page).exclude('#some-element-with-known-issues').analyze();
```

### Test Only Specific Elements

```typescript
const accessibilityScanResults = await makeAxeBuilder(page).include('#main-content').analyze();
```

### Disable Specific Rules

```typescript
const accessibilityScanResults = await makeAxeBuilder(page)
  .disableRules(['color-contrast']) // Example: temporarily disable color contrast
  .analyze();
```

### Test Only Specific WCAG Tags

```typescript
const accessibilityScanResults = await makeAxeBuilder(page)
  .withTags(['wcag2a', 'wcag2aa']) // Test only WCAG 2.0 Level A and AA
  .analyze();
```

## Current Test Coverage

- **Home Page** ([tests/a11y.spec.ts](tests/a11y.spec.ts))
  - General accessibility violations
  - Heading structure
  - Button accessibility
  - Form input labels

- **Profile Page** ([tests/profile/a11y.spec.ts](tests/profile/a11y.spec.ts))
  - Profile page accessibility
  - Profile header structure
  - Follow button accessibility

## Understanding Test Results

When a test fails, you'll see detailed information about the violations:

```
- impact: The severity (critical, serious, moderate, minor)
- description: What the violation is
- help: How to fix it
- helpUrl: Link to detailed documentation
- nodes: Which elements have the issue
```

## Resources

- [axe-core/playwright Documentation](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
