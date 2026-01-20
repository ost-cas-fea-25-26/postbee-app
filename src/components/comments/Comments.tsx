import { ReactNode } from 'react';

import { CommentsList } from '@/components/comments/CommentsList';
import { CommentsProvider } from '@/components/comments/CommentsProvider';
import { getPostsByIdReplies } from '@/lib/api/client/sdk.gen';
import { getSession } from '@/lib/auth/auth';

export async function Comments({ postId, children }: { postId: string; children?: ReactNode }) {
  const { data: postReplies } = await getPostsByIdReplies({ path: { id: postId } });
  const session = await getSession();

  return (
    <CommentsProvider initialComments={postReplies?.data ?? []}>
      {children}
      <CommentsList session={session} />
    </CommentsProvider>
  );
}
