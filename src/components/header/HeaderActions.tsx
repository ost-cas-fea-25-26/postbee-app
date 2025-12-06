'use client';

import { AuthSession } from '@/lib/auth/auth';
import { Avatar, HeaderButton } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

export default function HeaderActions({ session }: { session: AuthSession }) {
  return (
    <>
      <Link href={`/profile/${session?.user.id}/mumbles`}>
        <HeaderButton title="User View">
          <Avatar src={session?.user.image ?? ''} size="sm" />
        </HeaderButton>
      </Link>
      <HeaderButton icon="settings" iconAnimation="rotate" text="Settings" />
    </>
  );
}
