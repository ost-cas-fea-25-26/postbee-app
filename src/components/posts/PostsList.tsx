import { getCachedPosts } from '@/actions/posts/get';
import { PostsProvider } from '@/components/posts/PostsProvider';
import { getSession } from '@/lib/auth/auth';

import { PostsListClient } from './PostsListClient';

type PostListProps = {
  tags?: string[];
  likedBy?: string[];
  creators?: string[];
};

export async function PostsList({ tags, likedBy, creators }: PostListProps) {
  const posts = await getCachedPosts({
    query: {
      tags,
      likedBy,
      creators,
      limit: 20,
    },
  });
  const session = await getSession();

  return (
    <PostsProvider
      initialPosts={posts?.data ?? []}
      initialPagination={posts ?? undefined}
      filters={{ tags, likedBy, creators }}
    >
      <PostsListClient session={session} />
    </PostsProvider>
  );
}
