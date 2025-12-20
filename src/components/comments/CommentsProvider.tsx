'use client';

import { ReactNode, createContext, useCallback, useContext, useState } from 'react';

import { Reply } from '@/lib/api/client';

interface CommentsContextType {
  comments: Reply[];
  setComments: (comments: Reply[]) => void;
  updateComment: (commentId: string, updatedComment: Partial<Reply>) => void;
  deleteComment: (commentId: string) => void;
  addComment: (comment: Reply) => void;
}

const CommentsContext = createContext<CommentsContextType | undefined>(undefined);

export const CommentsProvider = ({ children, initialComments }: { children: ReactNode; initialComments: Reply[] }) => {
  const [comments, setComments] = useState<Reply[]>(initialComments);

  const updateComment = useCallback((commentId: string, updatedData: Partial<Reply>) => {
    setComments((prev) => prev.map((comment) => (comment.id === commentId ? { ...comment, ...updatedData } : comment)));
  }, []);

  const deleteComment = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  }, []);

  const addComment = useCallback((comment: Reply) => {
    setComments((prev) => [comment, ...prev]);
  }, []);

  return (
    <CommentsContext.Provider
      value={{
        comments,
        setComments,
        updateComment,
        deleteComment,
        addComment,
      }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

export function useComments() {
  const context = useContext(CommentsContext);
  if (context === undefined) {
    throw new Error('useComments must be used within a CommentsProvider');
  }

  return context;
}
