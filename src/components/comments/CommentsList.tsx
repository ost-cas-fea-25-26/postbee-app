import { PostCard, PostItem } from '@/components/posts';
import { getPostsByIdReplies } from '@/lib/api/client/sdk.gen';
import { getSession } from '@/lib/auth/auth';

export default async function CommentsList({ postId }: { postId: string }) {
  const { data: postReplies } = await getPostsByIdReplies({ path: { id: postId } });
  const session = await getSession();

  return (
    <div className="flex h-fit w-full max-w-full flex-col items-center justify-center gap-sm ">
      {postReplies?.data?.map((reply) => (
        <PostCard key={reply.id} post={reply}>
          <PostItem post={reply} session={session} />
        </PostCard>
      ))}
    </div>
  );
}
