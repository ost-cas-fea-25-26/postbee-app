'use server';

import { throwIfError } from '@/actions/helpers';
import { patchPostsById, putPostsById } from '@/lib/api/client';

export async function updatePost(id: string, text: string, media?: File | null) {
  const body: { text: string; media?: File } = { text };

  // Determine if media changed
  const mediaChanged = media instanceof File || media === null;

  if (mediaChanged) {
    body.media = media ?? undefined; // Send undefined if null to remove$

    // Use PUT when media is being added or removed
    const { data, error } = await putPostsById({
      path: { id },
      body,
    });

    throwIfError(error);

    return data;
  }

  // Use PATCH when only text is updated
  const { data, error } = await patchPostsById({
    path: { id },
    body,
  });

  throwIfError(error);

  return data;
}
