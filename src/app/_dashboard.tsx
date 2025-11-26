import { PostsList } from '@/components/posts';

export function Dashboard({ session }: { session: any }) {
  return (
    <div>
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>

          <PostsList />
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
        </div>
      )}
    </div>
  );
}
