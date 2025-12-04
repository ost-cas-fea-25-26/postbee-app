import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { PostCreate } from '@/components/posts/PostCreate';
import { SkeletonPost } from '@/components/skeleton';
import { getSession } from '@/lib/auth/auth';

interface Props {
  searchParams: Promise<{
    tags: string;
    likedBy: string;
    creators: string;
  }>;
}

export async function Dashboard({ searchParams }: Props) {
  const session = await getSession();
  const { tags, likedBy, creators } = await searchParams;

  const tagsList = Array.isArray(tags) ? tags : tags ? [tags] : undefined;
  const likeByList = Array.isArray(likedBy) ? likedBy : likedBy ? [likedBy] : undefined;
  const creatorsList = Array.isArray(creators) ? creators : creators ? [creators] : undefined;

  return (
    <div>
      {session?.user ? (
        <div className="flex flex-col items-center justify-center gap-sm mb-xl">
          <PostCreate />
          <Suspense fallback={<SkeletonPost count={15} />}>
            <PostsList tags={tagsList} likedBy={likeByList} creators={creatorsList} />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-sm mb-xl">
          <Suspense fallback={<SkeletonPost count={15} />}>
            <PostsList tags={tagsList} likedBy={likeByList} creators={creatorsList} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
