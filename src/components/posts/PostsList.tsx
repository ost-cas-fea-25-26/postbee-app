import { getPostList } from '@/lib/api';

export default async function PostsList() {
  const posts = await getPostList();

  return (
    <div className="mt-xl">
      <h2>Latest Posts:</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
}
