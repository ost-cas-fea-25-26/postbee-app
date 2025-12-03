import { PostCard, PostItem } from '@/components/posts';
import { getPosts } from '@/lib/api/client/sdk.gen';
import { getSession } from '@/lib/auth/auth';

export default async function PostsList() {
  const { data: posts } = await getPosts();
  const session = await getSession();

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-4 ">
      {posts?.data?.map((post) => (
        <PostCard key={post.id} post={post}>
          <PostItem post={post} session={session} />
        </PostCard>
      ))}
    </div>
  );
}
