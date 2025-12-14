'use client';

import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { Post } from '@/lib/api/client';

interface PostContextType {
  post: Post | null;
  updatePost: (updatedData: Partial<Post>) => void;
  deletePost: () => void;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export function PostProvider({ children, initialPost }: { children: ReactNode; initialPost: Post | null }) {
  const [post, setPost] = useState<Post | null>(initialPost);

  const updatePost = useCallback((updatedData: Partial<Post>) => {
    setPost((prev) => (prev ? { ...prev, ...updatedData } : null));
  }, []);

  const deletePost = useCallback(() => {
    setPost(null);
  }, []);

  return <PostContext.Provider value={{ post, updatePost, deletePost }}>{children}</PostContext.Provider>;
}

export function usePost() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePost must be used within a PostProvider');
  }

  return context;
}
