import {
  IComment,
  IPayloadCreateComment,
  IPayloadEditComment,
  IPayloadGetPost,
  IPost,
  IUpdateLove
} from 'src/types/post';
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
  getPostsByIDUser: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/post/getPostsByIDUser`, {
      params: params
    });
  },
  getReelsByIDUser: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/post/getReelsByIDUser`, {
      params: params
    });
  },
  getSavesByIDUser: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/post/getSavesByIDUser`, {
      params: params
    });
  },
  update: (payload: FormData) => {
    return client.post('/post/update', payload);
  },
  updateLove: (payload: IUpdateLove) => {
    return client.post('/post/updateLove', payload);
  },
  deletePost: (payload: { id_post: string }) => {
    return client.delete('/post/delete', { data: payload });
  },
  replaceMedias: (payload: FormData) => {
    return client.post('/post/replaceMedias', payload);
  },
  deleteMedias: (payload: any[]) => {
    return client.post('/post/deleteMedias', payload);
  },
  getPostByID: (params: { id_post: string }) => {
    return client.get<IPost>(`/post/getPostByID`, {
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
