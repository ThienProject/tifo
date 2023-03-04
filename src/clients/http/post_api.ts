import { IPost } from 'src/types/post';
import { createClient } from './axios_client';

const client = createClient();

export const postApi = {
  create: (payload: FormData) => {
    return client.post('/post/create', payload);
  },
  getPosts: (id_user: string) => {
    return client.get<IPost>(`/post/getPosts/${id_user}`);
  }
};
