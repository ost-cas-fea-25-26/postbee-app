'use server';

import { deletePostsById } from '@/lib/api/client';

export async function deletePost(id: string) {
  return await deletePostsById({
    path: {
      id,
    },
  });
}
