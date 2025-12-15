'use client';

import { useComments } from '@/components/comments/CommentsProvider';
import { PostContent } from '@/components/posts/PostContent';
import { Reply } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';

export const CommentItem = ({ comment, session }: { comment: Reply; session: AuthSession }) => {
  const { updateComment, deleteComment } = useComments();

  return (
    <PostContent
      post={comment}
      session={session}
      variant="Reply"
      onUpdate={(id, data) => updateComment(id, data as Partial<Reply>)}
      onDelete={deleteComment}
    />
  );
};
