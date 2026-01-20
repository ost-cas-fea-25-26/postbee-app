import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { ProfileRecommendedMumbles } from '@/components/profile/ProfileRecommendedMumbles';
import { SkeletonPost } from '@/components/skeleton';
import { getPosts } from '@/lib/api';
import { isCurrentUser } from '@/lib/auth/auth';
import { Paragraph } from '@postbee/postbee-ui-lib';
import { notFound } from 'next/navigation';

async function LikesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isMe = await isCurrentUser(id);

  if (!isMe) {
    notFound();
  }

  const { data: posts } = await getPosts({
    query: {
      likedBy: [id],
      limit: 1,
    },
  });

  if (posts?.count === 0) {
    return (
      <div className="flex flex-col gap-lg">
        <Paragraph>No liked posts found. See at the recommended mumbles below and like some to get started!</Paragraph>
        <ProfileRecommendedMumbles />
      </div>
    );
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
