'use client';

import { signOut } from '@/lib/auth-client';
import { Button } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <Button onClick={handleLogout} variant="secondary">
      Logout
    </Button>
  );
}
