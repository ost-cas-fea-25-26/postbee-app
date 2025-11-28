import { PostCard, PostItem } from '@/components/posts';
import { getPosts } from '@/lib/api/client/sdk.gen';

export default async function PostsList() {
  const { data: posts } = await getPosts();

  return (
    <div className="mt-xl">
      <ul>
        {posts?.data?.map((post) => (
          <PostCard key={post.id} post={post}>
            <PostItem post={post} />
          </PostCard>
        ))}
      </ul>
    </div>
  );
}
