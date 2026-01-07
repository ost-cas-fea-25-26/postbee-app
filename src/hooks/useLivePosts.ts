import { useEffect, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react';

import { Post } from '@/lib/api/client';
import { subscribePostsSse } from '@/lib/api/subscribePostsSse';
import { toast } from 'sonner';

export function useLivePosts(
  onNewPosts: (buffer: Post[]) => void,
  setPosts: Dispatch<SetStateAction<Post[]>>,
  setNewPostsBuffer: Dispatch<SetStateAction<Post[]>>,
  enabled: boolean,
  userid: string | undefined,
) {
  const toastId = 'new-posts-toast';

  const unsubscribeRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
      unsubscribeRef.current = null;
    }
    if (!enabled) {
      return;
    }
    const unsubscribe = subscribePostsSse({
      onPostCreated: (post) => {
        setNewPostsBuffer((buffer) => {
          if (buffer.some((p) => p.id === post.id)) {
            return buffer;
          }
          const updatedBuffer = [post, ...buffer];
          toast(`${updatedBuffer.length} new post${updatedBuffer.length > 1 ? 's' : ''} available!`, {
            id: toastId,
            duration: Infinity,
            action: {
              label: 'View now',
              onClick: () => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                onNewPosts(updatedBuffer);
                setNewPostsBuffer([]);
                toast.dismiss(toastId);
              },
            },
          });

          return updatedBuffer;
        });
      },
      onPostUpdated: (updated) => {
        setPosts((prev) => {
          if (!updated?.id || !prev.some((p) => p.id === updated?.id)) {
            return prev;
          }

          return prev.map((p) =>
            p.id === updated.id
              ? {
                  ...p,
                  ...updated,
                  // Preserve likedBySelf if because is not provided in the update
                  likedBySelf: p.likedBySelf,
                }
              : p,
          );
        });
      },
      onPostDeleted: (deleted) => {
        setPosts((prev) => {
          if (!deleted.id || !prev.some((p) => p.id === deleted.id)) {
            return prev;
          }

          return prev.filter((p) => p.id !== deleted.id);
        });

        setNewPostsBuffer((buffer) => {
          const updatedBuffer = buffer.filter((p) => p.id !== deleted.id);
          if (updatedBuffer.length === 0) {
            toast.dismiss(toastId);

            return updatedBuffer;
          }
          toast(`${updatedBuffer.length} new post${updatedBuffer.length > 1 ? 's' : ''} available!`, {
            id: toastId,
            duration: Infinity,
            action: {
              label: 'View now',
              onClick: () => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                onNewPosts(updatedBuffer);
                setNewPostsBuffer([]);
                toast.dismiss(toastId);
              },
            },
          });

          return updatedBuffer;
        });
      },
      onPostLiked: (like) => {
        setPosts((prev) => {
          if (!like.postId || !prev.some((p) => p.id === like.postId)) {
            return prev;
          }

          return prev.map((p) => {
            if (p.id !== like.postId) {
              return p;
            }

            // check if the like event is from the current user
            const isSelf = userid === like.userId;

            return {
              ...p,
              likes: p.likedBySelf ? (p.likes ?? 0) : (p.likes ?? 0) + 1,
              // Only set likedBySelf if the current user liked the post
              likedBySelf: isSelf ? true : p.likedBySelf,
            };
          });
        });
      },
      onPostUnliked: (like) => {
        setPosts((prev) => {
          if (!like.postId || !prev.some((p) => p.id === like.postId)) {
            return prev;
          }

          return prev.map((p) => {
            if (p.id !== like.postId) {
              return p;
            }

            // check if the like event is from the current user
            const isSelf = userid === like.userId;

            return {
              ...p,
              likes: isSelf ? p.likes : Math.max((p.likes ?? 1) - 1, 0),
              // Only set likedBySelf to false if the current user unliked the post
              likedBySelf: isSelf ? false : p.likedBySelf,
            };
          });
        });
      },
    });

    unsubscribeRef.current = unsubscribe;

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
    // Only rerun if enabled changes
  }, [onNewPosts, setPosts, setNewPostsBuffer, enabled, userid]);
}
