import { IComment, IPayloadCreateComment, IPayloadEditComment, IPayloadGetPost, IPost } from 'src/types/post';
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
  },
  sendComment: (payload: IPayloadCreateComment) => {
    return client.post('/comment/create', payload);
  },
  getComments: (params: string) => {
    return client.get<IComment[]>(`/comment/get`, {
      params: { id_post: params }
    });
  },
  editComment: (payload: IPayloadEditComment) => {
    return client.post('/comment/update', payload);
  },
  deleteComment: (payload: any) => {
    return client.delete<IComment[]>(`/comment/delete`, { data: payload });
  }
};
