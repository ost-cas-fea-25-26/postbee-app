'use client';

import { useState } from 'react';

import { AppUser } from '@/lib/types';

import { FollowingButtons } from '../followers/FollowingButtons';

export function ProfileFollowUser({ user, isFollowingInitial }: { user: AppUser; isFollowingInitial: boolean }) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);

  return (
    <div className="flex justify-end items-center gap-sm mt-md">
      {isFollowing && (
        <div className="pb-label-md text-secondary-400">You are following {user.displayName ?? 'this user'}</div>
      )}
      <FollowingButtons userId={user.id} isFollowingInitial={isFollowingInitial} onChange={setIsFollowing} />
    </div>
  );
}
