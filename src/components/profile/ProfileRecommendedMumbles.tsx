import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { SkeletonPost } from '@/components/skeleton';

export function ProfileRecommendedMumbles() {
  return (
    <div className="flex flex-col gap-md">
      {/* use h2 with the style of h3 for the correct semantic structure */}
      <h2 className="pb-h3">Recommended Mumbles</h2>
      <Suspense fallback={<SkeletonPost count={15} />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
