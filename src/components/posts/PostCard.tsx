'use client';

import { ReactNode } from 'react';

import { Skeleton } from '@/components/skeleton';
import { Post } from '@/lib/api';
import { Avatar } from '@postbee/postbee-ui-lib';
import clsx from 'clsx';

interface PostCardProps {
  children: ReactNode;
  post?: Post;
  imageSrc?: string;
  skeleton?: boolean;
}

export const PostCard = ({ children, imageSrc, skeleton = false, post }: PostCardProps) => {
  return (
    <div
      data-testid="mumble-card"
      className={clsx(
        'relative h-fit w-full items-center rounded-m bg-white px-xl py-s pr-m sm:py-l sm:pr-xl',
        post && ' transition-colors duration-150 hover:ring hover:ring-base-200',
      )}
    >
      <div className="absolute left-[-30px] top-m">
        {skeleton ? (
          <Skeleton className="h-[64px] w-[64px] rounded-full border-6 border-base-100 bg-base-200" />
        ) : (
          <Avatar size="md" src={imageSrc} alt={'User Picture'} />
        )}
      </div>
      <div className="grid gap-s sm:gap-m">{children}</div>
    </div>
  );
};
