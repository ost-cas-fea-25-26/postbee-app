import { PostCard, PostItem } from '@/components/posts';
import { getPosts } from '@/lib/api/client/sdk.gen';
import { getSession } from '@/lib/auth/auth';

type PostListProps = {
  tags?: string[];
  likedBy?: string[];
  creators?: string[];
};

export default async function PostsList({ tags, likedBy, creators }: PostListProps) {
  const { data: posts } = await getPosts({
    query: {
      tags,
      likedBy,
      creators,
    },
  });
  const session = await getSession();

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-sm ">
      {posts?.data?.map((post) => (
        <PostCard key={post.id} post={post}>
          <PostItem post={post} session={session} />
        </PostCard>
      ))}
    </div>
  );
}
