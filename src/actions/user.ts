'use server';

import { cache } from 'react';

import { throwIfError } from '@/actions/helpers';
import { type User, getUsersById, patchUsers, putUsersAvatar } from '@/lib/api/client';
import { clientNoAuth } from '@/lib/api/clients';
import { type AuthSession, getSession } from '@/lib/auth/auth';
import { AppUser } from '@/lib/types';
import { getUserDisplayName } from '@/lib/utils/user';
import { cacheLife, cacheTag, updateTag } from 'next/cache';

type ActiveSession = NonNullable<AuthSession>;

function mapApiUserToAppUser(apiUser: User, isMe: boolean, session: ActiveSession): AppUser {
  return {
    id: apiUser.id ?? '',
    username: apiUser.username ?? '',
    displayName: getUserDisplayName(apiUser),
    avatarUrl: apiUser.avatarUrl ?? (isMe ? (session.user.image ?? '') : ''),
    firstname: apiUser.firstname ?? '',
    lastname: apiUser.lastname ?? '',
    isMe,
  };
}

function mapSessionUserToAppUser(session: ActiveSession): AppUser {
  return {
    id: session.user.identifier ?? '',
    username: session.user.username ?? '',
    displayName: session.user.name ?? '',
    avatarUrl: session.user.image ?? '',
    firstname: '',
    lastname: '',
    isMe: true,
  };
}

async function getCachedUser(userId: string) {
  'use cache';
  cacheTag('user');
  cacheLife('days');

  const { data: apiUser, error } = await getUsersById({
    client: clientNoAuth,
    path: { id: userId },
  });

  return { apiUser, error };
}

/**
 * Retrieves user information by ID with a fallback mechanism.
 *
 * This function attempts to fetch user information from the API. If a session is available,
 * it uses session data as a fallback for the current user. If no session is available,
 * it retrieves the user purely from the API.
 *
 * @param userId - The ID of the user to retrieve
 * @returns The user information as an AppUser object
 * @throws Error if the user is not found in the API and there's no session fallback
 */
export const getUser = cache(async (userId: string): Promise<AppUser> => {
  const session = await getSession();

  const activeSession: ActiveSession | null = session ?? null;
  const isMe = activeSession?.user.identifier === userId || activeSession?.user.id === userId;

  let fetchError: unknown;

  // Try to fetch user from API
  const { apiUser, error } = await getCachedUser(userId);

  if (apiUser && activeSession) {
    return mapApiUserToAppUser(apiUser, isMe, activeSession);
  } else if (apiUser) {
    // When no session, return user from API with isMe as false
    return mapApiUserToAppUser(apiUser, false, activeSession!);
  } else if (error) {
    fetchError = error;
  }

  // Fallback to session user if the current user was not found in the API and
  // it's "me"
  if (isMe && activeSession) {
    return mapSessionUserToAppUser(activeSession);
  }

  // If we reach here, the given userId is not the current user and we get an
  // error from the user API
  if (fetchError instanceof Error) {
    throw fetchError;
  }

  // Generic error
  throw new Error('User not found');
});

export async function updateUserSettings(data: { firstname?: string; lastname?: string; username?: string }) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { data: result, error } = await patchUsers({
    body: {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
    },
  });

  throwIfError(error);

  updateTag('user');

  return result;
}

export async function updateAvatar(file: File) {
  const session = await getSession();

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const { data: result, error } = await putUsersAvatar({
    body: {
      media: file,
    },
  });

  throwIfError(error);

  updateTag('user');

  return result;
}
