'use server';

import { postPosts } from '@/lib/api/client';

export async function createPost(text: string, media?: File) {
  const { data, error } = await postPosts({
    body: {
      text,
      media,
    },
  });

  if (error) throw error;

  return data;
}
