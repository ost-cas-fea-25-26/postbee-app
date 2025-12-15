'use client';

import { PostContent } from '@/components/posts/PostContent';
import { usePosts } from '@/components/posts/PostsProvider';
import { Post } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { PostVariant } from '@/lib/types';

export const PostItem = ({
  post,
  session,
  variant = 'Default',
}: {
  post: Post;
  session: AuthSession;
  variant?: PostVariant;
}) => {
  const { updatePost, deletePost } = usePosts();

  return <PostContent post={post} session={session} variant={variant} onUpdate={updatePost} onDelete={deletePost} />;
};
