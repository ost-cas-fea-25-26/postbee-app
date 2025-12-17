import type { User } from '../api/client';
import { AppUser } from '../types';

export function getUserDisplayName(user: User | AppUser) {
  if (user.displayName) {
    return user.displayName;
  }

  const username = user?.username ?? '';
  const fullname = user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : undefined;

  return fullname ?? username;
}

export function getUserInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}
