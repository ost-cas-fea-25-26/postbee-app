'use server';

import { throwIfError } from '@/actions/helpers';
import { getUsers, getUsersByIdFollowees, getUsersByIdFollowers } from '@/lib/api/client';
import { getSession } from '@/lib/auth/auth';

export async function getIsUserFollowed(userId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  // We suppose there are not more than 100 followers per user for now
  const { data, error } = await getUsersByIdFollowers({ path: { id: userId }, query: { limit: 100 } });
  throwIfError(error);

  const followers = data?.data ?? [];

  return followers.some((user) => user.id === session.user.identifier);
}

export async function getUnfollowedUsers(
  userId: string,
  { offset = 0, limit = 100 }: { offset?: number; limit?: number } = {},
) {
  // Fetch all users (limited)
  const allUsersResult = await getUsers({
    query: {
      offset,
      limit,
    },
  });
  throwIfError(allUsersResult.error);

  // Fetch users that the current user follows (limited to 100)
  const followeesResult = await getUsersByIdFollowees({
    path: {
      id: userId,
    },
  });
  throwIfError(followeesResult.error);

  const allUsers = allUsersResult.data?.data ?? [];
  const followees = followeesResult.data?.data ?? [];

  // Get the IDs of users being followed
  const followeeIds = new Set(followees.map((user) => user.id));

  // Filter: exclude self and those already being followed
  const availableUsers = allUsers.filter((user) => user.id !== userId && !followeeIds.has(user.id));

  return availableUsers;
}
