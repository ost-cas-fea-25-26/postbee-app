import { Suspense } from 'react';

import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { SkeletonProfileHeader } from '@/components/skeleton';
import { getUsersById } from '@/lib/api/client';
import { getSession, isCurrentUser } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

type ProfileUser = {
  username: string;
  displayName: string;
  avatarUrl?: string;
  isMe?: boolean;
};

async function getUser(userId: string): Promise<ProfileUser> {
  const isMe = await isCurrentUser(userId);

  if (isMe) {
    const session = await getSession();
    const user = session?.user;

    if (!user) {
      notFound();
    }

    return {
      username: user.username ?? 'unknown',
      displayName: user.name ?? 'Nutzer',
      avatarUrl: user.image ?? undefined,
      isMe: true,
    };
  }

  const { data: user, error } = await getUsersById({
    path: { id: userId },
  });

  if (error || !user) {
    notFound();
  }

  return {
    username: user.username ?? 'unknown',
    displayName: user.displayName ?? 'User',
    avatarUrl: user.avatarUrl ?? undefined,
  };
}

async function ProfileLayoutAsyncWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <>
      <ProfileHeader username={user.username} displayName={user.displayName} avatarUrl={user.avatarUrl ?? ''} />
      {user.isMe && <ProfileTabs />}
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
