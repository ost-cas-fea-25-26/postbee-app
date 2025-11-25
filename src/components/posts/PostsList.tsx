import { PostCard, PostItem } from '@/components/posts';
import { getPostList } from '@/lib/api';

export default async function PostsList() {
  const posts = await getPostList();

  return (
    <div className="mt-xl">
      <ul>
        {posts.map((post) => (
          <PostCard key={post.id} post={post}>
            <PostItem post={post} />
          </PostCard>
        ))}
      </ul>
    </div>
  );
}
