import { AppUser } from '@/lib/types';

export const getUserDisplayName = (user: AppUser) => {
  const username = user?.username ?? '';
  return user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : user?.name ? user.name : username;
};
