'use server';

import { postPosts } from '@/lib/api/client';

export async function createPost(text: string, media?: File) {
  return await postPosts({
    body: {
      text,
      media,
    },
  });
}
