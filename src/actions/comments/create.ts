'use server';

import { postPostsByIdReplies } from '@/lib/api/client';

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

  if (error) throw error;

  return data;
}
