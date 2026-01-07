'use client';

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';

import { getMorePosts } from '@/actions/posts';
import { useLivePosts } from '@/hooks/useLivePosts';
import { Post, PostPaginatedResult } from '@/lib/api/client';
import { toast } from 'sonner';

interface PostsContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePost: (postId: string, updatedPost: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  addPost: (post: Post) => void;
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  filters?: {
    tags?: string[];
    likedBy?: string[];
    creators?: string[];
  };
  newPostsBuffer: Post[];
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

interface PostsProviderProps {
  children: ReactNode;
  initialPosts: Post[];
  initialPagination?: PostPaginatedResult;
  filters?: {
    tags?: string[];
    likedBy?: string[];
    creators?: string[];
  };
}

export function PostsProvider({ children, initialPosts, initialPagination, filters }: PostsProviderProps) {
  const [newPostsBuffer, setNewPostsBuffer] = useState<Post[]>([]);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(!!initialPagination?.next);
  const [offset, setOffset] = useState(initialPosts.length);

  // Sync internal posts state with initialPosts when it changes (e.g., when searchParams like tags change).
  // This ensures the context always reflects the latest data instead of showing stale state.
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // Use live posts hook for SSE and toast logic
  useLivePosts(
    (buffer) => {
      setPosts((prev) => [...buffer, ...prev]);
      setNewPostsBuffer([]);
    },
    setPosts,
    setNewPostsBuffer,
  );

  const updatePost = useCallback((postId: string, updatedData: Partial<Post>) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...updatedData } : post)));
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await getMorePosts({
        ...filters,
        offset,
        limit: 20,
      });

      if (response?.data && response.data.length > 0) {
        const newPosts = response.data;
        setPosts((prev) => [...prev, ...newPosts]);
        setOffset((prev) => prev + newPosts.length);
        setHasMore(!!response.next);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
      toast.error('Failed to load more posts');
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, hasMore, offset, filters]);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        updatePost,
        deletePost,
        addPost,
        isLoading,
        hasMore,
        loadMore,
        filters,
        newPostsBuffer,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostsProvider');
  }

  return context;
}
