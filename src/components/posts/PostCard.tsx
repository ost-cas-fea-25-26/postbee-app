'use client';

import { ComponentProps, ReactNode } from 'react';

import { Card } from '@/components/core/Card';
import { SkeletonAvatar } from '@/components/skeleton';
import { Post } from '@/lib/api/client';
import { AppUser, PostVariant } from '@/lib/types';
import { getUserDisplayName } from '@/lib/utils';
import { Avatar } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface PostCardProps {
  children: ReactNode;
  post?: Post;
  skeleton?: boolean;
  variant?: PostVariant;
}

export const PostCard = ({ children, skeleton = false, post, variant = 'Default' }: PostCardProps) => {
  const displayName = getUserDisplayName(post?.creator as AppUser);

  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: displayName,
    src: post?.creator?.avatarUrl ?? '',
    size: variant === 'Reply' ? 'sm' : 'md',
  };

  return (
    <Card
      className={clsx({
        'hover:ring hover:ring-secondary-200': post && variant === 'Default',
        'p-0! pt-xs!': variant === 'Reply',
      })}
      data-testid="post-card"
      role="button"
      tabIndex={0}
    >
      <div
        className={clsx('absolute', {
          'left-[-30px] top-md': variant === 'Default',
          'z-10': variant === 'Reply', // to overlap the avatar of the UserInfo
        })}
      >
        {skeleton ? (
          <SkeletonAvatar size={variant === 'Reply' ? 'sm' : 'md'} />
        ) : (
          variant === 'Default' && <Avatar {...avatarProps} />
        )}
      </div>
      <div className="grid gap-sm sm:gap-md">{children}</div>
    </Card>
  );
};
