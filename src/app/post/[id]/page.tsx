import { Suspense } from 'react';

import { CommentCreate } from '@/components/comments/CommentCreate';
import CommentsList from '@/components/comments/CommentsList';
import { PostCard, PostItem } from '@/components/posts';
import { getPostsById } from '@/lib/api';
import { getSession } from '@/lib/auth/auth';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function PostContent({ params }: { params: Promise<{ id: string }> }) {
  const postId = (await params).id;
  const { data: post } = await getPostsById({ path: { id: postId } });
  const session = await getSession();

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <PostCard post={post}>
      <PostItem post={post} session={session} />
      <Suspense>
        <CommentCreate postId={postId} session={session} />
      </Suspense>
      <Suspense fallback={<p>Loading comments...</p>}>
        <CommentsList postId={postId} />
      </Suspense>
    </PostCard>
  );
}

export default function Page({ params }: Props) {
  return (
    <div>
      <Suspense fallback={<p>Loading post...</p>}>
        <PostContent params={params} />
      </Suspense>
    </div>
  );
}
