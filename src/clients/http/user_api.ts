import { IPayloadGetUser, IPayloadLogin, IPayloadLoginGoogle, IPayloadRegister } from 'src/types/auth';
import { createClient } from './axios_client';
import { IPayloadFollow, IPayloadGetUsers, IPayloadInvisible, IUser } from 'src/types/user';
import { IPayloadSearchRoom, ISearchRoom } from 'src/types/room';

const client = createClient();

export const userApi = {
  login: (payload: IPayloadLogin) => {
    return client.post('/auth/login', payload);
  },
  loginGoogle: (payload: IPayloadLoginGoogle) => {
    return client.post('/auth/loginGoogle', payload);
  },
  updateInfo: (payload: IUser) => {
    return client.put('/auth/update', payload);
  },
  updatePassword: (payload: IUser) => {
    return client.put('/auth/updatePassword', payload);
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
  getFollowers: (payload: IPayloadGetUsers) => {
    return client.get('/user/get/followers', {
      params: payload
    });
  },
  getFollowings: (payload: IPayloadGetUsers) => {
    return client.get('/user/get/followings', {
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
  },
  getUsersNotInRoom: (params: IPayloadSearchRoom) => {
    return client.get<ISearchRoom>(`/user/getUsersNotInRoom`, {
      params: params
    });
  },
  updateImage: (payload: FormData) => {
    return client.post('/auth/updateImage', payload);
  },
  reportPost: (payload: { id_user: string; reason: string; id_post: string }) => {
    return client.post<any>('/user/post/report', payload);
  }
};
