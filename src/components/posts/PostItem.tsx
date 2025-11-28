'use client';

import { PostItemUserInfo } from '@/components/posts/PostItemUserInfo';
import { Post } from '@/lib/api';
import { decodeULIDTimestamp } from '@/lib/utils/api';
import { CommentsButton, CopyButton, LikeButton } from '@postbee/postbee-ui-lib';

export const PostItem = ({ post }: { post: Post }) => {
  return (
    <div className="grid gap-sm sm:gap-md">
      <div className="flex">
        <PostItemUserInfo user={post.creator} postDate={decodeULIDTimestamp(post.id)} />
      </div>
      {post.text}
      <pre>{JSON.stringify(post, null, 2)}</pre>
      {post.text && <div className="cursor-auto whitespace-pre-wrap break-all" />}
      {post.mediaUrl && <div className="grid cursor-auto place-content-center object-contain">TODO: Media URL</div>}
      <div className="flex">
        <div className="-ml-xs flex flex-wrap gap-xxs gap-y-0 sm:gap-lg" onClick={(e) => e.stopPropagation()}>
          <CommentsButton />

          <LikeButton />

          <CopyButton />
        </div>
      </div>
    </div>
  );
};
