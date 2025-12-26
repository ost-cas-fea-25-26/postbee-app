'use server';

import { throwIfError } from '@/actions/helpers';
import { postPostsByIdReplies } from '@/lib/api/client';
import { updateTag } from 'next/cache';

export async function createPostReply(postId: string, text: string, media?: File) {
  const { data, error } = await postPostsByIdReplies({
    path: {
      id: postId,
    },
    body: {
      text,
      media,
    },
  });

  throwIfError(error);

  updateTag('posts');

  return data;
}
