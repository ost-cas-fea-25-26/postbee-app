import { Post, PostPaginatedResult, User, UserPaginatedResult } from '@/lib/api/client';
import { HttpResponse, http } from 'msw';

// Helper to generate valid ULIDs for mock data
function randomULID() {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  let ts = Date.now();
  let tsChars = '';
  for (let i = 0; i < 10; i++) {
    tsChars = ENCODING[ts % 32] + tsChars;
    ts = Math.floor(ts / 32);
  }
  tsChars = tsChars.padStart(10, '0');
  let rand = '';
  for (let i = 0; i < 16; i++) {
    rand += ENCODING[Math.floor(Math.random() * 32)];
  }

  return tsChars + rand;
}

const currentUser: User = {
  id: '352088331556799052',
  firstname: 'Clark',
  lastname: 'Kent',
  username: 'superman',
  avatarUrl: '/images/PostBee-Logo.png',
};

const funnyUser: User = {
  id: randomULID(),
  firstname: 'Bruce',
  lastname: 'Wayne',
  username: 'batman',
};

function createCurrentUserPost(text: string, mediaUrl?: string, mediaType = 'image'): Post {
  return {
    id: randomULID(),
    text,
    likes: 0,
    likedBySelf: false,
    replies: 0,
    mediaUrl,
    mediaType,
    creator: {
      id: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
    },
  };
}

const posts: Post[] = [
  {
    id: randomULID(),
    text: 'Just saved Metropolis from a giant rubber duck! 🦸‍♂️🦆',
    likes: 0,
    likedBySelf: false,
    replies: 0,
    creator: {
      id: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
    },
  },
  {
    id: randomULID(),
    text: 'Batmobile ran out of gas... again. Anyone got a BatUber? 🦇🚗',
    likes: 17,
    likedBySelf: false,
    replies: 1,
    creator: {
      id: funnyUser.id,
      username: funnyUser.username,
    },
  },
  {
    id: randomULID(),
    text: 'Wonder Woman challenged me to a lasso contest. I lost. 🥲',
    likes: 29,
    likedBySelf: false,
    replies: 2,
    creator: {
      id: currentUser.id,
      username: currentUser.username,
    },
  },
];

export const handlers = [
  http.get(`${process.env.API_URL_MUMBLE}/users/:id`, () => {
    return HttpResponse.json(currentUser);
  }),
  http.patch(`${process.env.API_URL_MUMBLE}/users/:id`, () => {
    return HttpResponse.json(currentUser);
  }),
  http.get(`${process.env.API_URL_MUMBLE}/users/:id/followees`, () => {
    const response: UserPaginatedResult = {
      count: 1,
      data: [funnyUser],
      next: null,
      previous: null,
    };

    return HttpResponse.json(response);
  }),
  http.get(`${process.env.API_URL_MUMBLE}/posts`, () => {
    const response: PostPaginatedResult = {
      count: posts.length,
      data: posts,
      next: null,
      previous: null,
    };

    return HttpResponse.json(response);
  }),
  http.post(`${process.env.API_URL_MUMBLE}/posts`, async ({ request }) => {
    const formData = await request.formData();
    const textField = formData.get('text');
    const text = typeof textField === 'string' ? textField : '';
    const media = formData.get('media');
    let mediaUrl: string | undefined = undefined;
    let mediaType: string | undefined = undefined;
    if (media && typeof File !== 'undefined' && media instanceof File) {
      mediaUrl = `/images/PostBee-Logo.png`;
      mediaType = media.type || 'image';
    }
    const post = createCurrentUserPost(text, mediaUrl, mediaType);

    return HttpResponse.json(post);
  }),
  http.get(`${process.env.API_URL_MUMBLE}/posts/:id`, ({ params }) => {
    const post = posts.find((p) => p.id === params.id);
    if (post) {
      return HttpResponse.json(post);
    }

    return new HttpResponse('Not found', { status: 404 });
  }),
  http.put(`${process.env.API_URL_MUMBLE}/posts/:id/likes`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
  http.delete(`${process.env.API_URL_MUMBLE}/posts/:id/likes`, () => {
    return new HttpResponse(null, { status: 204 });
  }),
];
