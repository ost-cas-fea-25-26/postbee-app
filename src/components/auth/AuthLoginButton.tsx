'use client';

import { useState } from 'react';

import { signinZitadel } from '@/lib/auth/auth-client';
import { HeaderButton } from '@postbee/postbee-ui-lib';

export function AuthLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      await signinZitadel();
    } finally {
      setIsLoading(false);
    }
  };

  return <HeaderButton icon="log-out" text="Login" onClick={handleLogin} loading={isLoading} />;
}
