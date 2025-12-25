'use server';

import { throwIfError } from '@/actions/helpers';
import { getUsers, getUsersByIdFollowees, getUsersByIdFollowers } from '@/lib/api/client';
import { clientNoAuth } from '@/lib/api/clients';
import { getSession } from '@/lib/auth/auth';
import { cacheLife, cacheTag } from 'next/cache';

async function getCachedUsersByIdFollowers(userId: string) {
  'use cache';
  cacheTag('followers');
  cacheLife('hours');

  // We suppose there are not more than 100 followers per user for now
  const { data, error } = await getUsersByIdFollowers({ client: clientNoAuth, path: { id: userId }, query: { limit: 100 } });

  return { data, error };
}

export async function getIsUserFollowed(userId: string) {
  const session = await getSession();

  if (!session) {
    throw new Error('No active session found');
  }

  const { data, error } = await getCachedUsersByIdFollowers(userId);
  throwIfError(error);

  const followers = data?.data ?? [];

  return followers.some((user) => user.id === session.user.identifier);
}

// As an appropriate api call to get unfollowed users does not exist,
// we need to implement it manually here and to do so we need to fetch
// all users and the users followed by the current user.
// To prevent fetching too many users at once, we limit to 100 users
// for this project it should be enough.
export async function getUnfollowedUsers(userId: string) {
  'use cache';
  cacheTag('followers');
  cacheLife('hours');

  // Fetch all users (limited to 100)
  const allUsersResult = await getUsers({
    client: clientNoAuth,
  });
  throwIfError(allUsersResult.error);

  // Fetch users that the current user follows (limited to 100)
  const followeesResult = await getUsersByIdFollowees({
    client: clientNoAuth,
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
