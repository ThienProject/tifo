import { createClient } from './axios_client';
import { IPayloadChats, IPayloadCreateChat, IPayloadGroups } from 'src/types/group';

const client = createClient();

export const messageApi = {
  getGroups: (params: IPayloadGroups) => {
    return client.get<any>(`/group/gets`, {
      params: params
    });
  },
  searchGroup: (params: { q: string }) => {
    return client.get<any>(`/group/search`, {
      params: params
    });
  },
  getGroupByUserID: (params: IPayloadGroups) => {
    return client.get<any>(`/group/get`, {
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
  },
  createChat: (payload: IPayloadCreateChat) => {
    return client.post<any>(`/chat/create`, payload);
  }
};
