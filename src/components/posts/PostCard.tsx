'use client';

import { ComponentProps, ReactNode } from 'react';

import { Card } from '@/components/core/Card';
import { Skeleton } from '@/components/skeleton';
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
        })}
      >
        {skeleton ? (
          <Skeleton
            className={clsx('rounded-full  bg-secondary-200', {
              'h-10 w-10': variant === 'Reply',
              'h-[64px] w-[64px] outline-6 outline-secondary-100 ': variant === 'Default',
            })}
          />
        ) : (
          <Avatar {...avatarProps} />
        )}
      </div>
      <div className="grid gap-sm sm:gap-md">{children}</div>
    </Card>
  );
};
