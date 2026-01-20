'use client';

import { useEffect, useRef } from 'react';

import { PostCard } from '@/components/posts/PostCard';
import { PostItem } from '@/components/posts/PostItem';
import { usePosts } from '@/components/posts/PostsProvider';
import { SkeletonPost } from '@/components/skeleton';
import { AuthSession } from '@/lib/auth/auth';

type PostsListClientProps = {
  session: AuthSession;
};

export function PostsListClient({ session }: PostsListClientProps) {
  const { posts, isLoading, hasMore, loadMore } = usePosts();
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          void loadMore();
        }
      },

      { threshold: 0.1 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-sm " data-testid="posts-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post}>
          <PostItem post={post} session={session} />
        </PostCard>
      ))}
      {isLoading && <SkeletonPost count={3} />}
      {hasMore && !isLoading && <div ref={observerTarget} className="h-4 w-full" />}
    </div>
  );
}
