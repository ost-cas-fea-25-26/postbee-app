'use client';

import { AuthLoginButton, AuthLogoutButton } from '@/components/auth';
import { PostsList } from '@/components/posts';
import { Heading } from '@postbee/postbee-ui-lib';

export function Dashboard({ session }: { session: any }) {
  return (
    <div>
      {session?.user ? (
        <div>
          <p>
            You are logged in as {session.user?.name} ({session.user?.email}).
          </p>
          <div>
            <AuthLogoutButton />
          </div>

          <Heading level={2}>Willkommen auf Mumble</Heading>
          <Heading level={4}>Voluptatem qui cumque voluptatem quia tempora dolores distinctio vel repellat dicta.</Heading>

          <PostsList />
        </div>
      ) : (
        <div>
          <p>You are not logged in.</p>
          <div>
            <AuthLoginButton />
          </div>
        </div>
      )}
    </div>
  );
}
