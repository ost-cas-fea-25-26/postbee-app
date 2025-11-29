import { Suspense } from 'react';

import { CommentCreate } from '@/components/comments/CommentCreate';
import { PostCard, PostItem } from '@/components/posts';
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
            <CommentCreate session={session} />
          </Suspense>
        </PostCard>
      )}
    </div>
  );
}
