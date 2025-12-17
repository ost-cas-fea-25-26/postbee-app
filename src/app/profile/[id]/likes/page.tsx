import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { ProfileRecommendedMumbles } from '@/components/profile/ProfileRecommendedMumbles';
import { SkeletonPost } from '@/components/skeleton';
import { getPosts } from '@/lib/api';
import { isCurrentUser } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

async function LikesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isMe = await isCurrentUser(id);

  if (!isMe) {
    notFound();
  }

  const { data: posts } = await getPosts({
    query: {
      creators: [id],
      limit: 1,
    },
  });

  if (posts?.count === 0) {
    return <ProfileRecommendedMumbles />;
  }

  return <PostsList likedBy={[id]} />;
}

export default function LikesPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<SkeletonPost count={2} />}>
      <LikesContent params={params} />
    </Suspense>
  );
}
