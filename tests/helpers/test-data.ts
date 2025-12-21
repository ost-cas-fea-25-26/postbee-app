import { Post, PublicUser } from '@/lib/api/client';

/**
 * Creates a mock user for testing
 */
export function createMockUser(overrides?: Partial<PublicUser>): PublicUser {
  return {
    id: '01GDMMR85BEHP8AKV8ZGGM259K',
    username: 'testuser',
    displayName: 'Test User',
    avatarUrl: 'https://example.com/avatar.jpg',
    ...overrides,
  };
}

/**
 * Creates a mock post for testing
 */
export function createMockPost(overrides?: Partial<Post>): Post {
  return {
    id: '01GDMMR85BEHP8AKV8ZGGM259K',
    creator: createMockUser(),
    text: 'This is a test post #test',
    mediaUrl: null,
    mediaType: null,
    likes: 0,
    likedBySelf: false,
    replies: 0,
    ...overrides,
  };
}

/**
 * Creates multiple mock posts
 */
export function createMockPosts(count: number, overrides?: Partial<Post>): Post[] {
  return Array.from({ length: count }, (_, index) =>
    createMockPost({
      id: `01GDMMR85BEHP8AKV8ZGGM259${index.toString().padStart(2, '0')}`,
      text: `Test post ${index + 1} #test`,
      ...overrides,
    }),
  );
}

/**
 * Creates a mock session for testing
 */
export function createMockSession(userId?: string) {
  return {
    user: {
      identifier: userId ?? '01GDMMR85BEHP8AKV8ZGGM259K',
      name: 'Test User',
      email: 'test@example.com',
    },
  };
}
