'use server';

import { deletePostsById } from '@/lib/api/client';

export async function deletePost(id: string) {
  const { data, error } = await deletePostsById({
    path: {
      id,
    },
  });

  if (error) throw error;

  return data;
}
