'use client';

import { ComponentProps } from 'react';

import { PostCreate } from '@/components/posts/PostCreate';
import { useRouter } from 'next/navigation';

type PostCreateBaseProps = ComponentProps<typeof PostCreate>;
type PostCreateRefreshProps = Omit<PostCreateBaseProps, 'onAddPost'>;

export function PostCreateRefresh(props: PostCreateRefreshProps) {
  const router = useRouter();

  return (
    <PostCreate
      {...props}
      onAddPost={() => {
        router.refresh();
      }}
    />
  );
}
