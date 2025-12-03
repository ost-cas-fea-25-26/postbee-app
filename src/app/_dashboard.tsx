import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { PostCreate } from '@/components/posts/PostCreate';
import { getSession } from '@/lib/auth/auth';

export async function Dashboard() {
  const session = await getSession();

  return (
    <div>
      {session?.user ? (
        <div className="flex flex-col items-center justify-center gap-4 mb-xl">
          <PostCreate />
          <Suspense fallback={<p>Loading posts...</p>}>
            <PostsList />
          </Suspense>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mb-xl">
          <Suspense fallback={<p>Loading posts...</p>}>
            <PostsList />
          </Suspense>
        </div>
      )}
    </div>
  );
}
