import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { SkeletonPost } from '@/components/skeleton';
import { isCurrentUser } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

async function LikesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isMe = await isCurrentUser(id);

  if (!isMe) {
    notFound();
  }

  // TODO: show empty state
  return <PostsList likedBy={[id]} />;
}

export default function LikesPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<SkeletonPost count={2} />}>
      <LikesContent params={params} />
    </Suspense>
  );
}
