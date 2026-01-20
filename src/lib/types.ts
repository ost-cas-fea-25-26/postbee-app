export type AppUser = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  firstname: string;
  lastname: string;
  isMe?: boolean;
};

export type PostVariant = 'Default' | 'Reply';
