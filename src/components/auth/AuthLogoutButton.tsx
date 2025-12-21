'use client';

import { useState } from 'react';

import { signOut } from '@/lib/auth/auth-client';
import { HeaderButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';

export default function AuthLogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return <HeaderButton icon="log-out" text="Log out" onClick={handleLogout} loading={isLoading} />;
}
