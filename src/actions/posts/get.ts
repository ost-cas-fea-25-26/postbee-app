'use server';

import { throwIfError } from '@/actions/helpers';
import { PostPaginatedResult, getPosts } from '@/lib/api/client';

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
