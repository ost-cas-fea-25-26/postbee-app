import { Suspense } from 'react';

import { getCachedPostsById } from '@/actions/posts/get';
import { CommentCreate } from '@/components/comments/CommentCreate';
import { Comments } from '@/components/comments/Comments';
import { PostCard, PostItem, PostsProvider } from '@/components/posts';
import { SkeletonPost } from '@/components/skeleton';
import { getSession } from '@/lib/auth/auth';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

async function PostContent({ params }: Props) {
  const postId = (await params).id;
  const post = await getCachedPostsById(postId);
  const session = await getSession();

  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <PostsProvider initialPosts={post ? [post] : []}>
      <PostCard post={post}>
        <PostItem post={post} session={session} />
        <Comments postId={postId}>
          <CommentCreate postId={postId} session={session} />
        </Comments>
      </PostCard>
    </PostsProvider>
  );
}

export default function Page({ params }: Props) {
  return (
    <div>
      <Suspense fallback={<SkeletonPost />}>
        <PostContent params={params} />
      </Suspense>
    </div>
  );
}
