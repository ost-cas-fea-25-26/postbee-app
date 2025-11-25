'use client';

import { Post } from '@/lib/api';

export const PostItem = ({ post }: { post: Post }) => {
  return <pre>{JSON.stringify(post, null, 2)}</pre>;
};
