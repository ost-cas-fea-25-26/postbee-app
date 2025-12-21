'use client';

import { useState } from 'react';

import { deletePost as deletePostAction, likePost, unlikePost } from '@/actions/posts';
import { updatePost as updatePostAction } from '@/actions/posts/update';
import { Dropdown, DropdownAction } from '@/components/core/Dropdown';
import { ImageView } from '@/components/core/ImageView';
import { PostFormData, PostItemEditDialog } from '@/components/posts/PostItemEditDialog';
import { Post, Reply } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { PostVariant } from '@/lib/types';
import { getSanitizedHTML, textToTagsLink } from '@/lib/utils';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, LikeButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PostItemUserInfo } from './PostItemUserInfo';

type PostItemSharedProps = {
  post: Post | Reply;
  session: AuthSession;
  variant?: PostVariant;
  onUpdate?: (id: string, updatedData: Partial<Post | Reply>) => void;
  onDelete?: (id: string) => void;
};

export const PostContent = ({ post, session, variant = 'Default', onUpdate, onDelete }: PostItemSharedProps) => {
  const router = useRouter();

  const isVariantReply = variant === 'Reply';

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
        try {
          await deletePostAction(post.id!);
          if (onDelete) {
            onDelete(post.id!);
          }
          toast.success(isVariantReply ? 'Comment deleted' : 'Post deleted');
          router.refresh();
        } catch (error: unknown) {
          console.error('Error deleting post', error);
          toast.error('Failed to delete post');
          router.refresh();
        }
      },
      icon: 'cancel',
      variant: 'error',
    },
  ];

  const handleEditSubmit = async (data: PostFormData) => {
    const updatedData = {
      text: data.postContent,
      mediaUrl: data.mediaRemoved ? null : typeof data.media === 'string' ? data.media : (post.mediaUrl ?? null),
    };

    // Optimistic update
    if (onUpdate) {
      onUpdate(post.id!, updatedData);
    }
    toast.success(isVariantReply ? 'Comment updated' : 'Post updated');

    try {
      await updatePostAction(post.id!, data.postContent, data.mediaRemoved ? null : data.media);
    } catch (error: unknown) {
      console.error('Error updating post', error);
      toast.error('Failed to update post');
      router.refresh();
    }
  };

  const handleLike = async () => {
    const updatedData = {
      likes: (post.likes ?? 0) + 1,
      likedBySelf: true,
    };

    // Optimistic like
    if (onUpdate) {
      onUpdate(post.id!, updatedData);
    }

    try {
      await likePost(post.id!);
      toast.success('Post successfully liked.');
    } catch (error: unknown) {
      console.error('Error liking post:', error);
      toast.error('Error liking post');
      // Revert
      if (onUpdate) {
        onUpdate(post.id!, {
          likes: post.likes,
          likedBySelf: false,
        });
      }
    }
  };

  const handleUnlike = async () => {
    const updatedData = {
      likes: Math.max((post.likes ?? 0) - 1, 0),
      likedBySelf: false,
    };

    // Optimistic unlike
    if (onUpdate) {
      onUpdate(post.id!, updatedData);
    }

    try {
      await unlikePost(post.id!);
      toast.success('Post successfully unliked.');
    } catch (error: unknown) {
      console.error('Error unliking post:', error);
      toast.error('Error unliking post');
      // Revert
      if (onUpdate) {
        onUpdate(post.id!, {
          likes: post.likes,
          likedBySelf: true,
        });
      }
    }
  };

  return (
    <div className="grid gap-sm sm:gap-md" data-testid="post-content">
      {post.id && (
        <div className="flex items-center gap-sm" data-testid="post-content-header">
          <PostItemUserInfo
            userId={post.creator?.id ?? ''}
            displayName={post.creator?.displayName ?? ''}
            username={post.creator?.username ?? ''}
            avatarSrc={post.creator?.avatarUrl ?? undefined}
            date={decodeULIDTimestamp(post.id)}
            variant={variant}
          />
          {isMyPost && <Dropdown actions={actions} data-testid="post-content-dropdown" />}
        </div>
      )}
      {post.text && (
        // TODO: check if this make sense
        <p
          suppressHydrationWarning
          className="pb-paragraph-md cursor-auto whitespace-pre-wrap break-all"
          dangerouslySetInnerHTML={{ __html: getSanitizedHTML(textToTagsLink(post.text)) }}
          data-testid="post-content-text"
        ></p>
      )}
      {post.mediaUrl && (
        <div className="grid cursor-auto place-content-center object-contain" data-testid="post-content-media">
          <ImageView sources={[post.mediaUrl]} alt={'post-media'} />
        </div>
      )}
      {post.id && (
        <div className="-ml-3 flex flex-wrap gap-xxs gap-y-0 sm:gap-sm" data-testid="post-content-actions">
          {!isVariantReply && (
            <CommentsButton
              count={(post as Post).replies}
              disabled={!session}
              onClick={() => router.push(`/post/${post.id}`)}
              data-testid="post-content-comments-button"
            />
          )}

          <LikeButton
            count={post.likes}
            initialIsLiked={!!post.likedBySelf}
            disabled={!session}
            onLikeAdd={handleLike}
            onLikeRemove={handleUnlike}
            data-testid="post-content-like-button"
          />

          {!isVariantReply && (
            <CopyButton textToCopy={`${origin}/post/${post.id ?? ''}`} data-testid="post-content-copy-button" />
          )}
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
