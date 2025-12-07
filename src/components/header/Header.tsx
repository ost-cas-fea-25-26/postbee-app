import { Suspense } from 'react';

import { getSession } from '@/lib/auth/auth';
import { Logo } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

import { AuthLoginButton, AuthLogoutButton } from '../auth';
import HeaderActions from './HeaderActions';

async function Actions() {
  const session = await getSession();

  if (session) {
    return (
      <>
        <HeaderActions session={session} />
        <AuthLogoutButton />
      </>
    );
  }

  return <AuthLoginButton />;
}

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex w-full h-20 bg-primary-600 place-content-center ">
      <div className="flex w-full max-w-content justify-between mx-sm">
        <div className="grid items-center py-xs">
          <Link href="/">
            <Logo logo="white-02" width={200} height={40} className="hidden sm:block" />
            <Logo logo="white-01" width="auto" height={40} className="block sm:hidden" />
          </Link>
        </div>
        <div className="flex items-center gap-sm p-xs">
          <Suspense fallback={null}>
            <Actions />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
