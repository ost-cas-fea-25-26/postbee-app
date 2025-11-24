'use client';

import { signOut } from '@/lib/auth-client';
import { HeaderButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';

export default function AuthLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return <HeaderButton icon="log-out" text="Log out" onClick={handleLogout} />;
}
