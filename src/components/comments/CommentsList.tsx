'use client';

import { useComments } from '@/components/comments/CommentsProvider';
import { PostCard } from '@/components/posts/PostCard';
import { AuthSession } from '@/lib/auth/auth';

import { CommentItem } from './CommentItem';

type CommentsListClientProps = {
  session: AuthSession;
};

export function CommentsList({ session }: CommentsListClientProps) {
  const { comments } = useComments();

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-sm">
      {comments.map((comment) => (
        <PostCard key={comment.id} post={comment} variant="Reply">
          <CommentItem comment={comment} session={session} />
        </PostCard>
      ))}
    </div>
  );
}
