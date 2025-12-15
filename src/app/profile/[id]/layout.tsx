import { Suspense } from 'react';

import { getUser } from '@/actions/user';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import { SkeletonProfileHeader } from '@/components/skeleton';

async function ProfileLayoutAsyncWrapper({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <>
      <ProfileHeader username={user.username} displayName={user.displayName} avatarUrl={user.avatarUrl ?? ''} />
      {user.isMe && (
        <div className="mt-md">
          <ProfileTabs />
        </div>
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
