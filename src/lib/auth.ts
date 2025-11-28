import { cache } from 'react';

import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth } from 'better-auth/plugins';
import { headers } from 'next/headers';
import { Pool } from 'pg';

export const baseURL =
  process.env.NEXT_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`;

export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  baseURL,
  trustedOrigins: [baseURL],
  session: {
    expiresIn: 60 * 60 * 12, // 12 hours
    updateAge: 60 * 60 * 12, // 12 hours
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes
    },
  },
  plugins: [
    nextCookies(),
    genericOAuth({
      config: [
        {
          providerId: process.env.NEXT_PUBLIC_AUTH_PROVIDER_ID ?? '',
          clientId: process.env.AUTH_CLIENT_ID ?? '',
          clientSecret: process.env.AUTH_CLIENT_SECRET ?? '', // PKCE doesn't require client secret
          discoveryUrl: process.env.AUTH_DISCOVERY_URL ?? '',
          scopes: (process.env.AUTH_SCOPES ?? '')
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean),
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? '',
  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    cookiePrefix: 'better-auth',
  },
});

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const getAccessToken = cache(async () => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session?.user) {
    return null;
  }

  const token = await auth.api.getAccessToken({
    headers: reqHeaders,
    body: {
      providerId: process.env.NEXT_PUBLIC_AUTH_PROVIDER_ID ?? '',
    },
  });

  if (!token?.accessToken) {
    return null;
  }

  return token;
});
