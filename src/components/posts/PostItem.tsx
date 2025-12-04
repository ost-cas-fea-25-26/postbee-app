'use client';

import { deletePost, likePost, unlikePost } from '@/actions/posts';
import { ImageView } from '@/components/core/ImageView';
import { PostItemUserInfo } from '@/components/posts/PostItemUserInfo';
import { Post } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { AppUser } from '@/lib/types';
import { textToTagsLink } from '@/lib/utils';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, IconButton, LikeButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const PostItem = ({ post, session }: { post: Post; session: AuthSession }) => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const isMyPost = post.creator?.id === session?.user?.identifier;

  return (
    <div className="grid gap-sm sm:gap-md">
      <div className="flex">
        {post.id && <PostItemUserInfo user={post.creator as AppUser} postDate={decodeULIDTimestamp(post.id)} />}
      </div>
      {post.text && (
        <div
          className="cursor-auto whitespace-pre-wrap break-all"
          dangerouslySetInnerHTML={{ __html: textToTagsLink(post.text)! }}
        />
      )}
      {post.mediaUrl && (
        <div className="grid cursor-auto place-content-center object-contain">
          <ImageView sources={[post.mediaUrl]} alt={'post-media'} />
        </div>
      )}
      {post.id && (
        <div className="flex">
          <div className="-ml-xs flex flex-wrap gap-xxs gap-y-0 sm:gap-lg" onClick={(e) => e.stopPropagation()}>
            <CommentsButton count={post.replies} disabled={!session} onClick={() => router.push(`/post/${post.id}`)} />

            <LikeButton
              count={post.likes}
              initialIsLiked={!!post.likedBySelf}
              disabled={!session}
              onLikeAdd={async () => {
                try {
                  await likePost(post.id!);
                  toast.success('Post successfully liked.');
                } catch (error) {
                  console.error('Error liking/unliking post:', error);
                  toast.error('Error liking post');
                }
              }}
              onLikeRemove={async () => {
                try {
                  if (post.likedBySelf) {
                    await unlikePost(post.id!);
                    toast.success('Post successfully unliked.');
                  }
                } catch (error) {
                  console.error('Error liking/unliking post:', error);
                  if (post.likedBySelf) {
                    toast.error('Error unliking post');
                  }
                }
              }}
            />

            <CopyButton textToCopy={`${origin}/post/${post.id ?? ''}`} />

            {isMyPost && <IconButton icon={'cancel'} onClick={() => deletePost(post.id!)} />}
          </div>
        </div>
      )}
    </div>
  );
};
