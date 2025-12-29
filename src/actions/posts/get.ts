'use server';

import { throwIfError } from '@/actions/helpers';
import { PostPaginatedResult, getPosts, getPostsById } from '@/lib/api/client';
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

export async function getMorePosts(params: {
  tags?: string[];
  likedBy?: string[];
  creators?: string[];
  offset: number;
  limit?: number;
}): Promise<PostPaginatedResult | undefined> {
  const { data, error } = await getPosts({
    query: {
      tags: params.tags,
      likedBy: params.likedBy,
      creators: params.creators,
      offset: params.offset,
      limit: params.limit ?? 20,
    },
  });

  throwIfError(error);

  return data;
}
