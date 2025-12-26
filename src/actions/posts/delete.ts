'use server';

import { throwIfError } from '@/actions/helpers';
import { deletePostsById } from '@/lib/api/client';
import { updateTag } from 'next/cache';

export async function deletePost(id: string) {
  const { data, error } = await deletePostsById({
    path: {
      id,
    },
  });

  throwIfError(error);

  updateTag('posts');

  return data;
}
