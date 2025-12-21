import { Suspense } from 'react';

import { Heading } from '@postbee/postbee-ui-lib';

import { PostsList } from '../posts';
import { SkeletonPost } from '../skeleton';

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
