import { createClient, createConfig } from './client/client';
import type { ClientOptions } from './client/types.gen';
import { createClientConfigNoAuth } from './index';

/**
 * Non-authenticated client - use for public endpoints
 */
export const clientNoAuth = createClient(
  createClientConfigNoAuth(createConfig<ClientOptions>({ baseUrl: process.env.API_URL_MUMBLE })),
);
