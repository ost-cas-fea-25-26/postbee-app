import { getSession } from '@/lib/auth';
import Link from 'next/link';

import { AuthLoginButton, AuthLogoutButton } from '../auth';
import { Logo } from '../postbee-ui-client';
import HeaderActions from './HeaderActions';

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-10 flex w-full h-20 bg-primary-600 place-content-center ">
      <div className="flex w-full max-w-content justify-between mx-sm">
        <div className="grid items-center py-xs">
          <Link href="/">
            <Logo logo="white-02" width={200} height={40} />
          </Link>
        </div>
        <div className="flex items-center gap-sm p-xs">
          {session ? (
            <>
              <HeaderActions session={session} />
              <AuthLogoutButton />
            </>
          ) : (
            <AuthLoginButton />
          )}
        </div>
      </div>
    </header>
  );
}
