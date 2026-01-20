import { Suspense } from 'react';

import { getUser } from '@/actions/user';
import { AuthLoginButton, AuthLogoutButton } from '@/components/auth';
import { SkeletonAvatar } from '@/components/skeleton';
import { UserSettingsButton } from '@/components/user/UserSettingsButton';
import { getSession } from '@/lib/auth/auth';
import { getUserInitials } from '@/lib/utils';
import { Avatar, HeaderButton, Logo } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

async function ProfileAvatar({ userId }: { userId: string }) {
  const user = await getUser(userId);

  return (
    <Avatar
      src={user.avatarUrl}
      size="sm"
      alt={`${user.displayName}'s avatar`}
      fallback={getUserInitials(user.displayName)}
    />
  );
}

async function Actions() {
  const session = await getSession();

  if (session) {
    const user = await getUser(session.user.identifier!);

    return (
      <>
        <Link href={`/profile/${session.user.identifier}/mumbles`} aria-label="View your profile">
          <HeaderButton title="User View">
            <Suspense fallback={<SkeletonAvatar size="sm" />}>
              <ProfileAvatar userId={session.user.identifier!} />
            </Suspense>
          </HeaderButton>
        </Link>
        <UserSettingsButton user={user} />
        <AuthLogoutButton />
      </>
    );
  }

  return <AuthLoginButton />;
}

export function Header() {
  return (
    <header className="sticky top-0 z-10 flex w-full h-20 bg-primary-600 place-content-center ">
      <div className="flex w-full max-w-content justify-between mx-sm">
        <div className="grid items-center py-xs">
          <Link href="/" aria-label="Go to Mumble homepage">
            <Logo logo="white-02" width={200} height={40} className="hidden sm:block" />
            <Logo logo="white-01" height={40} className="block sm:hidden" />
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
