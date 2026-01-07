import { Suspense } from 'react';

import { getUser } from '@/actions/user';
import { PostsList, PostsProvider } from '@/components/posts';
import { PostCreateRefresh } from '@/components/posts/PostCreateRefresh';
import { ProfileRecommendedMumbles } from '@/components/profile/ProfileRecommendedMumbles';
import { ProfileRecommendedUsers } from '@/components/profile/ProfileRecommendedUsers';
import { SkeletonPost } from '@/components/skeleton';
import { getPosts } from '@/lib/api';

async function MumblesContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  const { data: posts } = await getPosts({
    query: {
      creators: [id],
    },
  });

  if (user.isMe && posts?.count === 0) {
    return (
      <div className="flex flex-col gap-md">
        <PostsProvider initialPosts={[]} userId={user.id}>
          <PostCreateRefresh
            userDisplayName={user.displayName}
            userAvatarUrl={user.avatarUrl}
            title="So empty here! 😲"
            subtitle="Create your first Mumble or follow other users!"
          />
        </PostsProvider>
        {/* use h2 with the style of h3 for the correct semantic structure */}
        <h2 className="pb-h3">Recommended users</h2>
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
