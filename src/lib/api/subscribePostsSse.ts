import { DeletedPost, LikeInfo, Post, PostBase } from '@/lib/api/client';

type PostSseHandler = {
  onPostCreated?: (post: Post) => void;
  onPostUpdated?: (post: PostBase) => void;
  onPostDeleted?: (deleted: DeletedPost) => void;
  onPostLiked?: (like: LikeInfo) => void;
  onPostUnliked?: (like: LikeInfo) => void;
};

/**
 * Subscribe to live posts using Server-Sent Events (SSE).
 * Calls the appropriate callback for each event type.
 * Returns a function to unsubscribe.
 */
export function subscribePostsSse(handlers: PostSseHandler): () => void {
  const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL_MUMBLE}/posts/_sse`);

  // Store handler references to allow correct removal
  const eventHandlers: Record<string, (event: MessageEvent<string>) => void> = {};

  const makeHandler = <T>(cb?: (data: T) => void) => {
    return (event: MessageEvent<string>) => {
      try {
        const parsed = JSON.parse(event.data) as T;
        cb?.(parsed);
      } catch (err) {
        console.error('subscribePostsSse: failed to parse event', event.data, err);
      }
    };
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlersMap: [keyof PostSseHandler, string, ((data: any) => void) | undefined][] = [
    ['onPostCreated', 'postCreated', handlers.onPostCreated],
    ['onPostUpdated', 'postUpdated', handlers.onPostUpdated],
    ['onPostDeleted', 'postDeleted', handlers.onPostDeleted],
    ['onPostLiked', 'postLiked', handlers.onPostLiked],
    ['onPostUnliked', 'postUnliked', handlers.onPostUnliked],
  ];

  handlersMap.forEach(([, eventName, cb]) => {
    if (cb) {
      const handler = makeHandler(cb);
      eventHandlers[eventName] = handler;
      eventSource.addEventListener(eventName, handler);
    }
  });

  return () => {
    Object.entries(eventHandlers).forEach(([eventName, handler]) => {
      eventSource.removeEventListener(eventName, handler);
    });
    eventSource.close();
  };
}
