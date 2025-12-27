import { Suspense } from 'react';

import { getIsUserFollowed } from '@/actions/followers';
import { getUser } from '@/actions/user';
import { ProfileFollowUser } from '@/components/profile/ProfileFollowUser';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ProfileTabs } from '@/components/profile/ProfileTabs';
import { SkeletonProfileHeader } from '@/components/skeleton';
import { getSession } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

async function ProfileLayoutAsyncWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let user;

  try {
    user = await getUser(id);
  } catch {
    notFound();
  }

  const isUserFollowed = user.isMe ? false : await getIsUserFollowed(user.id).catch(() => false);
  const session = await getSession();

  return (
    <>
      <ProfileHeader
        username={user.username}
        displayName={user.displayName}
        avatarUrl={user.avatarUrl ?? ''}
        isMe={user.isMe}
      />
      {user.isMe ? (
        <div className="mt-md">
          <ProfileTabs />
        </div>
      ) : (
        session && <ProfileFollowUser user={user} isFollowingInitial={isUserFollowed} />
      )}
    </>
  );
}

export default function ProfileLayout({ children, params }: { children: React.ReactNode; params: Promise<{ id: string }> }) {
  return (
    <section className="w-full max-w-4xl mx-auto">
      <Suspense fallback={<SkeletonProfileHeader />}>
        <ProfileLayoutAsyncWrapper params={params} />
      </Suspense>
      <div className="mt-6">{children}</div>
    </section>
  );
}
