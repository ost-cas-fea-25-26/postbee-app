'use client';

import { ComponentProps, ReactNode } from 'react';

import { Card } from '@/components/core/Card';
import { SkeletonAvatar } from '@/components/skeleton';
import { Post } from '@/lib/api/client';
import { PostVariant } from '@/lib/types';
import { getUserInitials } from '@/lib/utils';
import { Avatar } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface PostCardProps {
  children: ReactNode;
  post?: Post;
  skeleton?: boolean;
  variant?: PostVariant;
}

export const PostCard = ({ children, skeleton = false, post, variant = 'Default' }: PostCardProps) => {
  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: post?.creator?.displayName ?? '',
    src: post?.creator?.avatarUrl ?? '',
    size: variant === 'Reply' ? 'sm' : 'md',
    fallback: getUserInitials(post?.creator?.displayName ?? ''),
  };

  return (
    <div className={clsx('w-full', { 'pl-md md:pl-0': variant === 'Default' })}>
      <Card
        className={clsx({
          'hover:ring hover:ring-secondary-200': post && variant === 'Default',
          'p-0! pt-xs!': variant === 'Reply',
        })}
        data-testid="post-card"
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
    </div>
  );
};
