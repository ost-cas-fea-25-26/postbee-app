import { PostsProvider } from '@/components/posts/PostsProvider';
import { getPosts } from '@/lib/api/client/sdk.gen';
import { getSession } from '@/lib/auth/auth';

import { PostsListClient } from './PostsListClient';

type PostListProps = {
  tags?: string[];
  likedBy?: string[];
  creators?: string[];
};

export async function PostsList({ tags, likedBy, creators }: PostListProps) {
  const { data: posts } = await getPosts({
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
