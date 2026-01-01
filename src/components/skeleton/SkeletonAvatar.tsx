import clsx from 'clsx';

import { Skeleton } from '.';

interface ISkeletonAvatar {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function SkeletonAvatar({ size = 'md', className }: ISkeletonAvatar) {
  return (
    <Skeleton
      className={clsx(
        'rounded-full bg-secondary-200',
        {
          'h-10 w-10': size === 'sm',
          'h-16 w-16 outline-6 outline-secondary-100 ': size === 'md',
          'h-24 w-24 outline-6 outline-secondary-100 ': size === 'lg',
          'h-40 w-40 outline-6 outline-secondary-100 ': size === 'xl',
        },
        className,
      )}
    />
  );
}
