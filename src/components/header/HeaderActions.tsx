'use client';

import { AuthSession } from '@/lib/auth/auth';
import { getUserInitials } from '@/lib/utils';
import { Avatar, HeaderButton } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

export default function HeaderActions({ session }: { session: AuthSession }) {
  return (
    <>
      <Link href={`/profile/${session?.user.identifier}/mumbles`}>
        <HeaderButton title="User View">
          <Avatar src={session?.user.image ?? ''} size="sm" fallback={getUserInitials(session?.user.name ?? '')} />
        </HeaderButton>
      </Link>
      <HeaderButton icon="settings" iconAnimation="rotate" text="Settings" />
    </>
  );
}
