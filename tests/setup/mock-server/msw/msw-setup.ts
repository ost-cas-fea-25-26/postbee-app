import { test } from '@playwright/test';

import { server } from '../../../../mock-server/server';

test.beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
test.afterEach(() => server.resetHandlers());
test.afterAll(() => server.close());
