import { IPayloadGetUser } from 'src/types/auth';
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
  getUsers: (payload: { id_role: number, limit: number, offset: number }) => {
    return client.post('admin/user/gets', payload);
  },

};
