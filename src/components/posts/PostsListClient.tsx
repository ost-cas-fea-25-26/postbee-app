'use client';

import { PostCard } from '@/components/posts/PostCard';
import { PostItem } from '@/components/posts/PostItem';
import { usePosts } from '@/components/posts/PostsProvider';
import { AuthSession } from '@/lib/auth/auth';

type PostsListClientProps = {
  session: AuthSession;
};

export function PostsListClient({ session }: PostsListClientProps) {
  const { posts } = usePosts();

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-sm ">
      {posts.map((post) => (
        <PostCard key={post.id} post={post}>
          <PostItem post={post} session={session} />
        </PostCard>
      ))}
    </div>
  );
}
