import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { SkeletonPost } from '@/components/skeleton';
import { Heading } from '@postbee/postbee-ui-lib';

export function ProfileRecommendedMumbles() {
  return (
    <div className="flex flex-col gap-md">
      <Heading level={3}>Recommended Mumbles</Heading>
      <Suspense fallback={<SkeletonPost count={15} />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
