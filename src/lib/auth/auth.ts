import { cache } from 'react';

import { OAuthProfile } from '@/lib/auth/auth-client';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth } from 'better-auth/plugins';
import { headers } from 'next/headers';

export type AuthSession = Awaited<ReturnType<typeof auth.api.getSession>>;

export type AuthUser = {
  id: string;
  identifier: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export const auth = betterAuth({
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days cache duration
      strategy: 'jwt', // can be "jwt" or "compact"
      refreshCache: true, // Enable stateless refresh
    },
  },
  account: {
    storeStateStrategy: 'cookie',
    storeAccountCookie: true, // Store account data after OAuth flow in a cookie (useful for database-less flows)
  },
  user: {
    additionalFields: {
      identifier: {
        type: 'string',
        required: false,
        defaultValue: '',
        input: false,
      },
      username: {
        type: 'string',
        required: false,
        defaultValue: '',
        input: false,
      },
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
          // @ts-expect-error Profile type seams not to match
          mapProfileToUser: (profile: OAuthProfile) => {
            return {
              identifier: profile.sub,
              username: profile.preferred_username,
            };
          },
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

export async function isCurrentUser(userId: string) {
  const session = await getSession();

  return !!session && session.user.id === userId;
}
