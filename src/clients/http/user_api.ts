import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadGetPost, IPost } from 'src/types/post';
import { createClient } from './axios_client';

const client = createClient();

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/auth/register', payload);
  },
  getNotifications: (payload: { id_user: string }) => {
    return client.post<any>('/auth/getNotifications', payload);
  },
  getPosts: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/user/getPosts`, {
      params: params
    });
  },
  getUser: (payload: { id_user: string }) => {
    return client.post('/user/get', payload);
  },
  getUsers: (payload: { q: string }) => {
    return client.get('/user/gets', {
      params: payload
    });
  },
  getReels: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/user/getReels`, {
      params: params
    });
  },
  getSaves: (params: IPayloadGetPost) => {
    return client.get<IPost>(`/user/getSaves`, {
      params: params
    });
  }
};
