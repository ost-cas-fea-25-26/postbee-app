import { getCachedPosts } from '@/actions/posts/get';
import PostsList from '@/components/posts/PostsList';
import { PostsProvider } from '@/components/posts/PostsProvider';
import { getSession } from '@/lib/auth/auth';

type PostListProps = {
  tags?: string[];
  likedBy?: string[];
  creators?: string[];
};

export default async function Posts({ tags, likedBy, creators }: PostListProps) {
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
      <PostsList session={session} />
    </PostsProvider>
  );
}
