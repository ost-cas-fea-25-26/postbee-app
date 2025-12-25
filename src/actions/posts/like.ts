'use server';

import { throwIfError } from '@/actions/helpers';
import { deletePostsByIdLikes, putPostsByIdLikes } from '@/lib/api/client';
import { updateTag } from 'next/cache';

export async function likePost(postId: string) {
  const { data, error } = await putPostsByIdLikes({ path: { id: postId } });

  throwIfError(error);

  updateTag('posts');

  return data;
}

export async function unlikePost(postId: string) {
  const { data, error } = await deletePostsByIdLikes({
    path: {
      id: postId,
    },
  });

  throwIfError(error);

  updateTag('posts');

  return data;
}
