'use client';

import { useState } from 'react';

import { deletePost, likePost, unlikePost } from '@/actions/posts';
import { updatePost } from '@/actions/posts/update';
import { Dropdown, DropdownAction } from '@/components/core/Dropdown';
import { ImageView } from '@/components/core/ImageView';
import { PostFormData, PostItemEditDialog } from '@/components/posts/PostItemEditDialog';
import { PostItemUserInfo } from '@/components/posts/PostItemUserInfo';
import { Post } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { textToTagsLink } from '@/lib/utils';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, LikeButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export const PostItem = ({ post, session }: { post: Post; session: AuthSession }) => {
  const router = useRouter();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const isMyPost = post.creator?.id === session?.user?.identifier;

  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const actions: DropdownAction[] = [
    {
      label: 'Edit',
      onSelect: () => setEditDialogOpen(true),
      icon: 'edit',
    },
    {
      label: 'Delete',
      onSelect: async () => {
        console.warn('Delete clicked for post', post.id);
        try {
          await deletePost(post.id!);
          toast.success('Post deleted');
          router.refresh();
        } catch (error) {
          console.error('Error deleting post', error);
          toast.error('Failed to delete post');
        }
      },
      icon: 'cancel',
      variant: 'error',
    },
  ];

  const handleEditSubmit = async (data: PostFormData) => {
    try {
      await updatePost(post.id!, data.postContent, data.mediaRemoved ? null : data.media);
      toast.success('Post updated');
      router.refresh();
    } catch (error) {
      console.error('Error updating post', error);
      toast.error('Failed to update post');
    }
  };

  return (
    <div className="grid gap-sm sm:gap-md">
      <div className="flex">
        {post.id && (
          <PostItemUserInfo
            displayName={post.creator?.displayName ?? ''}
            username={post.creator?.username ?? ''}
            postDate={decodeULIDTimestamp(post.id)}
            trailing={isMyPost ? <Dropdown actions={actions} /> : null}
          />
        )}
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
          </div>
        </div>
      )}
      {post.id && (
        <PostItemEditDialog
          open={editDialogOpen}
          initialContent={post.text ?? ''}
          initialMedia={post.mediaUrl}
          onClose={() => setEditDialogOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};
