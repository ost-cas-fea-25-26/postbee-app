import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { SkeletonPost } from '@/components/skeleton';

async function MumblesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // TODO: if empty list show empty me profile page
  return <PostsList creators={[id]} />;
}

export default function MumblesPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<SkeletonPost count={2} />}>
      <MumblesContent params={params} />
    </Suspense>
  );
}
