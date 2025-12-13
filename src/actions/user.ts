'use server';

import { cache } from 'react';

import { type User, getUsersById } from '@/lib/api/client';
import { type AuthSession, getSession } from '@/lib/auth/auth';
import { AppUser } from '@/lib/types';

function getUserDisplayName(user: User) {
  if (user.displayName) {
    return user.displayName;
  }

  const username = user?.username ?? '';
  const fullname = user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : undefined;

  return fullname ?? username;
}

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

export const getUser = cache(async (userId: string): Promise<AppUser> => {
  const session = await getSession();

  if (!session) {
    throw new Error('No active session');
  }

  const activeSession: ActiveSession = session;

  const isMe = activeSession.user.identifier === userId || activeSession.user.id === userId;

  let fetchError: unknown;

  // Try to fetch user from API
  const { data: apiUser, error } = await getUsersById({
    path: { id: userId },
  });

  if (apiUser) {
    return mapApiUserToAppUser(apiUser, isMe, activeSession);
  } else if (error) {
    fetchError = error;
  }

  // Fallback to session user if the current user was not found in the API and
  // it's "me"
  if (isMe) {
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
