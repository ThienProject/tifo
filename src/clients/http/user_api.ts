import { IPayloadGetUser, IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { createClient } from './axios_client';
import { IPayloadFollow, IPayloadGetUsers, IPayloadInvisible } from 'src/types/user';

const client = createClient();

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  register: (payload: IPayloadRegister) => {
    return client.post<any>('/auth/register', payload);
  },
  updateInvisible: (payload: IPayloadInvisible) => {
    return client.post('/auth/updateInvisible', payload);
  },
  getNotifications: (payload: { id_user: string }) => {
    return client.post<any>('/auth/getNotifications', payload);
  },
  getUser: (payload: IPayloadGetUser) => {
    return client.post('/user/get', payload);
  },
  getUsers: (payload: IPayloadGetUsers) => {
    return client.get('/user/gets', {
      params: payload
    });
  },
  getSuggests: (payload: IPayloadGetUsers) => {
    return client.get('/user/suggests/gets', {
      params: payload
    });
  },
  requestFollow: (payload: IPayloadFollow) => {
    return client.post('user/follow/request', payload);
  },
  acceptFollow: (payload: IPayloadFollow) => {
    return client.post('user/follow/accept', payload);
  },
  rejectFollow: (payload: IPayloadFollow) => {
    return client.post('/user/follow/reject', payload);
  },
  unfollow: (payload: IPayloadFollow) => {
    return client.post('/user/unfollow', payload);
  }
};
