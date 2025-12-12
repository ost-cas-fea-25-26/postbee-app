import { AppUser } from '@/lib/types';

export const getUserDisplayName = (user: AppUser) => {
  const username = user?.username ?? '';

  return (
    user?.displayName ??
    (user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : user?.name ? user.name : username)
  );
};

export function getUserInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .slice(0, 2)
    .join('');
}
