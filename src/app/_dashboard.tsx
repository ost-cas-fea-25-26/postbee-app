import { Suspense } from 'react';

import { PostsList } from '@/components/posts';
import { getSession } from '@/lib/auth';

export async function Dashboard() {
  const session = await getSession();

  return (
    <div>
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>

          <Suspense fallback={<p>Loading posts...</p>}>
            <PostsList />
          </Suspense>
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )}
    </div>
  );
}
