'use client';

import { signinZitadel } from '@/lib/auth-client';
import { Button } from '@postbee/postbee-ui-lib';

export default function AuthLoginButton() {
  return (
    <Button onClick={() => signinZitadel()} variant="primary">
      Login with Zitadel
    </Button>
  );
}
