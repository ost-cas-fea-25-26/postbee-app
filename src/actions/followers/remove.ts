'use server';

import { throwIfError } from '@/actions/helpers';
import { deleteUsersByIdFollowers } from '@/lib/api';
import { updateTag } from 'next/cache';

export async function removeFollower(userId: string) {
  const { error } = await deleteUsersByIdFollowers({
    path: { id: userId },
  });

  throwIfError(error);

  updateTag('followers');
}
