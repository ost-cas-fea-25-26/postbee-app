'use client';

import { Card } from '@/components/core/Card';
import { IconLabel } from '@/components/core/IconLabel';
import { FollowingButtons } from '@/components/followers/FollowingButtons';
import type { User } from '@/lib/api/client';
import { getUserDisplayName, getUserInitials } from '@/lib/utils';
import { Avatar } from '@postbee/postbee-ui-lib';
import Link from 'next/link';

export function FollowingUserCard({ user, isFollowingInitial = false }: { user: User; isFollowingInitial?: boolean }) {
  const displayName = getUserDisplayName(user);

  return (
    <Card className="flex flex-col items-center bg-white rounded-lg gap-sm !p-md text-center">
      <Link href={`/profile/${user.id}/mumbles`} className="contents *:cursor-pointer" prefetch={false}>
        <Avatar
          size="lg"
          src={user.avatarUrl ?? ''}
          alt={`${displayName}'s avatar`}
          fallback={getUserInitials(displayName ?? '')}
        />
        <div className="pt-xxs">
          <div className="pb-label-lg pb-xxs">{displayName}</div>
          <IconLabel colorClassName="text-primary" icon="profile">
            {user.username ?? ''}
          </IconLabel>
        </div>
      </Link>
      <FollowingButtons fullWidth userId={user.id!} isFollowingInitial={isFollowingInitial} />
    </Card>
  );
}
