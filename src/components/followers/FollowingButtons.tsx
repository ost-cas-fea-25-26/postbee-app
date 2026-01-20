'use client';
import { useState, useTransition } from 'react';

import { addFollower, removeFollower } from '@/actions/followers';
import { Button } from '@postbee/postbee-ui-lib';
import { toast } from 'sonner';

export function FollowingButtons({
  userId,
  isFollowingInitial = false,
  fullWidth = false,
  onChange,
}: {
  userId: string;
  isFollowingInitial?: boolean;
  isFollowingPrependText?: string;
  fullWidth?: boolean;
  onChange?: (isFollowing: boolean) => void;
}) {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [isPending, startTransition] = useTransition();

  function handleFollow() {
    startTransition(async () => {
      try {
        await addFollower(userId);
        setIsFollowing(true);
        onChange?.(true);
      } catch {
        toast.error('Failed to follow user');
      }
    });
  }

  function handleUnfollow() {
    startTransition(async () => {
      try {
        await removeFollower(userId);
        setIsFollowing(false);
        onChange?.(false);
      } catch {
        toast.error('Failed to unfollow user');
      }
    });
  }

  return isFollowing ? (
    <Button fullWidth={fullWidth} variant="secondary" icon="cancel" loading={isPending} onClick={handleUnfollow}>
      Unfollow
    </Button>
  ) : (
    <Button fullWidth={fullWidth} variant="primary" icon="mumble" loading={isPending} onClick={handleFollow}>
      Follow
    </Button>
  );
}
