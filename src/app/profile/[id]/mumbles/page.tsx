import { Suspense } from 'react';

import { getCachedPosts } from '@/actions/posts/get';
import { getUser } from '@/actions/user';
import { PostsList, PostsProvider } from '@/components/posts';
import { PostCreateRefresh } from '@/components/posts/PostCreateRefresh';
import { ProfileRecommendedMumbles } from '@/components/profile/ProfileRecommendedMumbles';
import { ProfileRecommendedUsers } from '@/components/profile/ProfileRecommendedUsers';
import { SkeletonPost } from '@/components/skeleton';
import { Heading } from '@postbee/postbee-ui-lib';

async function MumblesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  const posts = await getCachedPosts({
    query: {
      creators: [id],
    },
  });

  if (user.isMe && posts?.count === 0) {
    return (
      <div className="flex flex-col gap-md">
        <PostsProvider initialPosts={[]}>
          <PostCreateRefresh
            userDisplayName={user.displayName}
            title="So empty here! 😲"
            subtitle="Create your first Mumble or follow other users!"
          />
        </PostsProvider>
        <Heading level={3}>Recommended users</Heading>
        <Suspense fallback={<div className="pb-label-md pb-sm">Loading users ...</div>}>
          <ProfileRecommendedUsers userId={user.id} />
        </Suspense>
        <ProfileRecommendedMumbles />
      </div>
    );
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
