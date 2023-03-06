import { IPayloadGetPost, IPost } from 'src/types/post';
import { createClient } from './axios_client';

const client = createClient();

export const postApi = {
  create: (payload: FormData) => {
    return client.post('/post/create', payload);
  },
  getPosts: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/post/getPosts`, {
      params: params
    });
  }
};
