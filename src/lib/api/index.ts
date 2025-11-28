import { getAccessToken } from '../auth';
import { client } from './client/client.gen';

client.setConfig({
  baseUrl: process.env.API_URL_MUMBLE,
});

client.interceptors.request.use(async (request) => {
  const tokenResponse = await getAccessToken();

  const tokenString = tokenResponse?.accessToken ?? '';

  request.headers.set('Authorization', `Bearer ${tokenString}`);

  return request;
});
