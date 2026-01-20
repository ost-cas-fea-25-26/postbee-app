import AxeBuilder from '@axe-core/playwright';
import { test as base } from '@playwright/test';
import type { Page } from '@playwright/test';

type A11yFixtures = {
  makeAxeBuilder: (page: Page) => AxeBuilder;
};

export const test = base.extend<A11yFixtures>({
  // eslint-disable-next-line no-empty-pattern
  makeAxeBuilder: async ({}, use) => {
    const makeBuilder = (page: Page) => new AxeBuilder({ page });
    await use(makeBuilder);
  },
});
