'use client';

import { signinZitadel } from '@/lib/auth/auth-client';
import { HeaderButton } from '@postbee/postbee-ui-lib';

export default function AuthLoginButton() {
  return <HeaderButton icon="log-out" text="Login" onClick={() => signinZitadel()} />;
}
