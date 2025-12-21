'use server';

import { throwIfError } from '@/actions/helpers';
import { deleteUsersByIdFollowers } from '@/lib/api';

export async function removeFollower(userId: string) {
  const { error } = await deleteUsersByIdFollowers({
    path: { id: userId },
  });

  throwIfError(error);
}
