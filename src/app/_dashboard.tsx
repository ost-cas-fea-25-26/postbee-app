import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { PostCreate } from '@/components/posts/PostCreate';
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
        <div className="flex flex-col items-center justify-center gap-4 mb-xl">
          <PostCreate />
          <Suspense fallback={<p>Loading posts...</p>}>
            <PostsList tags={tagsList} likedBy={likeByList} creators={creatorsList} />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mb-xl">
          <Suspense fallback={<p>Loading posts...</p>}>
            <PostsList tags={tagsList} likedBy={likeByList} creators={creatorsList} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
