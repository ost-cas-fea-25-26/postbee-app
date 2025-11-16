'use server';

import { getAccessToken } from '@/lib/auth';

import { PaginatedResult, Post } from './types';

const apiUrl = process.env.API_URL || 'https://qwacker-api-http-prod-927407260649.europe-west6.run.app';

function authHeader(accessToken?: string): HeadersInit {
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
}

export async function getPostList() {
  const accessToken = await getAccessToken();

  const res = await fetch(`${apiUrl}/posts`, {
    headers: {
      ...authHeader(accessToken?.accessToken),
    },
  });
  const posts = (await res.json()) as PaginatedResult<Post>;
  return posts.data;
}

export async function createPost(text: string) {
  const accessToken = await getAccessToken();
  const body = new FormData();
  body.append('text', text);

  const res = await fetch(`${apiUrl}/posts`, {
    method: 'POST',
    body,
    headers: {
      ...authHeader(accessToken?.accessToken),
    },
  });

  const post = (await res.json()) as Post;
  return post;
}
