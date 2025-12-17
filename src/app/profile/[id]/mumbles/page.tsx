import { Suspense } from 'react';

import { getUser } from '@/actions/user';
import { PostsList } from '@/components/posts';
import { PostCreate } from '@/components/posts/PostCreate';
import { ProfileRecommendedMumbles } from '@/components/profile/ProfileRecommendedMumbles';
import { ProfileRecommendedUsers } from '@/components/profile/ProfileRecommendedUsers';
import { SkeletonPost } from '@/components/skeleton';
import { getPosts } from '@/lib/api';
import { Heading } from '@postbee/postbee-ui-lib';

async function MumblesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  if (user.isMe) {
    const { data: posts } = await getPosts({
      query: {
        creators: [id],
        limit: 1,
      },
    });

    if (posts?.count === 0) {
      return (
        <div className="flex flex-col gap-md">
          <PostCreate userDisplayName={user.displayName} />
          <Heading level={3}>Recommended users</Heading>
          <Suspense fallback={<div className="pb-label-md pb-sm">Loading users ...</div>}>
            <ProfileRecommendedUsers userId={user.id} />
          </Suspense>
          <ProfileRecommendedMumbles />
        </div>
      );
    }
  }

  return <PostsList creators={[id]} />;
}

export default function MumblesPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<SkeletonPost count={2} />}>
      <MumblesContent params={params} />
    </Suspense>
  );
}
