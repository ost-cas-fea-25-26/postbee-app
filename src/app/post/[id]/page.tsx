import { Suspense } from 'react';

import { CommentCreate } from '@/components/comments/CommentCreate';
import CommentsList from '@/components/comments/CommentsList';
import { PostCard, PostItem, PostsList } from '@/components/posts';
import { getPostsById } from '@/lib/api';
import { getSession } from '@/lib/auth/auth';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const postId = (await params).id;
  const { data: post } = await getPostsById({ path: { id: postId } });

  const session = await getSession();

  return (
    <div>
      {post && (
        <PostCard post={post}>
          <PostItem post={post} session={session} />

          <Suspense>
            <CommentCreate postId={postId} session={session} />
          </Suspense>

          <Suspense fallback={<p>Loading posts...</p>}>
            <CommentsList postId={postId} />
          </Suspense>
        </PostCard>
      )}
    </div>
  );
}
