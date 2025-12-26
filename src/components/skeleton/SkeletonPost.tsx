import { Fragment } from 'react';

import { PostCard } from '../posts/PostCard';
import { SkeletonPostContent } from './SkeletonPostContent';

interface ISkeletonPost {
  count?: number;
}

export function SkeletonPost({ count = 1 }: ISkeletonPost) {
  const skeleton = (
    <PostCard skeleton>
      <SkeletonPostContent />
    </PostCard>
  );

  return (
    <div className="flex flex-col gap-sm w-full">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Fragment key={i}>{skeleton}</Fragment>
        ))}
    </div>
  );
}
