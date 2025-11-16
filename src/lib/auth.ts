import { cache } from 'react';

import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth } from 'better-auth/plugins';
import Database from 'better-sqlite3';
import { headers } from 'next/headers';

import { CUSTOM_PROVIDER_ID, baseURL } from './auth-client';

export const auth = betterAuth({
  database: new Database('./auth.db'),
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
          providerId: CUSTOM_PROVIDER_ID,
          clientId: '346687044958880314',
          clientSecret: '', // PKCE doesn't require client secret
          discoveryUrl: 'https://cas-fee-adv-ed1ide.zitadel.cloud/.well-known/openid-configuration',
          scopes: ['openid', 'profile', 'email', 'urn:zitadel:iam:org:project:id:346687044958814778:aud'],
          pkce: true,
        },
      ],
    }),
  ],
  secret: process.env.AUTH_SECRET ?? 'this-is-very-secret',
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
      providerId: CUSTOM_PROVIDER_ID,
    },
  });

  if (!token?.accessToken) {
    return null;
  }

  return token;
});
