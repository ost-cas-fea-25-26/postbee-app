'use server';

import { throwIfError } from '@/actions/helpers';
import { putUsersByIdFollowers } from '@/lib/api';
import { getSession } from '@/lib/auth/auth';
import { updateTag } from 'next/cache';

export async function addFollower(userId: string) {
  const session = await getSession();

  // make sure you cannot folow yourself
  if (!userId || userId === session?.user?.identifier) {
    throw new Error('Invalid target');
  }

  const { error } = await putUsersByIdFollowers({
    path: { id: userId },
  });

  throwIfError(error);

  updateTag('followers');
}
