import { getUser } from '@/actions/user';
import { PostsListClient, PostsProvider } from '@/components/posts';
import { PostCreate } from '@/components/posts/PostCreate';
import { getPosts } from '@/lib/api';
import { getSession } from '@/lib/auth/auth';

interface Props {
  searchParams: Promise<{
    tags: string;
    likedBy: string;
    creators: string;
  }>;
}

export async function HomeContent({ searchParams }: Props) {
  const session = await getSession();
  const user = await getUser(session?.user?.identifier ?? '');
  const { tags, likedBy, creators } = await searchParams;

  const tagsList = Array.isArray(tags) ? tags : tags ? [tags] : undefined;
  const likeByList = Array.isArray(likedBy) ? likedBy : likedBy ? [likedBy] : undefined;
  const creatorsList = Array.isArray(creators) ? creators : creators ? [creators] : undefined;

  const { data: posts } = await getPosts({
    query: {
      tags: tagsList,
      likedBy: likeByList,
      creators: creatorsList,
      limit: 20,
    },
  });

  const initialPosts = posts?.data ?? [];

  return (
    <div className="flex flex-col items-center justify-center gap-sm mb-xl">
      <PostsProvider
        initialPosts={initialPosts}
        initialPagination={posts ?? undefined}
        filters={{ tags: tagsList, likedBy: likeByList, creators: creatorsList }}
        userId={user.id}
      >
        {session?.user ? <PostCreate userDisplayName={user.displayName} userAvatarUrl={user.avatarUrl} /> : null}
        <PostsListClient session={session} />
      </PostsProvider>
    </div>
  );
}
