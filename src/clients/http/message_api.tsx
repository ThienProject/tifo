import { IPayloadLogin, IPayloadRegister } from 'src/types/auth';
import { IPayloadGetPost, IPost } from 'src/types/post';
import { createClient } from './axios_client';
import { IPayloadChats, IPayloadGroups } from 'src/types/message';

const client = createClient();

export const messageApi = {
  getGroups: (params: IPayloadGroups) => {
    return client.get<any>(`/group/gets`, {
      params: params
    });
  },
  getChatsByIDGroup: (params: IPayloadChats) => {
    return client.get('/group/getChatsByIDGroup', {
      params
    });
  },
  getChats: (params: IPayloadGroups) => {
    return client.get<any>(`/chat/gets`, {
      params: params
    });
  }
};
