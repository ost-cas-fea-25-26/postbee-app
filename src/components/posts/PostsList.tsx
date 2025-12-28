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
    },
  });
  const session = await getSession();

  return (
    <PostsProvider initialPosts={posts?.data ?? []}>
      <PostsListClient session={session} />
    </PostsProvider>
  );
}
