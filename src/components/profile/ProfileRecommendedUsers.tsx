import { getUnfollowedUsers } from '@/actions/followers/get';
import type { User } from '@/lib/api/client';

import { FollowingUserCard } from '../followers/FollowingUserCard';

export async function ProfileRecommendedUsers({ userId }: { userId: string }) {
  let unfollowedUsers: User[] = [];
  try {
    unfollowedUsers = await getUnfollowedUsers(userId);
  } catch {
    return <div className="text-error">Error occurred while loading the recommended Users</div>;
  }

  return unfollowedUsers.length === 0 ? (
    <div className="pb-label-md pb-sm">Congratulations, you are already following all users ;-)</div>
  ) : (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(216px,1fr))] lg:grid-cols-3">
      {unfollowedUsers.slice(0, 6).map((user) => (
        <FollowingUserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
