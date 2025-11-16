export type PaginatedResult<TData> = {
  data: TData[];
  count: number;
  next?: string;
  previous?: string;
};

export type PublicUser = {
  id: string;
  username: string;
  avatarUrl?: string;
};

type PostBase = {
  id: string;
  text?: string;
  mediaUrl?: string;
  mediaType?: string;
  likes: number;
  likedBySelf?: boolean;
};

export type Post = PostBase & {
  replies: number;
};

export enum PostEvents {
  created = 'postCreated',
  updated = 'postUpdated',
  deleted = 'postDeleted',
  liked = 'postLiked',
  unliked = 'postUnliked',
}
