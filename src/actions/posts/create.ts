'use server';

import { throwIfError } from '@/actions/helpers';
import { postPosts } from '@/lib/api/client';
import { updateTag } from 'next/cache';

export async function createPost(text: string, media?: File) {
  const { data, error } = await postPosts({
    body: {
      text,
      media,
    },
  });

  throwIfError(error);

  updateTag('posts');

  return data;
}
