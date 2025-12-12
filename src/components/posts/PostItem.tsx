'use client';

import { useState } from 'react';

import { deletePost, likePost, unlikePost } from '@/actions/posts';
import { updatePost } from '@/actions/posts/update';
import { Dropdown, DropdownAction } from '@/components/core/Dropdown';
import { ImageView } from '@/components/core/ImageView';
import { PostFormData, PostItemEditDialog } from '@/components/posts/PostItemEditDialog';
import { Post } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { PostVariant } from '@/lib/types';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, LikeButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PostItemText } from './PostItemText';
import { PostItemUserInfo } from './PostItemUserInfo';

export const PostItem = ({
  post,
  session,
  variant = 'Default',
}: {
  post: Post;
  session: AuthSession;
  variant?: PostVariant;
}) => {
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
      {post.id && (
        <div className="flex items-center gap-sm">
          <PostItemUserInfo
            userId={post.creator?.id ?? ''}
            displayName={post.creator?.displayName ?? ''}
            username={post.creator?.username ?? ''}
            avatarSrc={post.creator?.avatarUrl ?? undefined}
            date={decodeULIDTimestamp(post.id)}
            variant={variant}
          />
          {isMyPost && <Dropdown actions={actions} />}
        </div>
      )}
      {post.text && <PostItemText text={post.text} />}
      {post.mediaUrl && (
        <div className="grid cursor-auto place-content-center object-contain">
          <ImageView sources={[post.mediaUrl]} alt={'post-media'} />
        </div>
      )}
      {post.id && (
        <div className="-ml-3 flex flex-wrap gap-xxs gap-y-0 sm:gap-sm">
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
