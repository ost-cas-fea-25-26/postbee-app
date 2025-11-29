'use client';

import { ComponentProps, ReactNode } from 'react';

import { Card } from '@/components/core/Card';
import { Skeleton } from '@/components/skeleton';
import { Post } from '@/lib/api/client';
import { AppUser } from '@/lib/types';
import { getUserDisplayName } from '@/lib/utils';
import { Avatar } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  children: ReactNode;
  post?: Post;
  skeleton?: boolean;
}

export const PostCard = ({ children, skeleton = false, post }: PostCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (!post) return;
    router.push(`/post/${post.id}`);
  };

  const displayName = getUserDisplayName(post?.creator as AppUser);

  const avatarProps: ComponentProps<typeof Avatar> = {
    alt: displayName,
    src: post?.creator?.avatarUrl ?? '',
    size: 'md',
  };

  return (
    <Card
      className={clsx(post && 'transition-colors duration-150 hover:ring hover:ring-secondary-200')}
      data-testid="post-card"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="absolute left-[-30px] top-md">
        {skeleton ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full border-6 bordbg-secondary-100 bg-secondary-200" />
        ) : (
          <Avatar {...avatarProps} />
        )}
      </div>
      <div className="grid gap-sm sm:gap-md">{children}</div>
    </Card>
  );
};
