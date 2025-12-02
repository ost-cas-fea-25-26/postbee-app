import { getAccessToken } from '../auth/auth';
import type { CreateClientConfig } from './client/client.gen';

export * from './client/sdk.gen';

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  auth: async () => {
    const token = await getAccessToken();

    return token?.accessToken ?? '';
  },
});
