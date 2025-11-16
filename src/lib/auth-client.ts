import { createAuthClient } from 'better-auth/client';
import { genericOAuthClient } from 'better-auth/client/plugins';

export const baseURL =
  process.env.NEXT_URL || process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;

export const CUSTOM_PROVIDER_ID = 'zitadel';

export const authClient = createAuthClient({
  baseURL,
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut, useSession } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: 'zitadel',
    callbackURL: '/',
  });
};
