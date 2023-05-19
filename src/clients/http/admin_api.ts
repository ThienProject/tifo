import { createClient } from './axios_client';
import { IUser } from 'src/types/user';

const client = createClient();

export const adminApi = {
  updateInfo: (payload: IUser) => {
    return client.put('/auth/update', payload);
  },
  updatePassword: (payload: IUser) => {
    return client.put('/auth/updatePassword', payload);
  },
  getNotifications: (payload: { id_user: string }) => {
    return client.post<any>('/auth/getNotifications', payload);
  },
  getUser: (payload: { id_user: string }) => {
    return client.post('admin/user/get', payload);
  },
  getPost: (payload: { id_post: string }) => {
    return client.post('admin/post/get', payload);
  },
  lockUser: (payload: { id_user: string; reason: string }) => {
    return client.post<any>('/admin/user/lock', payload);
  },
  lockPost: (payload: { id_user: string; reason: string; id_post: string }) => {
    return client.post<any>('/admin/post/lock', payload);
  },
  getUsers: (payload: { id_role: number; limit: number; offset: number }) => {
    return client.post('admin/user/gets', payload);
  },
  getPosts: (payload: { id_user: string; limit: number; offset: number }) => {
    return client.post('admin/post/gets', payload);
  },
  userStatistics: () => {
    return client.post('admin/user/statistics');
  }
};
