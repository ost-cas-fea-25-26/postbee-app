'use client';

import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { Post } from '@/lib/api/client';

interface PostsContextType {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  updatePost: (postId: string, updatedPost: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  addPost: (post: Post) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children, initialPosts }: { children: ReactNode; initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const updatePost = useCallback((postId: string, updatedData: Partial<Post>) => {
    setPosts((prev) => prev.map((post) => (post.id === postId ? { ...post, ...updatedData } : post)));
  }, []);

  const deletePost = useCallback((postId: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== postId));
  }, []);

  const addPost = useCallback((post: Post) => {
    setPosts((prev) => [post, ...prev]);
  }, []);

  return (
    <PostsContext.Provider
      value={{
        posts,
        setPosts,
        updatePost,
        deletePost,
        addPost,
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
