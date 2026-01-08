import { getAccessToken } from '@/lib/auth/auth';

import type { CreateClientConfig } from './client/client.gen';

export * from './client/sdk.gen';

/**
 * Client configuration with authentication token
 * Use this for requests that require authorization
 */
export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseUrl: process.env.API_URL_MUMBLE,
  auth: async () => {
    const token = await getAccessToken();

    return token?.accessToken ?? '';
  },
});

/**
 * Client configuration without authentication
 * Use this for cacheable requests that don't require authorization
 */
export const createClientConfigNoAuth: CreateClientConfig = (config) => ({
  ...config,
});
