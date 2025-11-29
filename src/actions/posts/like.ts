'use server';

import { deletePostsByIdLikes, putPostsByIdLikes } from '@/lib/api/client';

export async function likePost(postId: string) {
  const res = await putPostsByIdLikes({ path: { id: postId } });

  console.log(res);

  return res.data;
}

export async function unlikePost(postId: string) {
  const res = await deletePostsByIdLikes({
    path: {
      id: postId,
    },
  });

  console.log(res);

  return res.data;
}
