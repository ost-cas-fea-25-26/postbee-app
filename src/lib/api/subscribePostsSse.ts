import { Post } from '@/lib/api/client';

/**
 * Subscribe to live posts using Server-Sent Events (SSE).
 * Calls the callback with a new Post when a 'postCreated' event is received.
 * Returns a function to unsubscribe.
 */
export function subscribePostsSse(onPostCreated: (post: Post) => void): () => void {
  const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL_MUMBLE}/posts/_sse`);

  const handler = (event: MessageEvent<string>) => {
    try {
      const data = JSON.parse(event.data) as Post;
      onPostCreated(data);
    } catch {
      // Optionally handle parse error
      console.error(`subscribePostsSse: ${JSON.stringify(event, null, 2)}`);
    }
  };

  eventSource.addEventListener('postCreated', handler);

  return () => {
    eventSource.removeEventListener('postCreated', handler);
    eventSource.close();
  };
}
