'use client';

import { AuthSession } from '@/lib/auth/auth';
import { Avatar, HeaderButton } from '@postbee/postbee-ui-lib';

export default function HeaderActions({ session }: { session: AuthSession }) {
  return (
    <>
      <HeaderButton title="User View">
        <Avatar src={session?.user?.image ?? ''} size="sm" />
      </HeaderButton>
      <HeaderButton icon="settings" iconAnimation="rotate" text="Settings" />
    </>
  );
}
