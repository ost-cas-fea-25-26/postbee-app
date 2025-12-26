'use server';

import { getPosts, getPostsById } from '@/lib/api/client';
import { clientNoAuth } from '@/lib/api/clients';
import { cacheLife, cacheTag } from 'next/cache';

export async function getCachedPosts(options?: Parameters<typeof getPosts>[0]) {
  'use cache';
  cacheTag('posts');
  cacheLife('hours');

  const { data } = await getPosts({
    client: clientNoAuth,
    ...options,
  });

  return data;
}

export async function getCachedPostsById(postId: string) {
  'use cache';
  cacheTag('posts');
  cacheLife('hours');

  const { data } = await getPostsById({
    client: clientNoAuth,
    path: { id: postId },
  });

  return data;
}
