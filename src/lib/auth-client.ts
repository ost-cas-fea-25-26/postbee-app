import { createAuthClient } from 'better-auth/client';
import { genericOAuthClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  plugins: [genericOAuthClient()],
});

export const { signIn, signOut } = authClient;

export const signinZitadel = async () => {
  await signIn.oauth2({
    providerId: process.env.NEXT_PUBLIC_AUTH_PROVIDER_ID ?? '',
    callbackURL: '/',
  });
};
