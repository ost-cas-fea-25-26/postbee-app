'use client';

import { useState } from 'react';

import { deletePost as deletePostAction, likePost, unlikePost } from '@/actions/posts';
import { updatePost as updatePostAction } from '@/actions/posts/update';
import { Dropdown, DropdownAction } from '@/components/core/Dropdown';
import { ImageView } from '@/components/core/ImageView';
import { PostFormData, PostItemEditDialog } from '@/components/posts/PostItemEditDialog';
import { usePosts } from '@/components/posts/PostsProvider';
import { Post } from '@/lib/api/client';
import { AuthSession } from '@/lib/auth/auth';
import { PostVariant } from '@/lib/types';
import { getSanitizedHTML, textToTagsLink } from '@/lib/utils';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, LikeButton } from '@postbee/postbee-ui-lib';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { PostItemUserInfo } from './PostItemUserInfo';

export const PostItem = ({
  post: initialPost,
  session,
  variant = 'Default',
}: {
  post: Post;
  session: AuthSession;
  variant?: PostVariant;
}) => {
  const router = useRouter();
  const { posts, updatePost, deletePost } = usePosts();
  const post = posts.find((item) => item.id === initialPost.id) ?? initialPost;
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
          await deletePostAction(post.id!);
          deletePost(post.id!);
          toast.success('Post deleted');
        } catch (error) {
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
    try {
      await updatePostAction(post.id!, data.postContent, data.mediaRemoved ? null : data.media);
      updatePost(post.id!, {
        text: data.postContent,
        mediaUrl: data.mediaRemoved ? null : typeof data.media === 'string' ? data.media : (post.mediaUrl ?? null),
      });
      toast.success('Post updated');
    } catch (error) {
      console.error('Error updating post', error);
      toast.error('Failed to update post');
      // Revert optimistic update
      router.refresh();
    }
  };

  const handleLike = async () => {
    // Optimistic like
    updatePost(post.id!, {
      likes: (post.likes ?? 0) + 1,
      likedBySelf: true,
    });

    try {
      await likePost(post.id!);
      toast.success('Post successfully liked.');
    } catch (error) {
      console.error('Error liking post:', error);
      toast.error('Error liking post');
      // Revert
      updatePost(post.id!, {
        likes: post.likes,
        likedBySelf: false,
      });
    }
  };

  const handleUnlike = async () => {
    // Optimistic unlike
    updatePost(post.id!, {
      likes: Math.max((post.likes ?? 0) - 1, 0),
      likedBySelf: false,
    });

    try {
      await unlikePost(post.id!);
      toast.success('Post successfully unliked.');
    } catch (error) {
      console.error('Error unliking post:', error);
      toast.error('Error unliking post');
      // Revert
      updatePost(post.id!, {
        likes: post.likes,
        likedBySelf: true,
      });
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
      {post.text && (
        // TODO: check if this make sense
        <p
          suppressHydrationWarning
          className="pb-paragraph-md cursor-auto whitespace-pre-wrap break-all"
          dangerouslySetInnerHTML={{ __html: getSanitizedHTML(textToTagsLink(post.text)) }}
        ></p>
      )}
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
            onLikeAdd={handleLike}
            onLikeRemove={handleUnlike}
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
